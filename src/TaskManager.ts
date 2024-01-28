import { Task } from './Task.js';

/**
 * Manages a collection of tasks, including adding, removing, saving, and loading tasks.
 */
export class TaskManager {
    private tasks: Task[] = [];

    /**
     * Adds a new task to the task list.
     * @param {string} title - Title of the new task.
     * @param {string} description - Description of the new task.
     * @param {string} [id] - Optional unique identifier for the task.
     * @returns The newly created task object.
     */
    addTask(title: string, description: string, id?: string): Task {
        const newTask = new Task(title, description, false, id);
        this.tasks.push(newTask);
        return newTask;
    }

    /**
     * Removes a task from the task list based on its ID.
     * @param {string} taskId - The unique identifier of the task to be removed.
     */
    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    /**
     * Retrieves the current list of tasks.
     * @returns An array of Task objects.
     */
    getTasks(): Task[] {
        return this.tasks;
    }

    /**
     * Saves the current tasks to local storage.
     * @param {string} calledFrom - Indicates the method's caller (for debugging or tracking).
     */
    saveTasks(calledFrom: string): void {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
    }

    /**
     * Loads tasks from local storage and converts them back into Task objects.
     */
    loadTasks(): void {
        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson).map((taskObj: any) => {
                return new Task(taskObj.title, taskObj.description, taskObj.completed, taskObj.id);
            });
        }
    }
}
