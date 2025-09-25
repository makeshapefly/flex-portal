// verification.ts
export default class OTPForm {
    form: HTMLFormElement;
    inputs: HTMLInputElement[] = [];
    submitButton: HTMLButtonElement;
  
    constructor(formId: string) {
      this.form = document.getElementById(formId) as HTMLFormElement;
      this.inputs = Array.from(this.form.querySelectorAll('input[type=text]')) as HTMLInputElement[];
      this.submitButton = this.form.querySelector('button[type=submit]') as HTMLButtonElement;
      this.setupListeners();
    }
  
    handleKeyDown = (e: KeyboardEvent) => {
      if (
        !/^[0-9]{1}$/.test(e.key)
        && e.key !== 'Backspace'
        && e.key !== 'Delete'
        && e.key !== 'Tab'
        && !e.metaKey
      ) {
        e.preventDefault();
      }
  
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const index = this.inputs.indexOf(e.target as HTMLInputElement);
        if (index > 0) {
          this.inputs[index - 1].value = '';
          this.inputs[index - 1].focus();
        }
      }
    };
  
    handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const index = this.inputs.indexOf(target);
      if (target.value) {
        if (index < this.inputs.length - 1)
          this.inputs[index + 1].focus();
        else
          this.submitButton.focus();
      }
    };
  
    handleFocus = (e: FocusEvent) => {
      (e.target as HTMLInputElement).select();
    };
  
    handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData('text') || '';
      if (!new RegExp(`^[0-9]{${this.inputs.length}}$`).test(text)) return;
      const digits = text.split('');
      this.inputs.forEach((input, index) => input.value = digits[index]);
      this.submitButton.focus();
    };
  
    setupListeners() {
      this.inputs.forEach((input) => {
        input.addEventListener('input', this.handleInput);
        input.addEventListener('keydown', this.handleKeyDown);
        input.addEventListener('focus', this.handleFocus);
        input.addEventListener('paste', this.handlePaste);
      });
    }
  }
  