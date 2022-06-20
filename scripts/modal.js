import { isValid } from "./isValid.js";
import { createTask } from "./createTask.js";
import { formatDate } from "./date.js";

const modal = document.querySelector(".modal"),
	modalContent = document.querySelector(".modal__content"),
	form = document.querySelector(".modal__content form"),
	close = document.querySelector(".modal__buttons .close"),
	openModal = document.querySelector(".open-modal-button"),
	task = document.querySelector("#task");

openModal.addEventListener("click", toggleModal);
modal.addEventListener("click", toggleModal);
close.addEventListener("click", e => {
	e.preventDefault();
	toggleModal();
});

modalContent.addEventListener("click", e => e.stopPropagation());

function toggleModal() {
	modal.classList.toggle("open");
}

task.addEventListener("keyup", () => isValid(task));

form.addEventListener("submit", e => {
	e.preventDefault();
	isValid(task);
	createTask(
		form.elements.task.value,
		formatDate(form.elements.start.value),
		formatDate(form.elements.deadline.value)
	);
	toggleModal();
	form.reset();
});
