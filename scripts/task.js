import { Check } from "./check.js";
import { formatDate } from "./date.js";
import { tomorrow } from "./date.js";
import { generateId } from "./generateId.js";

export class Task {
	taskContainer;
	taskInfo;
	task;
	term;
	check;

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
		this.task = document.createElement("h3");
		this.term = document.createElement("p");
	}

	createElement() {
		this.task.innerText = this.taskText;
		this.term.innerHTML = `${this.start} — ${this.deadline}`;
		this.taskInfo.append(this.task);
		this.taskInfo.append(this.term);
		this.taskContainer.append(this.taskInfo);
		new Check(this.taskContainer).initComponent();

		this.parent.append(this.taskContainer);
	}

	setClasses() {
		this.taskContainer.classList.add("task__container");
		this.taskInfo.classList.add("task__info");
		this.task.classList.add("task");
	}

	setAttributes() {
		this.taskContainer.setAttribute("id", this.id);
	}

	setHendlers() {
		this.check = document.querySelector(`#${this.id} input`);
		this.check.addEventListener("change", () => this.toggleDone());
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
}
