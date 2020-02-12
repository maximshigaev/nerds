import { isFiltered, filteredCatalogItems } from './filter.js';

const priceButton = document.querySelector(`.catalog__priceButton`);
const typeButton = document.querySelector(`.catalog__typeButton`);
const titleButton = document.querySelector(`.catalog__titleButton`);
const descendButton = document.querySelector(`.catalog__orderButton--descend`);
const ascendButton = document.querySelector(`.catalog__orderButton--ascend`);
const catalogItems = Array.from(document.querySelectorAll(`.catalog__item`));
const catalogSortItems = Array.from(document.querySelectorAll(`.catalog__sortItem`));
const catalogList = document.querySelector(`.catalog__list`);
let sortOrder = null;
let sortType = null;

export const render = (items = catalogItems) => {
	catalogList.innerHTML = ``;

	items.forEach((item) => {
		catalogList.append(item);
	});
};

const changeSortOrder = (order, evt, btn) => {
	sortOrder = order;
	evt.target.classList.add(`catalog__orderItem--current`);
	btn.classList.remove(`catalog__orderItem--current`);

	if (isFiltered) {
		filteredCatalogItems.reverse();
		render(filteredCatalogItems);
	} else {
		catalogItems.reverse();
		render();
	}
};

ascendButton.addEventListener(`click`, function(evt) {
	if (sortOrder !== `ascend`) {
		changeSortOrder(`ascend`, evt, descendButton);
	}
});

descendButton.addEventListener(`click`, function(evt) {
	if (sortOrder !== `descend`) {
		changeSortOrder(`descend`, evt, ascendButton);
	}
});

const sortTypeBtnHandler = (evt, type, sortDescendFn, sortAscendFn) => {
	evt.preventDefault();

	if (sortType !== type) {
		sortType = type;
		catalogSortItems.forEach((item) => item.classList.remove(`catalog__sortItem--current`));
		evt.target.parentElement.classList.add(`catalog__sortItem--current`);

		switch (sortOrder) {
		case `descend`:
			if (isFiltered) {

				filteredCatalogItems.sort(sortDescendFn);
				render(filteredCatalogItems);
			} else {
				catalogItems.sort(sortDescendFn);
				render();
			}

			break;

		case `ascend`:
			if (isFiltered) {

				filteredCatalogItems.sort(sortAscendFn);
				render(filteredCatalogItems);
			} else {
				catalogItems.sort(sortAscendFn);
				render();
			}

			break;
		}
	}
};

titleButton.addEventListener(`click`, function(evt) {
	const sortDescendFn = (a, b) => (a.dataset.title < b.dataset.title) ? 1 : -1;
	const sortAscendFn = (a, b) => (a.dataset.title > b.dataset.title) ? 1 : -1;

	sortTypeBtnHandler(evt, `title`, sortDescendFn, sortAscendFn);
});

typeButton.addEventListener(`click`, function(evt) {
	const sortDescendFn = (a, b) => (+a.dataset.typeorder > +b.dataset.typeorder) ? 1 : -1;
	const sortAscendFn = (a, b) => (+a.dataset.typeorder < +b.dataset.typeorder) ? 1 : -1;

	sortTypeBtnHandler(evt, `type`, sortDescendFn, sortAscendFn);
});

priceButton.addEventListener(`click`, function(evt) {
	const sortDescendFn = (a, b) => (+a.dataset.price < +b.dataset.price) ? 1 : -1;
	const sortAscendFn = (a, b) => (+a.dataset.price > +b.dataset.price) ? 1 : -1;

	sortTypeBtnHandler(evt, `price`, sortDescendFn, sortAscendFn);
});
