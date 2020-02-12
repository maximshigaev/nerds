import { render } from './catalog.js';

const showButton = document.querySelector(`.filter__button`);
const catalogItems = Array.from(document.querySelectorAll(`.catalog__item`));
const radioButtons = Array.from(document.querySelectorAll(`.filter__layoutItem input[type="radio"]`));
const checkboxes = Array.from(document.querySelectorAll(`.filter__featuresItem input[type="checkbox"]`));

export let isFiltered = false;
export let filteredCatalogItems = [];

showButton.addEventListener(`click`, function(evt) {
	evt.preventDefault();

	const checkedRadioBtn = radioButtons.find((item) => item.checked);
	const checkedCheckboxes = checkboxes.filter((item) => item.checked);
	const startPrice = +(document.querySelector(`.filter__manufacturers input[name="startPrice"]`).value
		.split(` `)
		.join(``));
	const endPrice = +(document.querySelector(`.filter__manufacturers input[name="endPrice"]`).value
		.split(` `)
		.join(``));
	const isRadioBtnUsed = checkedRadioBtn ? true : false;
	isFiltered = isRadioBtnUsed || startPrice !== endPrice || !(!checkedCheckboxes.length);

	if (isFiltered) {
		filteredCatalogItems = catalogItems.filter((item) => {
			return (!isRadioBtnUsed || item.dataset.layouttype === checkedRadioBtn.value)
				&& checkedCheckboxes.every((checkbox) => item.hasAttribute(`data-` + checkbox.name))
				&& +item.dataset.price > startPrice
				&& +item.dataset.price < endPrice;
		});

		render(filteredCatalogItems);
	}
});
