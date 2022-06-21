import { Task } from "./task.js";

const taskContainer = document.querySelector(".todo__list");

export function createTask(task, start, deadline) {
	new Task(task, start, deadline, taskContainer).initComponent();
}
