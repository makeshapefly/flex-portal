/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: book list init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import books from '../../../../json/apps/school/library/books-list';

//Sort By select
VirtualSelect.init({
  ele: '#sortBySelect',
  options: [
    { label: 'All', value: 'All' },
    { label: 'Newest', value: 'Newest' },
    { label: 'Oldest', value: 'Oldest' },
    { label: 'Popular Book', value: 'Popular Book' },
    { label: 'Best Sales', value: 'Best Sales' }
  ]
});

function bookTable() {
  return {
    books: [],
    filterBooks: [],
    searchTerm: '',
    inViewBook: {
      title: '',
      author: '',
      image: '',
      rating: '',
      reviewCount: '',
      price: '',
      type: ''
    },
    imageUrl: '',
    addBookModal: false,
    bookForm: {
      title: '',
      author: '',
      image: '',
      rating: '',
      reviewCount: '',
      price: '',
      type: ''
    },
    errors: {},
    handleModalOpen() {
      this.resetData();
      this.addBookModal = true;
    },
    resetData() {
      this.bookForm = {
        title: '',
        author: '',
        image: '',
        rating: '',
        reviewCount: '',
        price: '',
        type: ''
      };
      this.errors = {};
    },
    validateForm() {
      this.errors = {};
      this.validateField('image', this.bookForm.image, 'Image  is required.');
      this.validateField('title', this.bookForm.title, 'Title name is required.');
      this.validateField('author', this.bookForm.author, 'Author is required.');
      this.validateField('price', this.bookForm.price, 'Price is required.');

      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },
    AddBook() {
      if (this.validateForm()) {
        this.books.unshift({ ...this.bookForm, rating: 0, reviewCount: 0, type: 'Newest' });
        document.body.classList.toggle('overflow-hidden', false);
        this.addBookModal = false;
        this.filteredBooks();
      }
    },
    init() {
      this.books = books;
      this.filteredBooks();
    },
    filteredBooks() {
      this.filterBooks = this.books;
      const searchTerm = this.searchTerm.toLowerCase();
      if (searchTerm) {
        this.filterBooks = this.filterBooks.filter((book) => {
          return Object.values(book).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      const sortBy = document.querySelector('#sortBySelect').value;
      if (sortBy !== 'All' && sortBy != '') {
        this.filterBooks = this.filterBooks.filter((book) => {
          return book.type === sortBy;
        });
      }
      drawerSetting();
    },
    fullStars(rating) {
      return Math.floor(rating);
    },
    halfStars(rating) {
      return rating % 1 !== 0;
    },
    emptyStars(rating) {
      return 5 - Math.ceil(rating);
    },
    fileChosen(event) {
      this.fileToDataUrl(event, (src) => {
        this.imageUrl = src;
        this.bookForm.image = src; // Update parents form image
        this.validateField('image', this.bookForm.image, 'Image is required.');
      });
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
  Alpine.data('bookTable', bookTable);
});
