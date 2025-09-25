import { writable, type Writable } from 'svelte/store';

export class DrawerState implements UI.IDrawerState {
	isOpen: Writable<boolean>;
	buttonElement: HTMLElement | null = null; // To store the button reference
	drawerElement: HTMLElement | null = null; // To store the modal reference
	backdropElement: HTMLElement | null = null; // To store the backdrop reference

	constructor(isOpen: boolean) {
		this.isOpen = writable(isOpen);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	open() {
		this.isOpen.set(true);
	}

	close() {
		this.isOpen.set(false);
	}

	toggle() {
		this.isOpen.update((prev) => !prev);
	}
}
