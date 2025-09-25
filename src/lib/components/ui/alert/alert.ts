import { writable, type Writable } from 'svelte/store';

/**
 * Icons names for alert variants.
 * We olny supprts the "lucide-svelte" icons.
 * These icon name will be used in component LucideIcon @src/lib/component/common/LucideIcon.svelte.
 *  */
export const iconsNames = {
	info: 'BadgeInfo',
	success: 'SquareCheck',
	warning: 'MessageSquareWarning',
	error: 'BadgeX'
};

export const alertPositions: Record<UI.AlertPosition, string> = {
	'top-right': 'fixed z-toast top-5 right-5',
	'top-left': 'fixed z-toast top-5 left-5',
	'bottom-right': 'fixed z-toast bottom-5 right-5',
	'bottom-left': 'fixed z-toast bottom-5 left-5',
	'top-center': 'fixed z-toast -translate-x-1/2 top-5 left-1/2',
	'bottom-center': 'fixed z-toast bottom-5 left-1/2 transform -translate-x-1/2'
};

export default class AlertState implements UI.IAlertState {
	isOpen: Writable<boolean>;
	closing: UI.AlertClosing;

	constructor(isOpen: boolean, closing: UI.AlertClosing) {
		this.isOpen = writable(isOpen);
		this.closing = closing;

		// Bind methods to ensure 'this' refers to the class instance
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	open() {
		this.isOpen.set(true);
		if (this.closing !== 'manual') {
			setTimeout(() => this.isOpen.set(false), this.closing === 'auto' ? 5000 : this.closing);
		}
	}
	close() {
		this.isOpen.set(false);
	}
}
