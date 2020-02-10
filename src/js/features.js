const toggleButtons = Array.from(document.querySelectorAll(`.features__toggleButton`));
const featuresItems = Array.from(document.querySelectorAll(`.features__item`));

toggleButtons.forEach((btn, i) => {
	btn.addEventListener(`click`, function() {
		featuresItems.forEach((item, ind) => {
			item.classList.remove(`features__item--current`);
			item.classList.add(`hidden`);

			if (ind === i) {
				item.classList.add(`features__item--current`);
				item.classList.remove(`hidden`);
			}
		});

		toggleButtons.forEach((button, idx) => {
			button.parentElement.classList.remove(`features__toggleItem--current`);

			if (idx === i) {
				button.parentElement.classList.add(`features__toggleItem--current`);
			}
		});


	});
});
