/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: list-view init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';

window.intCodesComponent = function () {
  return {
    intCodes: [],
    selectedDialCode: '',
    selectedFormat: '',
    maskInstance: null,

    initialize() {
      fetch('assets/json/country-code.js')
        .then((response) => response.json())
        .then((data) => {
          this.intCodes = data;
          if (this.intCodes.length > 0) {
            this.selectedDialCode = this.intCodes[0].dial_code;
            this.selectedFormat = this.intCodes[0].format;
            this.applyMask();
          }
        })
        .catch((error) => {
          console.error('Error loading country codes:', error);
          // Handle error here, e.g., show a message to the user
        });
    },
    onSelectChangeHandler() {
      const selectedCountry = this.intCodes.find(
        (country) => country.dial_code === this.selectedDialCode
      );
      if (selectedCountry) {
        this.selectedFormat = selectedCountry.format;
        this.applyMask();
      }
    },
    applyMask() {
      if (this.maskInstance) {
        this.maskInstance.destroy();
      }
      if (this.$refs.phoneInput) {
        this.maskInstance = IMask(this.$refs.phoneInput, {
          mask: this.selectedFormat.replace(/0/g, '0').replace(/9/g, '0').replace(/A/g, 'A*') // Allow multiple alphabetic characters
        });
      }
    }
  };
};

function submit() {
  return {
    onSubmit(e) {
      e.preventDefault();
      const form = e.target.closest('form');
      form.checkValidity() ? form.reset() : form.reportValidity();
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('submit', submit);
});

//Gender select
VirtualSelect.init({
  ele: '#genderSelect',
  options: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' }
  ]
});
