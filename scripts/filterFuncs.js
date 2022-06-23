const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed = document.querySelector('#completed');
const clear = document.querySelector('#clear');

const taskContainer = document.querySelector('.todo__list');
const openFilterButton = document.querySelector('.open-filter-button');
const filterContainer = document.querySelector('.filter__container');
const byText = document.querySelector('#text-sort');
const byDate = document.querySelector('#date-sort');
const searchForm = document.querySelector('.filter__container form');
const searchInput = document.querySelector('#search-task');

all.addEventListener('click', showAll);
active.addEventListener('click', showActive);
completed.addEventListener('click', showCompleted);
clear.addEventListener('click', clearCompleted);

openFilterButton.addEventListener('click', toggleFilter);

byText.addEventListener('click', textSort);
byDate.addEventListener('click', dateSort);
searchForm.addEventListener('submit', (e) => searchFilter(e));

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
	const list = [...Object.taskList];
	Object.taskList = list.filter(
		(item) => !item.taskContainer.hasAttribute('data-status')
	);

	tasks.forEach((item) => {
		if (item.hasAttribute('data-status')) {
			item.remove();
		}
	});
}

function toggleFilter() {
	filterContainer.style.display = filterContainer.style.display ? '' : 'block';
}

function textSort() {
	const list = [...Object.taskList];
	const filtered = list.sort((a, b) => (a.taskText < b.taskText ? -1 : 1));

	recreateTaskList(filtered);
}

function dateSort() {
	const list = [...Object.taskList];
	const filtered = list.sort((a, b) =>
		a.startData.value < b.startData.value ? -1 : 1
	);

	recreateTaskList(filtered);
}

function searchFilter(e) {
	e.preventDefault();

	const list = [...Object.taskList];
	list.map(
		(item) =>
			(item.taskContainer.style.display =
				item.taskText.indexOf(searchInput.value) !== -1 ? '' : 'none')
	);
}

function recreateTaskList(list) {
	taskContainer.innerHTML = '';
	list.forEach((item) => taskContainer.append(item.taskContainer));
}
