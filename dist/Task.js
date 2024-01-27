var Task = /** @class */ (function () {
    /**
     * The constructor function creates a new Task object with a title,
     * description, parent task (optional), and completed status.
     * @param {string} title - A string representing the title of the task.
     * @param {string} description - The `description` parameter is a string that
     * represents the description of the task. It provides additional information
     * or details about the task.
     * @param {Task} [parentTask] - The parentTask parameter is an optional
     * parameter that represents the parent task of the current task. It is of
     * type Task, which means it can hold an instance of the Task class. If a
     * parent task is provided, it means that the current task is a subtask of the
     * parent task.
     * @param {boolean} [completed=false] - A boolean value indicating whether the
     * task is completed or not. It is set to false by default.
     */
    function Task(title, description, completed, id, parentTask) {
        if (id) {
            this.id = id;
        }
        else {
            this.id = 'task-' + Date.now();
        }
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.subtasks = [];
        this.parentTask = parentTask;
    }
    /**
     * The addSubtask function adds a subtask to the parent task and assigns the
     * parent task to the subtask.
     * @param {Task} subtask - The subtask parameter is an instance of the Task
     * class that represents a subtask of the current task.
     */
    Task.prototype.addSubtask = function (subtask) {
        subtask.parentTask = this;
        this.subtasks.push(subtask);
    };
    /**
     * The function "checkTask" toggles the value of the "completed" property.
     */
    Task.prototype.checkTask = function () {
        this.completed = !this.completed;
    };
    /**
     * The function "updateTitle" updates the title property of an object with a
     * new value.
     * @param {string} newTitle - The new title that you want to update. It should
     * be a string.
     */
    Task.prototype.updateTitle = function (newTitle) {
        this.title = newTitle;
    };
    /**
     * The function "updateDescription" updates the description property of an
     * object with a new string value.
     * @param {string} newDescription - A string representing the new description
     * that you want to update.
     */
    Task.prototype.updateDescription = function (newDescription) {
        this.description = newDescription;
    };
    return Task;
}());
export { Task };
