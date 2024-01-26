import { TaskManager } from './TaskManager.js';
// Creating a new instance of then`TaskManager` class 
var taskManager = new TaskManager();
document.addEventListener('DOMContentLoaded', function () {
    taskManager.loadTasks();
    taskManager.getTasks().forEach(addTaskToDOM);
});
/* These lines of code are retrieving HTML elements from the DOM (Document Object
Model) and assigning them to variables with specific types. */
var form = document.getElementById('addTaskForm');
var titleInput = document.getElementById('taskTitle');
var descriptionInput = document.getElementById('taskDescription');
var tasksDisplay = document.getElementById('tasksDisplay');
var searchBar = document.getElementById('searchBar');
/* This is an event listener function that is triggered when the form is
submitted. */
form.addEventListener('submit', function (event) {
    // Prevent the form from submitting the traditional way
    event.preventDefault();
    // Retrieving and setting title and description
    var title = titleInput.value.trim();
    var description = descriptionInput.value.trim();
    /* Checks if the `title` variable has a value. If it does, it means that the
    user has entered a title for the task. */
    if (title) {
        var newTask = taskManager.addTask(title, description);
        addTaskToDOM(newTask);
        titleInput.value = ''; // Reset the title input
        descriptionInput.value = ''; // Reset the description input
    }
});
/**
 * The function `addTaskToDOM` creates HTML elements for a task and appends them
 * to the DOM.
 * @param {Task} task - The `task` parameter is an object that represents a task.
 * It has the following properties:
 */
function addTaskToDOM(task) {
    // Create task container
    var taskElement = document.createElement('div');
    taskElement.classList.add('task');
    // Create and append checkbox
    var checkBox = document.createElement('input');
    checkBox.name = 'CheckBox';
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-check');
    checkBox.checked = task.completed; // Set checked status based on task completion
    taskElement.appendChild(checkBox);
    // Create and append title label
    var titleLabel = document.createElement('label');
    titleLabel.classList.add('task-label');
    titleLabel.textContent = 'Title';
    titleLabel.htmlFor = 'taskTitle'; // 'for' attribute
    taskElement.appendChild(titleLabel);
    // Create and append title content as input
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = task.title + ' Title'; // matching 'id' attribute
    titleInput.classList.add('task-title');
    titleInput.value = task.title;
    if (task.completed) {
        titleInput.classList.add('task-completed');
    }
    taskElement.appendChild(titleInput);
    // Create and append description label
    var descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('task-label');
    descriptionLabel.textContent = 'Description';
    descriptionLabel.htmlFor = 'taskDescription'; // 'for' attribute
    taskElement.appendChild(descriptionLabel);
    // Create and append description content as textarea
    var descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = task.title + 'taskDescription'; // matching 'id' attribute
    descriptionTextarea.classList.add('task-description');
    if (task.completed) {
        descriptionTextarea.classList.add('task-completed');
    }
    descriptionTextarea.textContent = task.description;
    taskElement.appendChild(descriptionTextarea);
    // Create and append delete button
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete');
    deleteButton.textContent = 'Delete';
    taskElement.appendChild(deleteButton);
    // Append task element to the display container
    tasksDisplay.appendChild(taskElement);
    // Add event listeners to the new elements
    addTaskEventListeners(taskElement, task);
    // Save tasks to local storage
    taskManager.saveTasks("addTaskToDOM");
}
function addTaskEventListeners(taskElement, task) {
    var checkButton = taskElement.querySelector('.task-check');
    var deleteButton = taskElement.querySelector('.task-delete');
    var titleElement = taskElement.querySelector('.task-title');
    var descriptionElement = taskElement.querySelector('.task-description');
    // Check if checkButton is not null before adding event listener
    if (checkButton) {
        checkButton.addEventListener('click', function () { return toggleTaskCompletion(task, taskElement); });
    }
    else {
        console.error('Check Button not found in task element');
    }
    if (deleteButton) {
        deleteButton.addEventListener('click', function () { return deleteTask(task, taskElement); });
    }
    else {
        console.error('Delete Button not found in task element');
    }
    if (titleElement) {
        titleElement.addEventListener('blur', function () {
            var newTitle = titleElement.textContent || ''; // Fallback to empty string if null
            updateTaskTitle(task, newTitle);
        });
    }
    else {
        console.error('Title Element not found in task element');
    }
    if (descriptionElement) {
        descriptionElement.addEventListener('blur', function () {
            var newDescription = descriptionElement.textContent || '';
            updateTaskDescription(task, newDescription);
        });
    }
    else {
        console.error('Description Element not found in task element');
    }
}
/**
 * The function toggles the completion status of a task and updates the
 * corresponding task element's appearance.
 * @param {Task} task - The `task` parameter is an object of type `Task`. It
 * represents a specific task that needs to be toggled for completion.
 * @param {Element} taskElement - The `taskElement` parameter is an HTML element
 * that represents the task in the user interface. It is used to find the title
 * and description elements of the task so that their appearance can be updated
 * based on the task's completion status.
 */
function toggleTaskCompletion(task, taskElement) {
    // Toggle the task's completed status
    task.checkTask();
    // Find the checkbox element
    var checkBox = taskElement.querySelector('.task-check');
    // Update the checkbox state and the UI
    checkBox.checked = task.completed;
    var titleElement = taskElement.querySelector('.task-title');
    var descriptionElement = taskElement.querySelector('.task-description');
    if (titleElement) {
        titleElement.classList.toggle('task-completed', task.completed);
    }
    else {
        console.log("Title Element not found.");
    }
    if (descriptionElement) {
        descriptionElement.classList.toggle('task-completed', task.completed);
    }
    else {
        console.log("Description Element not found.");
    }
    taskManager.saveTasks("toggleTaskCompletion"); // Save the updated tasks to local storage
}
/**
 * The function deletes a task from a task manager and removes its
 * corresponding element from the DOM.
 * @param {Task} task - The `task` parameter is of type `Task` and represents
 * the task that needs to be deleted.
 * @param {Element} taskElement - The taskElement parameter is the HTML
 * element that represents the task in the user interface.
 */
function deleteTask(task, taskElement) {
    taskManager.removeTask(task.title);
    taskElement.remove();
    taskManager.saveTasks("deleteTask");
}
function updateTaskTitle(task, newTitle) {
    task.updateTitle(newTitle); // Update title method in Task class
    taskManager.saveTasks("updateTaskTitle");
    // Any additional logic...
}
function updateTaskDescription(task, newDescription) {
    task.updateDescription(newDescription); // Update description method in Task class
    taskManager.saveTasks("updateTaskDescription");
    // Any additional logic...
}
// Enhanced search function with case-sensitive priority
function searchTasks(searchTerm) {
    // Retrieve all tasks
    var allTasks = taskManager.getTasks();
    // Filter tasks based on search criteria with case priority
    var filteredTasks = allTasks
        .filter(function (task) { return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()); })
        .sort(function (taskA, taskB) {
        // Enhanced scoring function to prioritize search results
        var score = function (task) {
            var score = 0;
            // Exact case match in title
            if (task.title.includes(searchTerm))
                score += 4;
            // Case-insensitive match in title
            else if (task.title.toLowerCase().includes(searchTerm.toLowerCase()))
                score += 3;
            // Exact case match in description
            if (task.description.includes(searchTerm))
                score += 2;
            // Case-insensitive match in description
            else if (task.description.toLowerCase().includes(searchTerm.toLowerCase()))
                score += 1;
            return score;
        };
        return score(taskB) - score(taskA); // Sort in descending order of score
    });
    // Clear existing tasks from the display
    clearTasksDisplay();
    // Add filtered tasks to the display
    filteredTasks.forEach(addTaskToDOM);
}
// ... rest of the code including the event listener ...
// Helper function: Clears all tasks from the display
function clearTasksDisplay() {
    // Select the task display container and clear its content
    tasksDisplay.innerHTML = '';
}
// Event listener for the search input field
// Trigger searchTasks function when the user types in the search field
searchBar.addEventListener('input', function (event) {
    var target = event.target;
    var searchTerm = target.value.trim();
    searchTasks(searchTerm);
});
