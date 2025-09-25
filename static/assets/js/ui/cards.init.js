/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: cards init Js File
*/

import user18 from '../../images/avatar/user-18.png';

function profileCard() {
  return {
    username: 'frankie_mixon',
    fullName: 'Frankie N. Mixon',
    bgColors: ['bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-primary-800', 'bg-primary-500'],
    bgColor: 'bg-dark-800',
    showSettings: false,
    photoUrl: user18,
    editing: '',
    saveEdit(name) {
      this[name] = this.$refs[name + 'input'].value;
      this.editing = '';
    },
    edit(name) {
      this.editing = name;
      this.$nextTick(() => {
        this.$refs[name + 'input'].focus();
      });
    },
    discard(name) {
      this.$refs[name + 'input'].value = this[name];
      this.editing = '';
    },
    selectColor(color) {
      this.bgColor = color;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('profileCard', profileCard);
});
