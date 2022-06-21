import { isValid } from "./isValid.js";
import { createTask } from "./createTask.js";
import { formatDate } from "./date.js";

class Modal {
	constructor() {}
	createElement() {
		const modal = document.createElement("div");
		const modalContent = document.createElement("div");
		const modalTitle = document.createElement("h2");
		const form = document.createElement("form");

		const taskContainer = document.createElement("div");
		const taskLabel = document.createElement("label");
		const taskInput = document.createElement("input");

		const startContainer = document.createElement("div");
		const startLabel = document.createElement("label");
		const startInput = document.createElement("input");

		const deadlineContainer = document.createElement("div");
		const deadlineLabel = document.createElement("label");
		const deadlineInput = document.createElement("input");

		const buttonContainer = document.createElement("div");
		const save = document.createElement("button");
		const close = document.createElement("button");

		modal.classList.add("modal");
		modalContent.classList.add("modal__content");
		modalTitle.classList.add("modal__title");
		taskContainer.classList.add("modal__field");
		startContainer.classList.add("modal__field");
		deadlineContainer.classList.add("modal__field");
		buttonContainer.classList.add("modal__buttons");
		close.classList.add("close");

		modalTitle.innerText = "create task";
		save.innerText = "save";
		close.innerText = "close";

		taskLabel.setAttribute("for", "task");
		startLabel.setAttribute("for", "start");
		deadlineLabel.setAttribute("for", "deadline");

		taskInput.setAttribute("id", "task");
		taskInput.setAttribute("type", "text");
		taskInput.setAttribute("placeholder", "Your task");
		taskInput.setAttribute("pattern", `([0-9A-Za-z\\s]+)+`);
		taskInput.setAttribute("required", "true");

		startInput.setAttribute("id", "start");
		startInput.setAttribute("type", "date");
		startInput.setAttribute(
			"pattern",
			"(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$"
		);
		startInput.setAttribute("required", "true");

		deadlineInput.setAttribute("id", "deadline");
		deadlineInput.setAttribute("type", "date");
		deadlineInput.setAttribute(
			"pattern",
			"(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$"
		);
		deadlineInput.setAttribute("required", "true");

		save.setAttribute("type", "submit");

		modal.append(modalContent);

		modalContent.append(modalTitle);
		modalContent.append(form);

		form.append(taskContainer);
		form.append(startContainer);
		form.append(deadlineContainer);
		form.append(buttonContainer);

		taskContainer.append(taskLabel);
		taskContainer.append(taskInput);

		startContainer.append(startLabel);
		startContainer.append(startInput);

		deadlineContainer.append(deadlineLabel);
		deadlineContainer.append(deadlineInput);

		buttonContainer.append(save);
		buttonContainer.append(close);

		modalContent.addEventListener("click", e => e.stopPropagation());

		close.addEventListener("click", e => {
			e.preventDefault();
			this.toggle();
		});

		taskInput.addEventListener("keyup", () => isValid(task));

		form.addEventListener("submit", e => {
			e.preventDefault();
			isValid(task);
			createTask(
				taskInput.value,
				formatDate(startInput.value),
				formatDate(deadlineInput.value)
			);
			this.toggle();
			form.reset();
		});

		return modal;
	}

	toggle() {
		document.querySelector(".modal").classList.toggle("open");
	}
}

const openModal = document.querySelector(".open-modal-button");

const modal = new Modal();
const modalRef = modal.createElement();
const main = document.querySelector("main");

main.append(modalRef);

modalRef.addEventListener("click", () => modal.toggle());
openModal.addEventListener("click", () => modal.toggle());
