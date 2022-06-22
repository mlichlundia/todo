import { isValid } from './isValid.js';
import { createTask } from './createTask.js';
import { Input } from './generateInput.js';
import { CONSTANTS } from './constants.js';

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

	static createInput(data, parent) {
		new Input(data, parent).initComponent();
	}

	initComponent() {
		this.init();
		this.createDOM();
		this.setClasses();
		this.setAttributes();
		this.setHendlers();
	}

	init() {
		this.modal = document.createElement('div');
		this.modalContent = document.createElement('div');
		this.modalTitle = document.createElement('h2');
		this.form = document.createElement('form');

		this.buttonContainer = document.createElement('div');
		this.save = document.createElement('button');
		this.close = document.createElement('button');
	}

	createDOM() {
		this.modalTitle.innerText = 'create task';
		this.save.innerText = 'save';
		this.close.innerText = 'close';

		this.modal.append(this.modalContent);
		this.modalContent.append(this.modalTitle);
		this.modalContent.append(this.form);

		Modal.createInput(this.taskField, this.form);
		Modal.createInput(this.startField, this.form);
		Modal.createInput(this.deadlineField, this.form);

		this.form.append(this.buttonContainer);

		this.buttonContainer.append(this.save);
		this.buttonContainer.append(this.close);
		this.parent.append(this.modal);
	}

	setClasses() {
		this.modal.classList.add('modal');
		this.modalContent.classList.add('modal__content');
		this.buttonContainer.classList.add('modal__buttons');
		this.close.classList.add('close');
	}

	setAttributes() {
		this.save.setAttribute('type', 'submit');
	}

	setHendlers() {
		const task = this.form.querySelector('#task');

		this.modal.addEventListener('click', this.toggle.bind(this));
		this.modalContent.addEventListener('click', (e) => e.stopPropagation());
		this.close.addEventListener('click', (e) => {
			e.preventDefault();
			this.toggle();
		});

		task.addEventListener('keyup', isValid.bind(this, task));
		this.form.addEventListener('submit', (e) => this.onSubmit(e, task));
	}

	onSubmit(e, task) {
		e.preventDefault();
		isValid(task);
		createTask(
			task.value,
			document.querySelector('#start').value,
			document.querySelector('#deadline').value
		);
		this.toggle();
		this.form.reset();
	}

	toggle() {
		this.modal.classList.toggle('open');
	}
}

const taskField = {
	name: 'task',
	type: 'text',
	pattern: CONSTANTS.PATTERN_NAME,
	placeholder: 'Your task',
};
const startField = {
	name: 'start',
	type: 'date',
	pattern: CONSTANTS.PATTERN_DATE,
};
const deadlineField = {
	name: 'deadline',
	type: 'date',
	pattern: CONSTANTS.PATTERN_DATE,
};

const openModal = document.querySelector('.open-modal-button');

const main = document.querySelector('main');
const modal = new Modal(main, taskField, startField, deadlineField);
modal.initComponent();
openModal.addEventListener('click', () => modal.toggle());
