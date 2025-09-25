import { writable, type Writable } from 'svelte/store';

export class ModalState implements UI.IModalState {
  isOpen: Writable<boolean>;
  buttonElement: HTMLElement | null = null; // To store the button reference
  modalElement: HTMLElement | null = null; // To store the modal reference
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
export const modals = writable<{ [id in string]: boolean }>({});

export function openModal(id: string) {
  modals.update((state) => ({ ...state, [id]: true }));
}

export function closeModal(id?: string) {
  if (id) {
    modals.update((state) => ({ ...state, [id]: false }));
    return;
  }
  // Close all modals
  modals.update((state) => Object.keys(state).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
}

export function toggleModal(id: string) {
  modals.update((state) => ({ ...state, [id]: !state[id] }));
}
