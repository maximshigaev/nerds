const showModalBtn = document.querySelector(`.contacts__button`);
const modalWindow = document.querySelector(`.modal`);
const closeModalBtn = modalWindow.querySelector(`.modal__closeButton`);
const overlay = document.querySelector(`.overlay`);
const links = Array.from(document.querySelectorAll(`a`));
const inputName = modalWindow.querySelector(`input[name="userName"]`);

const closeModal = () => {
	modalWindow.classList.add(`hidden`);
	overlay.classList.add(`hidden`);
	document.body.style.overflow = ``;

	links.forEach((link) => {
		link.tabIndex = 0;
	});
};

const openModal = (e) => {
	e.preventDefault();
	modalWindow.classList.remove(`hidden`);
	inputName.focus();
	overlay.classList.remove(`hidden`);
	document.body.style.overflow = `hidden`;

	links.forEach((link) => {
		link.tabIndex = !link.classList.contains(`modal__button`)
			? -1
			: 0;
	});
};

const windowEscDownHandler = (evt) => {
	if (evt.code === `Escape`) {
		closeModal();
	}
};

showModalBtn.addEventListener(`click`, function(evt) {
	openModal(evt);

	window.addEventListener(`keydown`, windowEscDownHandler);
});

closeModalBtn.addEventListener(`click`, function() {
	closeModal();

	window.removeEventListener(`keydown`, windowEscDownHandler);
});
