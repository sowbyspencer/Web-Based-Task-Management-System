import { Task } from './Task.js';
/**
 * Manages a collection of tasks, including adding, removing, saving, and loading tasks.
 */
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    /**
     * Adds a new task to the task list.
     * @param {string} title - Title of the new task.
     * @param {string} description - Description of the new task.
     * @param {string} [id] - Optional unique identifier for the task.
     * @returns The newly created task object.
     */
    TaskManager.prototype.addTask = function (title, description, id) {
        var newTask = new Task(title, description, false, id);
        this.tasks.push(newTask);
        return newTask;
    };
    /**
     * Removes a task from the task list based on its ID.
     * @param {string} taskId - The unique identifier of the task to be removed.
     */
    TaskManager.prototype.removeTask = function (taskId) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== taskId; });
    };
    /**
     * Retrieves the current list of tasks.
     * @returns An array of Task objects.
     */
    TaskManager.prototype.getTasks = function () {
        return this.tasks;
    };
    /**
     * Saves the current tasks to local storage.
     * @param {string} calledFrom - Indicates the method's caller (for debugging or tracking).
     */
    TaskManager.prototype.saveTasks = function (calledFrom) {
        var tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
    };
    /**
     * Loads tasks from local storage and converts them back into Task objects.
     */
    TaskManager.prototype.loadTasks = function () {
        var tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson).map(function (taskObj) {
                return new Task(taskObj.title, taskObj.description, taskObj.completed, taskObj.id);
            });
        }
    };
    return TaskManager;
}());
export { TaskManager };
