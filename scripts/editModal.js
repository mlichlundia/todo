import { isValid } from './isValid.js';
import { formatDate } from './date.js';
import { Input } from './generateInput.js';

export class EditModal {
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

	constructor(parent, task, start, deadline, id) {
		this.parent = parent;
		this.taskField = task;
		this.startField = start;
		this.deadlineField = deadline;
		this.id = id;
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
		this.modalTitle.innerText = 'edit task';
		this.save.innerText = 'save';
		this.close.innerText = 'close';

		this.modal.append(this.modalContent);
		this.modalContent.append(this.modalTitle);
		this.modalContent.append(this.form);

		new Input(this.taskField, this.form, 'edit').initComponent();
		new Input(this.startField, this.form, 'edit').initComponent();
		new Input(this.deadlineField, this.form, 'edit').initComponent();

		this.form.append(this.buttonContainer);

		this.buttonContainer.append(this.save);
		this.buttonContainer.append(this.close);
		this.parent.append(this.modal);
	}

	setClasses() {
		this.modal.classList.add('modal');
		this.modal.classList.add('edit-modal');
		this.modalContent.classList.add('modal__content');
		this.buttonContainer.classList.add('modal__buttons');
		this.close.classList.add('close');
	}

	setAttributes() {
		this.modal.setAttribute('id', this.id);
		this.save.setAttribute('type', 'submit');
	}

	setHendlers() {
		const task = this.form.querySelector(`:first-child input`);

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
		const taskText = document.querySelector(`.task__container#${this.id} h3`);
		const term = document.querySelector(`.task__container#${this.id} p`);
		const start = this.form.querySelector('#start').value;
		const deadline = this.form.querySelector('#deadline').value;

		taskText.innerText = task.value;
		term.innerText = `${formatDate(start)} — ${formatDate(deadline)}`;

		this.toggle();
	}

	toggle() {
		this.modal.classList.toggle('open');
	}
}
