/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: recaptcha init Js File
*/

function formHandler() {
  return {
    formData: {
      name: '',
      email: '',
      message: ''
    },
    submitted: false,
    submitForm(e) {
      e.preventDefault();
      const recaptchaResponse = grecaptcha.getResponse();

      if (recaptchaResponse.length === 0) {
        alert('Please complete the reCAPTCHA verification.');
        return false;
      } else {
        this.submitted = true;
        setTimeout(() => {
          this.$nextTick(() => {
            // Reset form fields
            this.formData.name = '';
            this.formData.email = '';
            this.formData.message = '';
            this.submitted = false;
            grecaptcha.reset();
          });
        }, 2000);
        return true;
      }
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('formHandler', formHandler);
});
