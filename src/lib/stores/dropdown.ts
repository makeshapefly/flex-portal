import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export class DropdownState implements UI.IDropdownState {
	isOpen: Writable<boolean>;
	alignTo: Writable<UI.DropdownAlignTo>; // To store the alignment
	buttonElement: HTMLElement | null = null; // To store the button reference
	dropdownElement: HTMLElement | null = null; // To store the dropdown reference
	dropdownWdth: number = 0;
	dropdownHeigth: number = 0;
	constructor(isOpen: boolean, alignTo: UI.DropdownAlignTo) {
		this.isOpen = writable(isOpen);
		this.alignTo = writable(alignTo);
		// Bind methods to ensure 'this' refers to the class instance
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.toggle = this.toggle.bind(this);
		this.setWidthHeight = this.setWidthHeight.bind(this);
	}
	open() {
		this.isOpen.set(true);
		if (browser) {
			setTimeout(() => this.setPositionDropdown(), 0);
		}
	}
	close() {
		this.isOpen.set(false);
	}
	toggle() {
		this.isOpen.update((prev) => !prev);
		if (browser) {
			setTimeout(() => this.setPositionDropdown(), 0);
		}
	}
	setWidthHeight(width: number, height: number) {
		this.dropdownWdth = width;
		this.dropdownHeigth = height;
	}

	private setPositionDropdown() {
		if (!this.dropdownElement || !this.buttonElement || !browser)
			return console.error('Dropdown element or button element not found in setPositionDropdown');

		const buttonRect =
			this.buttonElement.closest('.dropdown')?.getBoundingClientRect() ||
			this.buttonElement.getBoundingClientRect();
		this.dropdownElement.classList.remove('hidden');
		let dropdownPosition = { left: 0, top: 0 };
		// console.log('Opening dropdown', this.alignTo);
		let alignTo: UI.DropdownAlignTo = 'left';
		this.alignTo.subscribe((e) => {
			switch (e) {
				case 'right':
					dropdownPosition = DropdownState.getRight(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				case 'right-top':
					dropdownPosition = DropdownState.getTopRight(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				case 'left-top':
					dropdownPosition = DropdownState.getTopLeft(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				case 'right-bottom':
					dropdownPosition = DropdownState.getRightBottom(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				case 'auto':
					dropdownPosition = DropdownState.getAutoPosition(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				case 'none':
					dropdownPosition = DropdownState.getNone(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
				default:
					dropdownPosition = DropdownState.getDefault(
						buttonRect,
						this.dropdownWdth,
						this.dropdownHeigth
					);
					break;
			}
		});
		this.dropdownElement.style.left = `${Math.max(0, dropdownPosition.left)}px`;
		this.dropdownElement.style.top = `${Math.max(0, dropdownPosition.top)}px`;
	}

	private static getDefault(buttonRect: DOMRect, dropdownWidth: number, dropdownHeight: number) {
		let data = { left: 0, top: 0 };

		const yTSpace = buttonRect.top;
		const yBSpace = window.innerHeight - buttonRect.bottom;
		const xRSpace = window.innerWidth - buttonRect.left;
		const xLSpace = buttonRect.left;
		data.left = xRSpace >= dropdownWidth ? buttonRect.left : buttonRect.right - dropdownWidth;

		if (yBSpace >= dropdownHeight) {
			data.top = buttonRect.bottom;
		} else if (yTSpace >= dropdownHeight) {
			data.top = buttonRect.top - dropdownHeight;
		} else {
			data.top = buttonRect.top;
			if (xRSpace >= dropdownWidth) {
				data.left = buttonRect.right;
			} else if (xLSpace >= dropdownWidth) {
				data.left = buttonRect.left - dropdownWidth;
			} else {
				data.left = buttonRect.right;
			}
		}
		return data;
	}

	private static getRight(buttonRect: DOMRect, dropdownWidth: number, dropdownHeight: number) {
		let data = { left: 0, top: 0 };

		const yTSpace = buttonRect.top;
		const yBSpace = window.innerHeight - buttonRect.bottom;
		const xLSpace = buttonRect.right;
		data.left = xLSpace < dropdownWidth ? buttonRect.left : buttonRect.right - dropdownWidth;

		if (yBSpace >= dropdownHeight) {
			data.top = buttonRect.bottom;
		} else if (yTSpace >= dropdownHeight) {
			data.top = buttonRect.top - dropdownHeight;
		} else {
			data.top = buttonRect.top;
			if (xLSpace - buttonRect.width > dropdownWidth) {
				data.left = buttonRect.left - dropdownWidth;
			} else {
				data.left = buttonRect.right;
			}
		}
		return data;
	}

	private static getTopRight(buttonRect: DOMRect, dropdownWidth: number, dropdownHeight: number) {
		let data = { left: 0, top: 0 };

		const yTSpace = buttonRect.bottom;
		const yBSpace = window.innerHeight - buttonRect.top;
		const xRSpace = window.innerWidth - buttonRect.right;
		const xLSpace = buttonRect.left;

		if (yBSpace >= dropdownHeight) {
			data.top = buttonRect.top;
		} else if (yTSpace >= dropdownHeight) {
			data.top = buttonRect.bottom - dropdownHeight;
		} else {
			data.top = buttonRect.top;
		}
		if (xRSpace >= dropdownWidth) {
			data.left = buttonRect.right;
		} else if (xLSpace >= dropdownWidth) {
			data.left = buttonRect.left - dropdownWidth;
		} else {
			data.left = buttonRect.right;
		}

		return data;
	}

	private static getTopLeft(buttonRect: DOMRect, dropdownWidth: number, dropdownHeight: number) {
		let data = { left: 0, top: 0 };

		const yTSpace = buttonRect.bottom;
		const yBSpace = window.innerHeight - buttonRect.top;
		const xRSpace = window.innerWidth - buttonRect.right;
		const xLSpace = buttonRect.left;

		if (yBSpace >= dropdownHeight) {
			data.top = buttonRect.top;
		} else if (yTSpace >= dropdownHeight) {
			data.top = buttonRect.bottom - dropdownHeight;
		} else {
			data.top = buttonRect.top;
		}
		if (xLSpace >= dropdownWidth) {
			data.left = buttonRect.left - dropdownWidth;
		} else if (xRSpace >= dropdownWidth) {
			data.left = buttonRect.right;
		} else {
			data.left = buttonRect.left - dropdownWidth;
		}

		return data;
	}

	private static getRightBottom(
		buttonRect: DOMRect,
		dropdownWidth: number,
		dropdownHeight: number
	) {
		let data = { left: 0, top: 0 };
		data.left = buttonRect.right - 155;
		data.top = buttonRect.bottom;
		if (buttonRect.bottom + dropdownHeight > window.innerHeight) {
			data.top = buttonRect.bottom - dropdownHeight;
		}
		return data;
	}

	private static getAutoPosition(
		buttonRect: DOMRect,
		dropdownWidth: number,
		dropdownHeight: number
	) {
		let data = { left: 0, top: 0 };
		if (buttonRect.x + 400 > window.innerWidth) {
			data.left = buttonRect.right - 155;
			data.top = buttonRect.bottom;
		} else {
			data.left = buttonRect.x;
			data.top = buttonRect.bottom;
		}
		return data;
	}

	private static getNone(buttonRect: DOMRect, dropdownWidth: number, dropdownHeight: number) {
		let data = { left: 0, top: 0 };
		data.left = -120;
		data.top = 40;
		return data;
	}
}
