export class Input {
	container;
	label;
	input;

	constructor({ name, type, placeholder, pattern, value }, parent, status) {
		this.name = name;
		this.value = value;
		this.type = type;
		this.pattern = pattern;
		this.placeholder = placeholder;
		this.parent = parent;
		this.status = status;
	}

	initComponent() {
		this.init();
		this.setClasses();
		this.setAttributes();
		this.setInner();
		this.createElement();
	}

	init() {
		this.container = document.createElement('div');
		this.label = document.createElement('label');
		this.input = document.createElement('input');
	}

	createElement() {
		this.container.append(this.label);
		this.container.append(this.input);

		this.parent.append(this.container);
	}

	setClasses() {
		this.container.classList.add('modal__field');
	}

	setAttributes() {
		this.label.setAttribute('for', this.name);
		this.input.setAttribute('id', this.name);
		this.input.setAttribute('type', this.type);
		this.input.setAttribute('placeholder', this.placeholder);
		this.input.setAttribute('pattern', this.pattern);
		this.input.setAttribute('required', 'true');
	}

	setInner() {
		if (this.status && this.input.type === 'date') {
			this.input.valueAsDate = new Date(this.value);
		} else if (this.status) {
			this.input.value = this.value;
		}
	}
}
