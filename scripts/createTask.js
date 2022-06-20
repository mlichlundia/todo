import { Task } from "./task.js";

const taskContainer = document.querySelector(".todo__list");

export function createTask(task) {
	taskContainer.append(new Task(task).createElement());
}
