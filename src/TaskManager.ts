import { Task } from './Task.js';

export class TaskManager {
    private tasks: Task[] = [];

    /**
     * The addTask function creates a new Task object with the given title and
     * description, adds it to the tasks array, and returns the newly created
     * task.
     * @param {string} title - A string representing the title of the task.
     * @param {string} description - A string that describes the task.
     * @returns a new task object.
     */
    addTask(title: string, description: string, id?: string): Task {
        const newTask = new Task(title, description, false, id);
        this.tasks.push(newTask);
        return newTask;
    }

    /**
     * The function removes a task from an array of tasks based on its title.
     * @param {string} taskTitle - The taskTitle parameter is a string that
     * represents the title of the task that needs to be removed.
     */
    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    // Example of a method to list all tasks (we will handle recursion later)
    getTasks(): Task[] {
        return this.tasks;
    }

    /* The `saveTasks()` method is responsible for saving the tasks in the `tasks`
    array to the browser's local storage. It converts the tasks array into a
    JSON string using `JSON.stringify()`, and then stores the JSON string in
    the local storage using `localStorage.setItem()`. This allows the tasks to
    persist even if the page is refreshed or closed. */
    saveTasks(calledFrom: string): void {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
    }

    /**
     * The function loads tasks from local storage and converts them into Task
     * objects.
     */
    loadTasks(): void {
        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson).map((task: Task) => {
                return new Task(task.title, task.description, task.completed, task.id);
            });
        }
    }
}
