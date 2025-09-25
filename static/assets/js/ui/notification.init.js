/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: notification init Js File
*/

function noticesHandler() {
  return {
    notices: [],
    visible: [],
    add(notice) {
      notice.id = Date.now();
      this.notices.push(notice);
      this.fire(notice.id);
    },
    fire(id) {
      this.visible.push(this.notices.find((notice) => notice.id == id));
      const timeShown = 2000 * this.visible.length;
      setTimeout(() => {
        this.remove(id);
      }, timeShown);
    },
    remove(id) {
      const notice = this.visible.find((notice) => notice.id == id);
      const index = this.visible.indexOf(notice);
      this.visible.splice(index, 1);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('noticesHandler', noticesHandler);
});
