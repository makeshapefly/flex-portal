/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: form file input init Js File
*/

function previewImage() {
  return {
    imageUrl: '',
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => (this.imageUrl = src));
    },
    fileToDataUrl(event, callback) {
      if (!event.target.files.length) return;
      let file = event.target.files[0],
        reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => callback(e.target.result);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('previewImage', previewImage);
});
