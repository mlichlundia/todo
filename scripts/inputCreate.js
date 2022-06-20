import { createTask } from "./createTask.js";
import { isValid } from "./isValid.js";

const input = document.querySelector(".todo__create-container input");

input.addEventListener("keyup", e => {
	isValid(input);
	checkInput(e);
});

function checkInput(e) {
	if (e.keyCode === 13 && input.checkValidity()) {
		input.blur();
		createTask(input.value);
		input.value = "";
	}
}
