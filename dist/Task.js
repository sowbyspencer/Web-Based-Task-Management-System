/**
 * Represents a task with title, description, completion status, and potential subtasks.
 */
var Task = /** @class */ (function () {
    /**
     * Constructs a new Task instance.
     * @param {string} title - Title of the task.
     * @param {string} description - Description of the task.
     * @param {boolean} completed - Initial completion status of the task. False by default.
     * @param {string} [id] - Optional custom identifier for the task. Generated if not provided.
     * @param {Task} [parentTask] - Optional parent task for creating a subtask relationship.
     */
    function Task(title, description, completed, id, parentTask) {
        if (completed === void 0) { completed = false; }
        this.id = id ? id : 'task-' + Date.now(); // Generate a unique ID if not provided
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.subtasks = [];
        this.parentTask = parentTask;
    }
    /**
     * Adds a subtask to this task and links this task as its parent.
     * @param {Task} subtask - The subtask to be added.
     */
    Task.prototype.addSubtask = function (subtask) {
        subtask.parentTask = this;
        this.subtasks.push(subtask);
    };
    /**
     * Toggles the completion status of this task.
     */
    Task.prototype.checkTask = function () {
        this.completed = !this.completed;
    };
    /**
     * Updates the title of this task.
     * @param {string} newTitle - The new title for the task.
     */
    Task.prototype.updateTitle = function (newTitle) {
        this.title = newTitle;
    };
    /**
     * Updates the description of this task.
     * @param {string} newDescription - The new description for the task.
     */
    Task.prototype.updateDescription = function (newDescription) {
        this.description = newDescription;
    };
    return Task;
}());
export { Task };
