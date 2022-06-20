import { formatDate } from "./date.js";
import { tomorrow } from "./date.js";

class Task {
	constructor(
		task,
		start = formatDate(new Date()),
		deadline = formatDate(tomorrow(new Date()))
	) {
		this.task = task;
		this.start = start;
		this.deadline = deadline;
	}

	createElement() {
		const taskContainer = document.createElement("li"),
			task = document.createElement("h3"),
			term = document.createElement("p");

		taskContainer.classList.add("task__container");
		task.classList.add("task");

		task.innerText = this.task;
		term.innerHTML = `${this.start} — ${this.deadline}`;

		taskContainer.append(task);
		taskContainer.append(term);

		return taskContainer;
	}
}
