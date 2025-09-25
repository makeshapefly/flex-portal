/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: word counter init Js File
*/

function data() {
  return {
    search: "let's try this",
    wordCount: 0,
    charCount: 0,
    countWords() {
      this.wordCount = this.search.trim().split(' ').length;
    },
    countChars() {
      this.charCount = this.search.split(' ').join('').split('').length;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('data', data);
});
