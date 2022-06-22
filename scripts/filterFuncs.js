const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed = document.querySelector('#completed');
const clear = document.querySelector('#clear');

all.addEventListener('click', showAll);
active.addEventListener('click', showActive);
completed.addEventListener('click', showCompleted);
clear.addEventListener('click', clearCompleted);

function showAll() {
	const tasks = document.querySelectorAll('.task__container');

	tasks.forEach((item) => (item.style.display = ''));
}

function showActive() {
	const tasks = document.querySelectorAll('.task__container');

	tasks.forEach(
		(item) =>
			(item.style.display = item.hasAttribute('data-status') ? 'none' : '')
	);
}

function showCompleted() {
	const tasks = document.querySelectorAll('.task__container');

	tasks.forEach(
		(item) =>
			(item.style.display = !item.hasAttribute('data-status') ? 'none' : '')
	);
}

function clearCompleted() {
	const tasks = document.querySelectorAll('.task__container');

	tasks.forEach((item) => {
		if (item.hasAttribute('data-status')) {
			item.remove();
		}
	});
}
