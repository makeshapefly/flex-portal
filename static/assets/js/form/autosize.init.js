/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: autosize init Js File
*/

function app() {
  return {
    charCount: 0,
    updateTextarea: function (el) {
      this.resizeTextarea(el);
      this.updateCharCount(el);
    },
    resizeTextarea: function (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 4 + 'px';
    },
    updateCharCount: function (el) {
      this.charCount = el.value.length;
    },
    resizeObserver: function (el, tx) {
      const self = this;
      const resizeObserver = new ResizeObserver(function () {
        self.resizeTextarea(tx);
      });
      resizeObserver.observe(el);
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('app', app);
});
