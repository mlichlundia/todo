import { generateId } from "./generateId.js";

export class Check {
	inputContainer;
	input;
	checkContainer;
	check;
	inputLabel;

	constructor(parent) {
		this.parent = parent;
		this.id = generateId();
	}

	initComponent() {
		this.init();
		this.createElement();
		this.setClasses();
		this.setAttributes();
	}

	init() {
		this.inputContainer = document.createElement("div");
		this.input = document.createElement("input");
		this.checkContainer = document.createElement("div");
		this.check = document.createElement("label");
		this.inputLabel = document.createElement("label");
	}

	createElement() {
		this.inputContainer.append(this.input);
		this.inputContainer.append(this.checkContainer);
		this.inputContainer.append(this.inputLabel);
		this.check.innerText = "✔";

		this.checkContainer.append(this.check);

		this.parent.append(this.inputContainer);
	}

	setClasses() {
		this.inputContainer.classList.add("todo__input-container");
		this.checkContainer.classList.add("todo__check");
		this.check.classList.add("todo__check_active");
		this.inputLabel.classList.add("todo__check-container");
	}

	setAttributes() {
		this.input.setAttribute("type", "checkbox");
		this.input.setAttribute("id", this.id);

		this.inputLabel.setAttribute("for", this.id);
	}
}
