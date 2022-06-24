import { Task } from './task.js';

const taskContainer = document.querySelector('.todo__list');

export function createTask(task, start, deadline) {
	const newTask = new Task(task, start, deadline, taskContainer);

	Object.taskList.push(newTask);
}
