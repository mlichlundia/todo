export class Input {
	constructor({ name, type, placeholder, pattern }) {
		this.name = name;
		this.type = type;
		this.pattern = pattern;
		this.placeholder = placeholder;
	}
	createElement() {
		const container = document.createElement("div");
		const label = document.createElement("label");
		const input = document.createElement("input");

		container.classList.add("modal__field");

		label.setAttribute("for", this.name);

		input.setAttribute("id", this.name);
		input.setAttribute("type", this.type);
		input.setAttribute("placeholder", this.placeholder);
		input.setAttribute("pattern", this.pattern);
		input.setAttribute("required", "true");

		container.append(label);
		container.append(input);

		return container;
	}
}
