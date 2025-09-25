/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: account security init Js File
*/

class OTPForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.inputs = [...this.form.querySelectorAll('input[type=text]')];
    this.submitButton = this.form.querySelector('button[type=submit]');

    this.setupListeners();
  }

  handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const index = this.inputs.indexOf(e.target);
      if (index > 0) {
        this.inputs[index - 1].value = '';
        this.inputs[index - 1].focus();
      }
    }
  };

  handleInput = (e) => {
    const { target } = e;
    const index = this.inputs.indexOf(target);
    if (target.value) {
      if (index < this.inputs.length - 1) {
        this.inputs[index + 1].focus();
      } else {
        this.submitButton.focus();
      }
    }
  };

  handleFocus = (e) => {
    e.target.select();
  };

  handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (!new RegExp(`^[0-9]{${this.inputs.length}}$`).test(text)) {
      return;
    }
    const digits = text.split('');
    this.inputs.forEach((input, index) => (input.value = digits[index]));
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

// Create instances of the OTPForm class for each form
const otpForm1 = new OTPForm('otp-form1');
const otpForm2 = new OTPForm('otp-form2');
