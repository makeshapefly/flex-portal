export function drawerSetting() {
	const bodyElement = document.body;
	let lastModalId;
	let openDrawerId = null;
	let openModalId = null;
	let backDropOverlay = document.getElementById('backDropDiv') || document.createElement('div');
	if (!backDropOverlay.id) {
		backDropOverlay.className = 'hidden backdrop-overlay backdrop-blur-xs';
		backDropOverlay.id = 'backDropDiv';
	}
	function toggleElementState(elementId, show, delay) {
		const element = document.getElementById(elementId);
		if (element) {
			if (!show) {
				element.classList.add('show');
				backDropOverlay.classList.add('hidden');
				setTimeout(() => {
					element.classList.add('hidden');
				}, 350);
			} else {
				element.classList.remove('hidden');
				setTimeout(() => {
					element.classList.remove('show');
					backDropOverlay.classList.remove('hidden');
				}, delay);
			}
			bodyElement.classList.toggle('overflow-hidden', show);
			if (show) {
				openDrawerId = elementId;
				openModalId = elementId;
			} else {
				openDrawerId = null;
				openModalId = null;
			}
		}
	}
	function attachListeners() {
		const allDrawerButtons = document.querySelectorAll('[data-drawer-target]');
		const allDrawerCloseButtons = document.querySelectorAll('[data-drawer-close]');
		const allModalButtons = document.querySelectorAll('[data-modal-target]');
		const allModalCloseButtons = document.querySelectorAll('[data-modal-close]');

		allDrawerButtons.forEach((element) => {
			const drawerId = element.getAttribute('data-drawer-target');
			if (drawerId) {
				element.addEventListener('click', function () {
					toggleElementState(drawerId, true, 0);
					document.body.appendChild(backDropOverlay);
				});
			}
		});

		allDrawerCloseButtons.forEach((element) => {
			const drawerId = element.getAttribute('data-drawer-close');
			if (drawerId) {
				element.addEventListener('click', function () {
					toggleElementState(drawerId, false, 0);
				});
			}
		});

		allModalButtons.forEach((element) => {
			const modalId = element.getAttribute('data-modal-target');
			if (modalId) {
				element.addEventListener('click', function () {
					lastModalId = modalId;
					toggleElementState(modalId, true, 200);
					const modalelement = document.getElementById(modalId);
					if (modalelement) {
						modalelement.appendChild(backDropOverlay);
					}
				});
			}
		});

		allModalCloseButtons.forEach((element) => {
			const modalId = element.getAttribute('data-modal-close');
			if (modalId) {
				element.addEventListener('click', function () {
					toggleElementState(modalId, false, 200);
				});
			}
		});

		backDropOverlay.addEventListener('click', function () {
			if (openDrawerId) {
				toggleElementState(openDrawerId, false, 0);
			}
			if (openModalId) {
				toggleElementState(openModalId, false, 200);
			}
		});
	}

	attachListeners();
	// Expose the function to reattach listeners
	return attachListeners;
}
