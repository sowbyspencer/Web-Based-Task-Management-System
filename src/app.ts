/**
 * This TypeScript code implements a task manager application. It provides functionality 
 * for users to add, delete, update, and search for tasks. Users can interact with the 
 * application to manage their tasks effectively.
 *
 * Key functions include:
 *  - Adding new tasks with titles and descriptions.
 *  - Toggling the completion status of tasks.
 *  - Updating the titles and descriptions of existing tasks.
 *  - Deleting tasks from the list.
 *  - Searching for tasks based on keywords.
 *  - Displaying notifications and the last saved timestamp.
 *
 * The application primarily operates on objects of the `Task` class. A `Task` object 
 * encapsulates the properties and behaviors of a task, including its `title`, 
 * `description`, and `completed` status.
 */

/** 
 * Run
 * tsc -w
 * to automatically compile TypeScript to JavaScript upon changes, you can use
 * tsc -w in your terminal. This command watches for changes in your TypeScript
 * files and compiles them instantly.
 */

// Imports the `Task` class from `Task.js` and the `TaskManager` class from `TaskManager.js`.
import { Task } from './Task.js';
import { TaskManager } from './TaskManager.js';

// Update this manually with the current date and time
const lastSavedTimestamp = '2024-01-27 14:39:00';

// Creates a new instance of the `TaskManager` class.
const taskManager = new TaskManager();

// Retrieves DOM elements and assigns them to appropriately typed variables.
const form = document.getElementById('addTaskForm') as HTMLFormElement;
const titleInput = document.getElementById('taskTitle') as HTMLInputElement;
const descriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
const tasksDisplay = document.getElementById('tasksDisplay') as HTMLDivElement;
const searchBar = document.getElementById('searchBar') as HTMLInputElement;

// Loads tasks and binds DOM events when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    taskManager.loadTasks();
    taskManager.getTasks().forEach(addTaskToDOM);
    // Notifies user of load.
    showNotification('Tasks loaded!');
});

// Adds event listener to handle form submission.
form.addEventListener('submit', (event) => {
    // Prevents the form from submitting in the traditional way.
    event.preventDefault();

    // Retrieves and sets title and description.
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    // Checks if the `title` variable has a value, indicating user entry of a task title.
    if (title) {
        // Adds a new task to task manager and then adds the task to the DOM.
        const newTask = taskManager.addTask(title, description);
        addTaskToDOM(newTask);

        // Resets the title input.
        titleInput.value = '';
        // Resets the description input.
        descriptionInput.value = ''; 
    }
});

// Event listener for the search input field. Triggers searchTasks function when the user types in the search field.
searchBar.addEventListener('input', (event) => {
    // Retrieves the value of the input element, trims any whitespace, and calls `searchTasks`.
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim();
    searchTasks(searchTerm);
});

/**
 * Creates and appends HTML elements for a task to the DOM.
 * @param {Task} task - A `Task` object with properties like `title`, 
 * `description`, and `completed`.
 */
function addTaskToDOM(task: Task) {
    // Creates task container.
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
    // Creates and appends checkbox.
    const checkBox = document.createElement('input');
    checkBox.name = 'CheckBox'
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-check');
    // Sets checked status based on task completion.
    checkBox.checked = task.completed;
    taskElement.appendChild(checkBox);

    // Creates and appends title label.
    const titleLabel = document.createElement('label');
    titleLabel.classList.add('task-label');
    titleLabel.textContent = 'Title';
    titleLabel.htmlFor = 'title-' + task.id;
    taskElement.appendChild(titleLabel);

    // Creates and appends title input.
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    // Matches 'id' attribute for title.
    titleInput.id = 'title-' + task.id;
    titleInput.classList.add('task-title');
    titleInput.value = task.title;
    if (task.completed) {
        titleInput.classList.add('task-completed');
    }
    taskElement.appendChild(titleInput);

    // Creates and appends description label.
    const descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('task-label');
    descriptionLabel.textContent = 'Description';
    // Specifies 'for' attribute for label.
    descriptionLabel.htmlFor = 'description-' + task.id;
    taskElement.appendChild(descriptionLabel);

    // Creates and appends description textarea.
    const descriptionTextarea = document.createElement('textarea');
    // Matches 'id' attribute for description.
    descriptionTextarea.id = 'description-' + task.id;
    descriptionTextarea.classList.add('task-description');
    if (task.completed) {
        descriptionTextarea.classList.add('task-completed');
    }
    descriptionTextarea.textContent = task.description;
    taskElement.appendChild(descriptionTextarea);

    // Creates and appends delete button.
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task-delete');
    deleteButton.textContent = 'Delete';
    taskElement.appendChild(deleteButton);

    // Appends task element to display container.
    tasksDisplay.appendChild(taskElement);

    // Adds event listeners to elements.
    addTaskEventListeners(taskElement, task);

    // Saves tasks to local storage
    taskManager.saveTasks("addTaskToDOM");
}

/**
 * Adds event listeners to task elements for interactivity.
 * @param {HTMLElement} taskElement - The HTML element representing the task.
 * @param {Task} task - The task object associated with the element.
 */
function addTaskEventListeners(taskElement: HTMLElement, task: Task) {
    // Select elements from the DOM within taskElement
    const checkButton = taskElement.querySelector('.task-check');
    const deleteButton = taskElement.querySelector('.task-delete');
    const titleElement = taskElement.querySelector('.task-title');
    const descriptionElement = taskElement.querySelector('.task-description');

    // Add event listener for task completion toggle, log error if not found
    if (checkButton) {
        checkButton.addEventListener('click', () => toggleTaskCompletion(task, taskElement));
    } else {
        console.error('Check Button not found in task element');
    }
    
    // Add event listener to delete button, log error if not found
    if (deleteButton) {
        deleteButton.addEventListener('click', () => deleteTask(task, taskElement));
    } else {
        console.error('Delete Button not found in task element');
    }
    
    // Add 'blur' event listener to title, log error if not found
    if (titleElement) {
        titleElement.addEventListener('blur', () => {
            const newTitle = (titleElement as HTMLInputElement).value;
            updateTaskTitle(task, newTitle);
        });
    } else {
        console.error('Title Element not found in task element');
    }
    
    // Add 'blur' event listener to description, log error if not found
    if (descriptionElement) {
        descriptionElement.addEventListener('blur', () => {
            const newDescription = (descriptionElement as HTMLTextAreaElement).value;
            updateTaskDescription(task, newDescription);
        });
    } else {
        console.error('Description Element not found in task element');
    }
}

/**
 * Toggles the completion status of a task and updates UI accordingly.
 * @param {Task} task - The task to toggle.
 * @param {Element} taskElement - The DOM element of the task.
 */
function toggleTaskCompletion(task: Task, taskElement: Element) {
    // Toggle task's completion status
    task.checkTask(); 

    // Find checkbox element and update its state
    const checkBox = taskElement.querySelector('.task-check') as HTMLInputElement;
    checkBox.checked = task.completed;

    // Find title and description elements
    const titleElement = taskElement.querySelector('.task-title');
    const descriptionElement = taskElement.querySelector('.task-description');

    // Toggle 'task-completed' class on title, log error if not found
    if (titleElement) {
        titleElement.classList.toggle('task-completed', task.completed);
    } else {
        console.error("Title Element not found.")
    }
    
    // Toggle 'task-completed' class on description, log error if not found
    if (descriptionElement) {
        descriptionElement.classList.toggle('task-completed', task.completed);
    } else {
        console.error("Description Element not found.")
    }
    
    // Save updated tasks to local storage and show notification
    taskManager.saveTasks("toggleTaskCompletion"); 
    showNotification('Task Saved!');
}

/**
 * Deletes a task and its associated DOM element.
 * @param {Task} task - The task to delete.
 * @param {Element} taskElement - The DOM element of the task.
 */
function deleteTask(task: Task, taskElement: Element) {
    // Remove task and its DOM element
    taskManager.removeTask(task.id);
    taskElement.remove();

    // Save tasks to local storage and show notification
    taskManager.saveTasks("deleteTask");
    showNotification('Task Saved!');
}

/**
 * Updates the title of a task.
 * @param {Task} task - The task to update.
 * @param {string} newTitle - The new title for the task.
 */
function updateTaskTitle(task: Task, newTitle: string) {
    // Update task title and save changes
    task.updateTitle(newTitle);
    taskManager.saveTasks("updateTaskTitle");
    showNotification('Task Saved!');
}

/**
 * Updates the description of a task.
 * @param {Task} task - The task to update.
 * @param {string} newDescription - The new description for the task.
 */
function updateTaskDescription(task: Task, newDescription: string) {
    // Update task description and save changes
    task.updateDescription(newDescription);
    taskManager.saveTasks("updateTaskDescription");
    showNotification('Task Saved!');
}

/**
 * Filters and sorts tasks based on a search term, giving priority to exact case matches in titles and descriptions.
 * @param {string} searchTerm - The term to search for in tasks.
 */
function searchTasks(searchTerm: string) {
    // Notifies the user that the search is working.
    showNotification('Searching...');

    // Get all tasks from task manager
    const allTasks = taskManager.getTasks();

    // Initial filter for tasks that include the search term in title or description (case insensitive)
    let filteredTasks = allTasks
        .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((taskA, taskB) => {
            // Define a scoring system to prioritize search results
            const score = (task: Task) => {
                let score = 0;
                // Higher score for exact case matches in title
                if (task.title.includes(searchTerm)) score += 4;
                // Score for case-insensitive matches in title
                else if (task.title.toLowerCase().includes(searchTerm.toLowerCase())) score += 3;

                // Score for exact case matches in description
                if (task.description.includes(searchTerm)) score += 2;
                // Lower score for case-insensitive matches in description
                else if (task.description.toLowerCase().includes(searchTerm.toLowerCase())) score += 1;

                return score;
            };
            // Sort tasks by their score in descending order
            return score(taskB) - score(taskA);
        });

    // Fallback search when no matches are found: search individual words in the search term
    if (filteredTasks.length === 0) {
        // Split the search term into individual words
        const searchWords = searchTerm.split(/\s+/);
        filteredTasks = allTasks
            .filter(task => {
                // Check for matches of any word from searchWords in title or description
                return searchWords.some(word => 
                    task.title.toLowerCase().includes(word.toLowerCase()) ||
                    task.description.toLowerCase().includes(word.toLowerCase())
                );
            })
            .sort((taskA, taskB) => {
                // Scoring function for matches based on individual words
                const score = (task: Task) => {
                    let score = 0;
                    searchWords.forEach(word => {
                        // Add to score for each word match in title
                        if (task.title.toLowerCase().includes(word.toLowerCase())) score += 1;
                        // Add to score for each word match in description, with lower weight
                        if (task.description.toLowerCase().includes(word.toLowerCase())) score += 0.5;
                    });
                    return score;
                };
                // Sort tasks based on score from individual word matches
                return score(taskB) - score(taskA); 
            });
    }

    // Remove current tasks from display before showing new results
    clearTasksDisplay();

    // Display filtered tasks on the UI
    filteredTasks.forEach(addTaskToDOM);
}

/**
 * Clears all tasks from the task display area in the DOM.
 */
function clearTasksDisplay() {
    // Selects the task display container and clears its content.
    tasksDisplay.innerHTML = '';
}

/**
 * Displays a temporary notification on the screen with a fade-out effect.
 * @param {string} message - The message to display in the notification.
 * @param {number} duration - The duration in milliseconds for which the notification will be visible (default: 2000ms).
 */
function showNotification(message: string, duration: number = 2000) {
    // Create a div element for the notification
    const notificationBox = document.createElement('div');
    notificationBox.className = 'notification-box';  // Assign CSS class for styling
    notificationBox.textContent = message;  // Set the message text

    // Append the notification to the document body
    document.body.appendChild(notificationBox);

    // Set a timeout to start the fade-out animation slightly before the notification disappears
    setTimeout(() => {
        notificationBox.style.animation = 'fadeOut 0.5s ease forwards'; // Apply fade-out CSS animation
    }, duration - 500); // Animation starts 500ms before the notification is set to disappear

    // Set another timeout to remove the notification element after the specified duration
    setTimeout(() => {
        notificationBox.remove(); // Remove the notification from the DOM
    }, duration);
}

/**
 * Appends the last saved timestamp to a specified container in the HTML document.
 * It creates a new div element displaying the timestamp and adds it to the container.
 */
function appendLastSavedTimestamp() {
    // Create a new div element to display the last saved timestamp
    const footerElement = document.createElement('div');
    footerElement.textContent = `Last updated: ${lastSavedTimestamp}`; // Set the text content with the timestamp
    footerElement.style.textAlign = 'center'; // Align the text to the center of the div

    // Locate the container element by its ID
    const container = document.getElementById('timeStamp');
    if (container) {
        container.appendChild(footerElement); // Append the footer element with timestamp to the container
    } else {
        console.error('Container element with id "timeStamp" not found.'); // Log an error if the container does not exist
    }
}

// Calls the function to append the timestamp.
appendLastSavedTimestamp();