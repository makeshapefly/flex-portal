import { writable, type Writable } from 'svelte/store';
import { accordionColors } from './accordion-css';
export default class AccordionState implements UI.IAccordionState {
  // Accordion State
  selected: Writable<number>;
  isChevron: boolean;
  varient: UI.AccordionVarient;
  color: string;

  // Accordion Constructor
  constructor(
    selected: number,
    isChevron: boolean,
    color: UI.Colors,
    varient: UI.AccordionVarient
  ) {
    this.selected = writable(selected);
    this.isChevron = isChevron;
    this.color = accordionColors[`${varient}-${color}`];
    this.changeSelected = this.changeSelected.bind(this);
    this.varient = varient;
  }

  // Accordion Methods
  changeSelected(index: number) {
    this.selected.update((prev) => (prev === index ? -1 : index));
  }
}
