import { Task } from './Task.js';
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    /**
     * The addTask function creates a new Task object with the given title and
     * description, adds it to the tasks array, and returns the newly created
     * task.
     * @param {string} title - A string representing the title of the task.
     * @param {string} description - A string that describes the task.
     * @returns a new task object.
     */
    TaskManager.prototype.addTask = function (title, description) {
        var newTask = new Task(title, description, false);
        this.tasks.push(newTask);
        return newTask;
    };
    /**
     * The function removes a task from an array of tasks based on its title.
     * @param {string} taskTitle - The taskTitle parameter is a string that
     * represents the title of the task that needs to be removed.
     */
    TaskManager.prototype.removeTask = function (taskTitle) {
        this.tasks = this.tasks.filter(function (task) { return task.title !== taskTitle; });
    };
    // Example of a method to list all tasks (we will handle recursion later)
    TaskManager.prototype.getTasks = function () {
        return this.tasks;
    };
    /* The `saveTasks()` method is responsible for saving the tasks in the `tasks`
    array to the browser's local storage. It converts the tasks array into a
    JSON string using `JSON.stringify()`, and then stores the JSON string in
    the local storage using `localStorage.setItem()`. This allows the tasks to
    persist even if the page is refreshed or closed. */
    TaskManager.prototype.saveTasks = function (calledFrom) {
        var tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
    };
    /**
     * The function loads tasks from local storage and converts them into Task
     * objects.
     */
    TaskManager.prototype.loadTasks = function () {
        var tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson).map(function (task) {
                return new Task(task.title, task.description, task.completed);
            });
        }
    };
    return TaskManager;
}());
export { TaskManager };
