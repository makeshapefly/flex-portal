import { writable } from 'svelte/store';

const showAlert = (message: string, type: string) => {
  alert.set({
    isVisible: true,
    message,
    type
  });
};
// Form data and alert state
let formData = {
  emailOrUsername: 'admin@srbthemes.com',
  password: 'admin@123'
};

const allowedCredentials = {
  email: 'admin@srbthemes.com',
  password: 'admin@123'
};

const alert = writable({
  isVisible: false,
  message: '',
  type: 'bg-red-100 text-red-500'
});

// Validation function
const validateForm = () => {
  alert.set({
    isVisible: false,
    message: '',
    type: 'bg-red-100 text-red-500'
  });

  if (
    formData.emailOrUsername !== allowedCredentials.email ||
    formData.password !== allowedCredentials.password
  ) {
    showAlert('Invalid email or password', 'bg-red-100 text-red-500');
    return;
  }

  // If all validations pass
  showAlert("You've successfully signed in to Domiex!", 'bg-green-100 text-green-500');

  setTimeout(() => {
    window.location.href = '/index';
  }, 1000);
};

export { validateForm, alert, allowedCredentials, formData };
