/**
 * This TypeScript code creates a task manager application that allows users to
 * add, delete, and search for tasks.
 * @param {Task} task - The parameter `task` is of type `Task`, which is a custom
 * class representing a task object. It contains properties such as `title`,
 * `description`, and `completed` that hold the relevant information for a task.
 *
 * Run
 * tsc -w
 * to automatically compile TypeScript to JavaScript upon changes, you can use
 * tsc -w in your terminal. This command watches for changes in your TypeScript
 * files and compiles them instantly.
 */
import { TaskManager } from './TaskManager.js';
// Creating a new instance of then`TaskManager` class 
var taskManager = new TaskManager();
// Retrieve DOM elements and assign them to appropriately typed variables
var form = document.getElementById('addTaskForm');
var titleInput = document.getElementById('taskTitle');
var descriptionInput = document.getElementById('taskDescription');
var tasksDisplay = document.getElementById('tasksDisplay');
var searchBar = document.getElementById('searchBar');
// Load tasks and bind DOM events when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    taskManager.loadTasks();
    taskManager.getTasks().forEach(addTaskToDOM);
});
// Add event listener to handle form submission
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
// Event listener for the search input field
// Trigger searchTasks function when the user types in the search field
searchBar.addEventListener('input', function (event) {
    var target = event.target;
    var searchTerm = target.value.trim();
    searchTasks(searchTerm);
});
/**
 * The function `addTaskToDOM` creates HTML elements for a task and appends them
 * to the DOM.
 * @param {Task} task - The parameter `task` is of type `Task`, which is a
 * custom class representing a task object. It contains properties
 * such as `title`, `description`, and `completed` that hold the relevant
 * information for a task.
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
    titleLabel.htmlFor = 'title-' + task.id; // 'for' attribute
    taskElement.appendChild(titleLabel);
    // Create and append title content as input
    var titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title-' + task.id; // matching 'id' attribute
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
    descriptionLabel.htmlFor = 'description-' + task.id; // 'for' attribute
    taskElement.appendChild(descriptionLabel);
    // Create and append description content as textarea
    var descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'description-' + task.id; // matching 'id' attribute
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
    /* The above code is calling the `saveTasks` function from the `taskManager`
    object and passing the argument "addTaskToDOM". It then calls the
    `showNotification` function with the argument 'Task Saved!'. */
    taskManager.saveTasks("addTaskToDOM");
    showNotification('Task Saved!');
}
/**
 * Adds event listeners to task elements for interactivity.
 * @param {HTMLElement} taskElement - The HTML element representing the task.
 * @param {Task} task - The task object associated with the element.
 */
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
            // Asserting titleElement as HTMLInputElement to access the value property
            var newTitle = titleElement.value;
            updateTaskTitle(task, newTitle);
        });
    }
    else {
        console.error('Title Element not found in task element');
    }
    if (descriptionElement) {
        descriptionElement.addEventListener('blur', function () {
            // Asserting descriptionElement as HTMLTextAreaElement (if it's a textarea)
            var newDescription = descriptionElement.value;
            updateTaskDescription(task, newDescription);
        });
    }
    else {
        console.error('Description Element not found in task element');
    }
}
/**
 * Toggles the completion status of a task and updates UI accordingly.
 * @param {Task} task - The task to toggle.
 * @param {Element} taskElement - The DOM element of the task.
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
        console.error("Title Element not found.");
    }
    if (descriptionElement) {
        descriptionElement.classList.toggle('task-completed', task.completed);
    }
    else {
        console.error("Description Element not found.");
    }
    taskManager.saveTasks("toggleTaskCompletion"); // Save the updated tasks to local storage
    showNotification('Task Saved!');
}
/**
 * Deletes a task and its associated DOM element.
 * @param {Task} task - The task to delete.
 * @param {Element} taskElement - The DOM element of the task.
 */
function deleteTask(task, taskElement) {
    taskManager.removeTask(task.id);
    taskElement.remove();
    taskManager.saveTasks("deleteTask");
    showNotification('Task Saved!');
}
/**
 * Updates the title of a task.
 * @param {Task} task - The task to update.
 * @param {string} newTitle - The new title for the task.
 */
function updateTaskTitle(task, newTitle) {
    task.updateTitle(newTitle); // Update title method in Task class
    taskManager.saveTasks("updateTaskTitle");
    showNotification('Task Saved!');
    // Any additional logic...
}
/**
 * Updates the description of a task.
 * @param {Task} task - The task to update.
 * @param {string} newDescription - The new description for the task.
 */
function updateTaskDescription(task, newDescription) {
    task.updateDescription(newDescription); // Update description method in Task class
    taskManager.saveTasks("updateTaskDescription");
    showNotification('Task Saved!');
    // Any additional logic...
}
/**
 * The function `searchTasks` filters and sorts tasks based on a search term,
 * prioritizing exact case matches in the title and description.
 * @param {string} searchTerm - The term to search for in tasks.
 */
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
    // If no matches found, search for individual words in the search term
    if (filteredTasks.length === 0) {
        var searchWords_1 = searchTerm.split(/\s+/); // Split search term into words
        filteredTasks = allTasks
            .filter(function (task) {
            // Check if any word in searchWords is in title or description
            return searchWords_1.some(function (word) {
                return task.title.toLowerCase().includes(word.toLowerCase()) ||
                    task.description.toLowerCase().includes(word.toLowerCase());
            });
        })
            .sort(function (taskA, taskB) {
            // Scoring function for individual word matches
            var score = function (task) {
                var score = 0;
                searchWords_1.forEach(function (word) {
                    if (task.title.toLowerCase().includes(word.toLowerCase()))
                        score += 1; // Lower score for title matches
                    if (task.description.toLowerCase().includes(word.toLowerCase()))
                        score += 0.5; // Even lower score for description matches
                });
                return score;
            };
            return score(taskB) - score(taskA); // Sort in descending order of score
        });
    }
    // Clear existing tasks from the display
    clearTasksDisplay();
    // Add filtered tasks to the display
    filteredTasks.forEach(addTaskToDOM);
}
/**
 * Clears all tasks from the task display area in the DOM.
 */
function clearTasksDisplay() {
    // Select the task display container and clear its content
    tasksDisplay.innerHTML = '';
}
/**
 * Displays a notification message with a timed fade-out effect.
 * @param {string} message - The message to display.
 * @param {number} duration - Duration for the notification to show (default: 2000ms).
 */
function showNotification(message, duration) {
    if (duration === void 0) { duration = 2000; }
    // Create and style the notification element
    var notificationBox = document.createElement('div');
    notificationBox.className = 'notification-box';
    notificationBox.textContent = message;
    // Add to the body
    document.body.appendChild(notificationBox);
    // Set a timeout to fade out the notification
    setTimeout(function () {
        notificationBox.style.animation = 'fadeOut 0.5s ease forwards';
    }, duration - 500); // Start fade out 0.5s before hiding completely
    // Remove the notification after the specified duration
    setTimeout(function () {
        notificationBox.remove();
    }, duration);
    var lastSavedTimestamp = '2024-01-27 14:39:00'; // Update this manually with the current date and time
    function appendLastSavedTimestamp() {
        var footerElement = document.createElement('div');
        footerElement.textContent = "Last updated: ".concat(lastSavedTimestamp);
        footerElement.style.textAlign = 'center';
        // Assuming you have a container element to append this information
        var container = document.getElementById('timeStamp'); // Replace 'container' with your actual container element's ID
        if (container) {
            container.appendChild(footerElement);
        }
    }
    // Call the function to append the timestamp
    appendLastSavedTimestamp();
}
