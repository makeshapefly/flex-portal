/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: SignIn basic init Js File
*/

function formHandler() {
  return {
    formData: {
      emailOrUsername: 'admin@srbthemes.com',
      password: 'admin@123'
    },
    allowedCredentials: {
      email: 'admin@srbthemes.com',
      password: 'admin@123'
    },
    alert: {
      isVisible: false,
      message: '',
      type: 'bg-red-100 text-red-500'
    },
    validateForm() {
      this.alert.isVisible = false;
      this.alert.message = '';

      if (
        this.formData.emailOrUsername !== this.allowedCredentials.email ||
        this.formData.password !== this.allowedCredentials.password
      ) {
        this.showAlert('Invalid email or password', 'bg-red-100 text-red-500');
        return;
      }

      // If all validations pass
      this.showAlert(`You've successfully signed in to Domiex!`, 'bg-green-100 text-green-500');

      // Redirect to index.html after a short delay to allow the user to see the success message
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000); // Adjust the delay as needed
    },
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.isVisible = true;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('formHandler', formHandler);
});
