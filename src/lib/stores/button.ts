import { writable, type Writable } from 'svelte/store';

// Implement the interface in the ButtonState class
export default class ButtonState implements UI.IButtonState {
    isLoading: Writable<boolean>;
    isActive: Writable<boolean>;

    constructor(isActive: boolean = false) {
        this.isLoading = writable(false);
        this.isActive = writable(isActive);

        // Bind methods to ensure 'this' context is correctly preserved
        this.startLoading = this.startLoading.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    startLoading() {
        this.isLoading.set(true);
        setTimeout(() => {
            this.isLoading.set(false);
            this.toggle();
        }, 2000);
    }

    toggle() {
        this.isActive.update(current => !current);
    }
}
