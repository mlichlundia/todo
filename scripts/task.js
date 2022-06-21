import { Check } from "./check.js";
import { formatDate } from "./date.js";
import { tomorrow } from "./date.js";
import { generateId } from "./generateId.js";

export class Task {
	taskContainer;
	taskInfo;
	task;
	term;
	controlContainer;
	check;
	deleteButton;

	constructor(
		task,
		start = formatDate(new Date()),
		deadline = formatDate(tomorrow(new Date())),
		parent
	) {
		this.taskText = task;
		this.start = start;
		this.deadline = deadline;
		this.parent = parent;
		this.id = generateId();
	}

	initComponent() {
		this.init();
		this.createElement();
		this.setClasses();
		this.setAttributes();
		this.setHendlers();
	}

	init() {
		this.taskContainer = document.createElement("li");
		this.taskInfo = document.createElement("div");
		this.controlContainer = document.createElement("div");
		this.task = document.createElement("h3");
		this.term = document.createElement("p");
		this.deleteButton = document.createElement("button");
	}

	createElement() {
		this.task.innerText = this.taskText;
		this.term.innerHTML = `${this.start} — ${this.deadline}`;
		this.deleteButton.innerText = "✖";

		this.taskInfo.append(this.task);
		this.taskInfo.append(this.term);

		new Check(this.controlContainer).initComponent();
		this.controlContainer.append(this.deleteButton);

		this.taskContainer.append(this.taskInfo);
		this.taskContainer.append(this.controlContainer);

		this.parent.append(this.taskContainer);
	}

	setClasses() {
		this.taskContainer.classList.add("task__container");
		this.taskInfo.classList.add("task__info");
		this.task.classList.add("task");
		this.deleteButton.classList.add("task__button");
	}

	setAttributes() {
		this.taskContainer.setAttribute("id", this.id);
	}

	setHendlers() {
		this.check = this.controlContainer.querySelector("input");
		this.check.addEventListener("change", () => this.toggleDone());
		this.deleteButton.addEventListener("click", () => this.delete());
	}

	toggleDone() {
		const state = this.taskContainer.getAttribute("data-status");

		if (state === "done") {
			this.taskContainer.removeAttribute("data-status", "done");
			this.task.style.textDecoration = "";
			this.task.style.color = "";
		} else {
			this.taskContainer.setAttribute("data-status", "done");
			this.task.style.textDecoration = "line-through";
			this.task.style.color = "rgb(98 102 116)";
		}
	}

	delete() {
		this.taskContainer.remove();
	}
}
