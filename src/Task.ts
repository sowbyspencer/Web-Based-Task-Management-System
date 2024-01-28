/**
 * Represents a task with title, description, completion status, and potential subtasks.
 */
export class Task {
    // Unique identifier for the task
    id: string;
    // Title of the task
    title: string;
    // Detailed description of the task
    description: string;
    // Completion status of the task, true if completed
    completed: boolean;
    // Array of subtasks, each being a Task instance
    subtasks: Task[];
    // Optional reference to a parent task if this is a subtask
    parentTask?: Task;

    /**
     * Constructs a new Task instance.
     * @param {string} title - Title of the task.
     * @param {string} description - Description of the task.
     * @param {boolean} completed - Initial completion status of the task. False by default.
     * @param {string} [id] - Optional custom identifier for the task. Generated if not provided.
     * @param {Task} [parentTask] - Optional parent task for creating a subtask relationship.
     */
    constructor(title: string, description: string, completed: boolean = false, id?: string, parentTask?: Task) {
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
    addSubtask(subtask: Task): void {
        subtask.parentTask = this;
        this.subtasks.push(subtask);
    }

    /**
     * Toggles the completion status of this task.
     */
    checkTask(): void {
        this.completed = !this.completed;
    }

    /**
     * Updates the title of this task.
     * @param {string} newTitle - The new title for the task.
     */
    updateTitle(newTitle: string): void {
        this.title = newTitle;
    }
    
    /**
     * Updates the description of this task.
     * @param {string} newDescription - The new description for the task.
     */
    updateDescription(newDescription: string): void {
        this.description = newDescription;
    }
}
