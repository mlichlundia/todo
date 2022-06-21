import { isValid } from "./isValid.js";
import { createTask } from "./createTask.js";
import { formatDate } from "./date.js";
import { Input } from "./createInput.js";

class Modal {
	constructor(parent, task, start, deadline) {
		this.parent = parent;

		this.taskField = task;
		this.startField = start;
		this.deadlineField = deadline;
	}

	createElement() {
		const modal = document.createElement("div");
		const modalContent = document.createElement("div");
		const modalTitle = document.createElement("h2");
		const form = document.createElement("form");

		const taskField = new Input(this.taskField).createElement();
		const startField = new Input(this.startField).createElement();
		const deadlineField = new Input(this.deadlineField).createElement();

		const task = taskField.querySelector("#task");

		const buttonContainer = document.createElement("div");
		const save = document.createElement("button");
		const close = document.createElement("button");

		modalTitle.innerText = "create task";
		save.innerText = "save";
		close.innerText = "close";

		save.setAttribute("type", "submit");

		modal.append(modalContent);

		modalContent.append(modalTitle);
		modalContent.append(form);

		form.append(taskField);
		form.append(startField);
		form.append(deadlineField);
		form.append(buttonContainer);

		buttonContainer.append(save);
		buttonContainer.append(close);

		this.parent.append(modal);

		this.addClasses();

		modal.addEventListener("click", this.toggle);
		modalContent.addEventListener("click", e => e.stopPropagation());
		close.addEventListener("click", e => {
			e.preventDefault();
			this.toggle();
		});
		task.addEventListener("keyup", () => isValid(task));
		form.addEventListener("submit", e => this.onSubmit(e, task));
	}

	addClasses() {
		const modal = document.querySelector("main>:last-child");
		const modalContent = modal.querySelector(":first-child");
		const buttonContainer = modalContent.querySelector("form>:last-child");
		const close = buttonContainer.querySelector(":last-child");

		modal.classList.add("modal");
		modalContent.classList.add("modal__content");
		buttonContainer.classList.add("modal__buttons");
		close.classList.add("close");
	}

	onSubmit(e, task) {
		e.preventDefault();
		const form = document.querySelector(".modal form");
		isValid(task);
		createTask(
			task.value,
			formatDate(document.querySelector("#start").value),
			formatDate(document.querySelector("#deadline").value)
		);
		this.toggle();
		form.reset();
	}

	toggle() {
		document.querySelector(".modal").classList.toggle("open");
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
modal.createElement();
openModal.addEventListener("click", () => modal.toggle());
