import { Check } from './check.js';
import { EditModal } from './editModal.js';
import { formatDate } from './date.js';
import { tomorrow } from './date.js';
import { generateId } from './generateId.js';
import { CONSTANTS } from './constants.js';

export class Task {
	taskContainer;
	taskInfo;
	task;
	term;
	controlContainer;
	check;
	deleteButton;
	editButton;

	constructor(
		task,
		start = new Date(),
		deadline = tomorrow(new Date()),
		parent
	) {
		this.taskText = task;
		this.start = start;
		this.deadline = deadline;
		this.parent = parent;
		this.id = generateId();

		this.taskData = {
			name: 'task',
			type: 'text',
			pattern: CONSTANTS.PATTERN_NAME,
			placeholder: 'Edit task',
			value: this.taskText,
		};
		this.startData = {
			name: 'start',
			type: 'date',
			pattern: CONSTANTS.PATTERN_DATE,
			value: this.start,
		};
		this.deadlineData = {
			name: 'deadline',
			type: 'date',
			pattern: CONSTANTS.PATTERN_DATE,
			value: this.deadline,
		};

		this.initComponent();
	}

	initComponent() {
		this.init();
		this.createElement();
		this.setClasses();
		this.setAttributes();
		this.setHendlers();
		return this;
	}

	init() {
		this.taskContainer = document.createElement('li');
		this.taskInfo = document.createElement('div');
		this.controlContainer = document.createElement('div');
		this.task = document.createElement('h3');
		this.term = document.createElement('p');
		this.deleteButton = document.createElement('button');
		this.editButton = document.createElement('button');
	}

	createElement() {
		this.task.innerText = this.taskText;
		this.term.innerHTML = `${formatDate(this.start)} — ${formatDate(
			this.deadline
		)}`;
		this.deleteButton.innerText = '✖';
		this.editButton.innerText = '✎';

		this.taskInfo.append(this.task);
		this.taskInfo.append(this.term);

		new Check(this.controlContainer).initComponent();
		this.controlContainer.append(this.deleteButton);
		this.controlContainer.append(this.editButton);

		this.taskContainer.append(this.taskInfo);
		this.taskContainer.append(this.controlContainer);

		this.parent.append(this.taskContainer);

		new EditModal(
			document.querySelector('main'),
			this.taskData,
			this.startData,
			this.deadlineData,
			this.id
		).initComponent();
	}

	setClasses() {
		this.taskContainer.classList.add('task__container');
		this.taskInfo.classList.add('task__info');
		this.task.classList.add('task');
		this.deleteButton.classList.add('task__button');
		this.editButton.classList.add('task__button');
	}

	setAttributes() {
		this.taskContainer.setAttribute('id', this.id);
	}

	setHendlers() {
		this.check = this.controlContainer.querySelector('input');
		this.check.addEventListener('change', this.toggleDone.bind(this));
		this.deleteButton.addEventListener('click', this.delete.bind(this));
		this.editButton.addEventListener('click', this.editModalOpen.bind(this));
	}

	toggleDone() {
		const state = this.taskContainer.getAttribute('data-status');

		if (state === 'done') {
			this.taskContainer.removeAttribute('data-status', 'done');
			this.task.style.textDecoration = '';
			this.task.style.color = '';
		} else {
			this.taskContainer.setAttribute('data-status', 'done');
			this.task.style.textDecoration = 'line-through';
			this.task.style.color = 'rgb(98 102 116)';
		}
	}

	delete() {
		const list = [...Object.taskList];

		Object.taskList = list.filter((item) => item !== this);
		this.taskContainer.remove();
	}

	editModalOpen() {
		document.querySelector(`.edit-modal#${this.id}`).classList.add('open');
	}
}
