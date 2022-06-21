import { isValid } from "./isValid.js";
import { createTask } from "./createTask.js";
import { formatDate } from "./date.js";
import { Input } from "./generateInput.js";

class Modal {
	modal;
	modalContent;
	modalTitle;
	form;
	taskField;
	startField;
	deadlineField;
	buttonContainer;
	save;
	close;

	constructor(parent, task, start, deadline) {
		this.parent = parent;
		this.taskField = task;
		this.startField = start;
		this.deadlineField = deadline;
	}

	init() {
		this.modal = document.createElement("div");
		this.modalContent = document.createElement("div");
		this.modalTitle = document.createElement("h2");
		this.form = document.createElement("form");

		this.taskField = new Input(this.taskField).createElement();
		this.startField = new Input(this.startField).createElement();
		this.deadlineField = new Input(this.deadlineField).createElement();

		this.buttonContainer = document.createElement("div");
		this.save = document.createElement("button");
		this.close = document.createElement("button");

		this.createDOM();
		this.setClasses();
		this.setAttributes();
		this.setHendlers();
	}

	createDOM() {
		this.modalTitle.innerText = "create task";
		this.save.innerText = "save";
		this.close.innerText = "close";

		this.modal.append(this.modalContent);
		this.modalContent.append(this.modalTitle);
		this.modalContent.append(this.form);

		this.form.append(this.taskField);
		this.form.append(this.startField);
		this.form.append(this.deadlineField);
		this.form.append(this.buttonContainer);

		this.buttonContainer.append(this.save);
		this.buttonContainer.append(this.close);
		this.parent.append(this.modal);
	}

	setClasses() {
		this.modal.classList.add("modal");
		this.modalContent.classList.add("modal__content");
		this.buttonContainer.classList.add("modal__buttons");
		this.close.classList.add("close");
	}

	setAttributes() {
		this.save.setAttribute("type", "submit");
	}

	setHendlers() {
		const task = this.taskField.querySelector("#task");

		this.modal.addEventListener("click", () => this.toggle());
		this.modalContent.addEventListener("click", e => e.stopPropagation());
		this.close.addEventListener("click", e => {
			e.preventDefault();
			this.toggle();
		});

		task.addEventListener("keyup", () => isValid(task));
		this.form.addEventListener("submit", e => this.onSubmit(e, task));
	}

	onSubmit(e, task) {
		e.preventDefault();
		isValid(task);
		createTask(
			task.value,
			formatDate(document.querySelector("#start").value),
			formatDate(document.querySelector("#deadline").value)
		);
		this.toggle();
		this.form.reset();
	}

	toggle() {
		this.modal.classList.toggle("open");
	}
}

const taskField = {
	name: "task",
	type: "text",
	pattern: `([0-9A-Za-z\\s]+)+`,
	placeholder: "Your task",
};
const startField = {
	name: "start",
	type: "date",
	pattern: "(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$",
};
const deadlineField = {
	name: "deadline",
	type: "date",
	pattern: "(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$",
};

const openModal = document.querySelector(".open-modal-button");

const main = document.querySelector("main");
const modal = new Modal(main, taskField, startField, deadlineField);
modal.init();
openModal.addEventListener("click", () => modal.toggle());
