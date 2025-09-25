/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: admission init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import { Phone } from 'lucide';

//Status Select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Unpaid', value: 'Unpaid' }
  ]
});

//Gender Select
VirtualSelect.init({
  ele: '#genderSelect',
  options: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' }
  ]
});

function formData() {
  return {
    openTab: 1,
    activeClasses: 'bg-primary-500 text-primary-50',
    inactiveClasses: 'text-gray-500 hover:text-primary-500',
    passportImageUrl: '',
    transcriptImageUrl: '',
    passportError: '',
    transcriptError: '',
    personalForm: {
      firstName: '',
      middleName: '',
      lastName: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      Phone: '',
      email: '',
      nationality: '',
      address: '',
      city: '',
      country: '',
      pinCode: ''
    },
    guardianForm: {
      fatherName: '',
      motherName: '',
      otherRelative: '',
      mobile: ''
    },
    educationalForm: {
      schoolName: '',
      year: '',
      schoolGPA: '',
      focus: '',
      instituteName: '',
      instituteGPA: '',
      instituteYear: '',
      major: '',
      awards: '',
      activity: '',
      role: '',
      research: ''
    },
    personalFormErrors: {
      firstName: '',
      middleName: '',
      lastName: '',
      age: '',
      gender: '',
      dateOfBirth: '',
      Phone: '',
      email: '',
      nationality: '',
      address: '',
      city: '',
      country: '',
      pinCode: ''
    },
    guardianFormErrors: {
      fatherName: '',
      motherName: '',
      otherRelative: '',
      mobile: ''
    },
    educationalFormErrors: {
      schoolName: '',
      year: '',
      schoolGPA: '',
      focus: '',
      instituteName: '',
      instituteGPA: '',
      instituteYear: '',
      major: '',
      awards: '',
      activity: '',
      role: '',
      research: ''
    },
    validateField(form, field) {
      if (form === 'personalForm') {
        this.personalFormErrors[field] = this.personalForm[field]
          ? ''
          : `${field.replace(/([A-Z])/g, ' $1')} is required`;
      } else if (form === 'guardianForm') {
        this.guardianFormErrors[field] = this.guardianForm[field]
          ? ''
          : `${field.replace(/([A-Z])/g, ' $1')} is required`;
      } else if (form === 'educationalForm') {
        this.educationalFormErrors[field] = this.educationalForm[field]
          ? ''
          : `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    },
    validatePersonalDetails() {
      for (let field in this.personalFormErrors) {
        this.validateField('personalForm', field);
      }
      return !Object.values(this.personalFormErrors).some((error) => error !== '');
    },
    validateGuardianDetails() {
      for (let field in this.guardianFormErrors) {
        this.validateField('guardianForm', field);
      }
      return !Object.values(this.guardianFormErrors).some((error) => error !== '');
    },
    validateEducationalBackground() {
      for (let field in this.educationalFormErrors) {
        this.validateField('educationalForm', field);
      }
      return !Object.values(this.educationalFormErrors).some((error) => error !== '');
    },

    handleFileChosen(type, event) {
      const file = event.target.files[0];
      if (file) {
        const fileType = file.type;
        const allowedTypes =
          type === 'passportPhoto' ? ['image/png', 'image/jpeg'] : ['application/pdf', 'image/png'];
        if (allowedTypes.includes(fileType)) {
          const imageUrl = URL.createObjectURL(file);
          if (type === 'passportPhoto') {
            this.passportImageUrl = imageUrl;
            this.passportError = '';
          } else {
            this.transcriptImageUrl = imageUrl;
            this.transcriptError = '';
          }
        } else {
          if (type === 'passportPhoto') {
            this.passportError = 'Invalid file type. Only png or jpeg files are allowed.';
            this.passportImageUrl = '';
          } else {
            this.transcriptError = 'Invalid file type. Only pdf or png files are allowed.';
            this.transcriptImageUrl = '';
          }
        }
      } else {
        if (type === 'passportPhoto') {
          this.passportError = 'No file selected.';
        } else {
          this.transcriptError = 'No file selected.';
        }
      }
    },
    validateAndSave() {
      this.passportError = this.passportImageUrl ? '' : 'Passport-sized Photograph is required.';
      this.transcriptError = this.transcriptImageUrl ? '' : 'High School Transcript is required.';

      if (!this.passportError && !this.transcriptError) this.openTab = 5; // or any other logic to proceed
    },
    submitAdmissionForm() {
      const isValidPersonal = this.validatePersonalDetails();
      const isValidGuardian = this.validateGuardianDetails();
      const isValidEducational = this.validateEducationalBackground();

      if (isValidPersonal && isValidGuardian && isValidEducational) {
        this.resetForms();
        this.openTab = 1;
      } else console.log('Form validation failed.');
    },
    resetForms() {
      // Reset personal details form
      this.$refs.personalDetailsForm.reset();
      // Reset guardian details form
      this.$refs.guardianDetailsForm.reset();
      // Reset educational background form
      this.$refs.educationalBackgroundForm.reset();
      // Clear file inputs
      this.passportImageUrl = '';
      this.transcriptImageUrl = '';
      this.passportError = '';
      this.transcriptError = '';
      // Additional reset logic if needed
    }
  };
}

function previewImage(inputId) {
  return {
    imageUrl: '',
    passportError: '',
    transcriptError: '',
    fileChosen(event) {
      const file = event.target.files[0];
      if (file) {
        const fileType = file.type;
        const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
        if (allowedTypes.includes(fileType)) {
          this.imageUrl = URL.createObjectURL(file);
          this.passportError = '';
          this.transcriptError = '';
        } else {
          this.passportError = 'Invalid file type. Only pdf, png, or jpeg files are allowed.';
          this.imageUrl = '';
        }
      } else this.passportError = 'No file selected.';
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('previewImage', previewImage);
  Alpine.data('formData', formData);
});
