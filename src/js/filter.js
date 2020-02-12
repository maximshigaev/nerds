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

const startPin = document.querySelector(`.filter__startPin`);
const endPin = document.querySelector(`.filter__endPin`);
const filterPriceX = document.querySelector(`.filter__price`).getBoundingClientRect().left;
const rangeLine = document.querySelector(`.filter__range`);
const valueLine = document.querySelector(`.filter__val`);
const leftBorder = rangeLine.getBoundingClientRect().left;
const rightBorder = rangeLine.getBoundingClientRect().right;
const startPriceInput = document.querySelector(`input[name="startPrice"]`);
const endPriceInput = document.querySelector(`input[name="endPrice"]`);
const MAX_PRICE = 15000;

const mouseDownHandler = (downEvt) => {
	const shiftX = downEvt.clientX - downEvt.target.getBoundingClientRect().left;
	const moveAt = (pageX) => {
		downEvt.target.style.left = pageX - shiftX - filterPriceX + `px`;
	};

	const mouseMoveHandler = (moveEvt) => {
		const endPinX = endPin.getBoundingClientRect().left;
		const startPinX = startPin.getBoundingClientRect().left;
		const halfPinWidth = startPin.clientWidth / 2;
		const relativeMoveX = moveEvt.pageX - shiftX;
		const valueLineLeft = startPinX + halfPinWidth - filterPriceX;

		if (relativeMoveX >= leftBorder - halfPinWidth && relativeMoveX <= rightBorder - halfPinWidth) {
			if ((downEvt.target.classList.contains(`filter__startPin`) && relativeMoveX <= endPinX)
				|| (downEvt.target.classList.contains(`filter__endPin`) && relativeMoveX >= startPinX)
			) {
				moveAt(moveEvt.pageX);

				valueLine.style.left = valueLineLeft + `px`;
				valueLine.style.width = endPinX + halfPinWidth - filterPriceX - (valueLineLeft) + `px`;

				startPriceInput.value = (MAX_PRICE * (valueLine.getBoundingClientRect().left - leftBorder)
										/ rangeLine.clientWidth).toFixed(0);
				endPriceInput.value = (MAX_PRICE * (valueLine.getBoundingClientRect().right - leftBorder)
										/ rangeLine.clientWidth).toFixed(0);
			}
		}
	};

	const mouseUpHandler = () => {
		document.removeEventListener(`mousemove`, mouseMoveHandler);
		document.removeEventListener(`mousemup`, mouseUpHandler);
	};

	document.addEventListener(`mousemove`, mouseMoveHandler);
	downEvt.target.addEventListener(`mouseup`, mouseUpHandler);
};

startPin.addEventListener(`mousedown`, (downEvt) => mouseDownHandler(downEvt));
endPin.addEventListener(`mousedown`, (downEvt) => mouseDownHandler(downEvt));
