/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: manage reviews init Js File
*/
import reviewsData from '../../../json/apps/ecommerce/manage-reviews';
function reviewTable() {
  return {
    reviews: [],
    filterReviews: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    currentPage: 1,
    itemsPerPage: 10,
    errors: {},
    deleteItem: '',
    searchTerm: '',
    rating: 0,
    hovering: 0,
    filterReview() {
      this.filterReviews = this.reviews;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterReviews = this.filterReviews.filter((customer) => {
          return Object.values(customer).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    get totalPages() {
      return Math.ceil(this.filterReviews.length / this.itemsPerPage);
    },
    get displayedReviews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterReviews.slice(start, end);
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterReviews.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterReviews.length);
    },
    get averageReview() {
      if (this.filterReviews.length === 0) return 0;
      const total = this.filterReviews.reduce((sum, product) => sum + parseFloat(product.star), 0);
      return (total / this.filterReviews.length).toFixed(1);
    },
    init() {
      let startID = 24151; // Starting ID
      reviewsData.forEach((product, index) => {
        product.customersID = 'PEC-' + (startID + index).toString();
      });
      this.reviews = reviewsData;
      this.filterReviews = reviewsData;
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }
      this.reviews.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    get totalReviews() {
      return this.reviews && this.reviews.length ? this.reviews.length : 0;
    },

    get reviewPercentage() {
      // Calculate the percentage based on the total number of reviews
      const totalReviews = this.totalReviews;
      const totalPercentage = totalReviews ? (totalReviews / this.reviews.length) * 100 : 0;
      return totalPercentage.toFixed(0);
    },
    getStarClass(averageReview, index) {
      const roundedAverage = averageReview; // Round average to nearest half-star
      if (index <= roundedAverage) {
        return 'ri-star-fill';
      } else if (index - 1 < roundedAverage && roundedAverage % 1 !== 0) {
        return 'ri-star-half-fill';
      }
      return 'ri-star-line';
    },
    deleteProduct() {
      this.filterReviews.forEach((review, index) => {
        if (review.userName == this.deleteItem) {
          this.filterReviews.splice(index, 1);
        }
      });
    },
    showAddReviewForm: false,
    showEditReviewForm: false,
    reviewForm: {
      customersID: '',
      images: '',
      userName: '',
      date: '',
      star: '',
      location: '',
      title: '',
      content: ''
    },

    addReview() {
      this.reviews.unshift({ ...this.reviewForm, image: 'assets/images/avatar/user-1.png' });
      this.resetForm();
    },
    editReview(index) {
      this.handleModal('showEditReviewForm');
      this.reviewForm = { ...this.reviews.find((product) => product.userName === index) };
      this.rating = this.reviewForm.star;
    },
    updateReview() {
      const index = this.reviews.findIndex(
        (product) => product.customersID === this.reviewForm.customersID
      );
      this.reviews[index] = { ...this.reviewForm };
      this.resetForm();
    },
    resetForm() {
      this.errors = {};
      this.rating = 0;
      this.hovering = 0;
      this.reviewForm = {
        userName: '',
        date: '',
        star: '',
        location: '',
        title: '',
        content: ''
      };
    },
    validateForm() {
      this.errors = {};
      this.validateField('userName', this.reviewForm.userName, 'User name is required.');
      this.validateField('date', this.reviewForm.date, 'Date is required.');
      this.validateField('title', this.reviewForm.title, 'Title is required.');
      this.validateField('star', this.reviewForm.star, 'Star is required.');
      this.validateField('location', this.reviewForm.location, 'Location is required.');
      this.validateField('content', this.reviewForm.content, 'Content is required.');
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) {
        this.errors[fieldName] = errorMessage;
      } else {
        delete this.errors[fieldName];
      }
    },

    handleModal(modal) {
      if (modal === 'showAddReviewForm') {
        this.showAddReviewForm = true;
        this.showEditReviewForm = false;
        this.resetForm();
      } else {
        this.showEditReviewForm = true;
        this.showAddReviewForm = false;
        this.resetForm();
      }
    },

    submitForm() {
      if (this.validateForm()) {
        if (this.showAddReviewForm) {
          this.errors = {};
          this.addReview();
        } else {
          this.updateReview();
        }
        document.body.classList.toggle('overflow-hidden', false);
        this.resetForm();
        this.errors = {};
        this.showEditReviewForm = false;
        this.showAddReviewForm = false;
      }
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('reviewTable', reviewTable);
});
