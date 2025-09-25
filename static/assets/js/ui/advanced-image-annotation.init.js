/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Images Annotation init Js File
*/
function annotation() {
  return {
    newComment: '',
    notes: [
      {
        id: Date.now(),
        visible: true,
        comments: [{ text: 'Beautiful Fabulous!' }, { text: 'Nice Awesome Photo!' }]
      }
    ],
    image: {
      ['@click'](event) {
        const img = event.target.getBoundingClientRect();
        this.addNote(event.pageX - img.left, event.pageY - img.top);
      }
    },
    addNote(x, y) {
      const hasVisibleNote = this.notes.find((n) => n.visible === true);
      this.toggleNote();
      if (hasVisibleNote) return;
      this.notes.push({
        id: Date.now(),
        x,
        y,
        visible: true,
        comments: []
      });
    },
    addComment(note) {
      if (!this.newComment.trim()) return;
      this.notes = this.notes
        .filter((n) => n.id !== note.id)
        .concat({
          ...note,
          comments: note.comments.concat({ text: this.newComment })
        });
      this.newComment = '';
    },
    toggleNote(note) {
      this.notes = this.notes.map((n) => ({
        ...n,
        visible: note && n.id === note.id ? true : false
      }));
    },
    markerStyle(note) {
      return `top:${note.y - 13}px;left:${note.x - 13}px;`;
    },
    toggleAnnotations() {
      // Toggle visibility of all annotations
      this.notes = this.notes.map((note) => ({ ...note, visible: true }));
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('annotation', annotation);
});
