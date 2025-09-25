/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: question init Js File
*/

import '../../../../../../node_modules/virtual-select-plugin/dist/virtual-select';
import questionsData from '../../../../json/apps/school/exam/question';

//Sort By select
VirtualSelect.init({
  ele: '#sortBySelect',
  options: [
    { label: 'All', value: 'All' },
    { label: 'MCQ', value: 'MCQ' },
    { label: 'Q & A', value: 'Q & A' },
    { label: 'Hard', value: 'Hard' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Medium', value: 'Medium' }
  ]
});

//Item Type select
VirtualSelect.init({
  ele: '#itemTypeSelect',
  options: [
    { label: 'MCQ', value: 'MCQ' },
    { label: 'Q & A', value: 'Q & A' }
  ]
});

//Difficult Level select
VirtualSelect.init({
  ele: '#difficultLevelSelect',
  options: [
    { label: 'Normal', value: 'Normal' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ]
});

//Status select
VirtualSelect.init({
  ele: '#statusSelect',
  options: [
    { label: 'New', value: 'New' },
    { label: 'Old', value: 'Old' }
  ]
});

function questions() {
  return {
    examQuestions: [],
    filteredQuestions: [],
    searchTerm: '',
    reviewQuestion: {
      id: '',
      question: '',
      options: [],
      type: '',
      difficulty: '',
      status: ''
    },
    errors: {},
    showAddExamForm: false,
    showEditExamForm: false,
    form: {
      id: '',
      question: '',
      options: [],
      checkbox: false,
      type: '',
      difficulty: '',
      status: ''
    },
    selectAll: false,
    selectedItems: [],
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filteredQuestions];
      } else {
        this.selectedItems = [];
      }
    },
    toggleItem(product) {
      if (this.selectedItems.includes(product)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== product);
      } else {
        this.selectedItems.push(product);
      }
      this.selectAll = this.selectedItems.length === this.filteredQuestions.length;
    },
    deleteSelectedItems() {
      this.filteredQuestions = this.filteredQuestions.filter(
        (product) => !this.selectedItems.includes(product)
      );
      this.selectedItems = [];
      this.selectAll = false;
    },
    addExam() {
      this.form.id = this.examQuestions.length + 1;
      let types = document.querySelector('#itemTypeSelect').value;
      let difficulty = document.querySelector('#difficultLevelSelect').value;
      let status = document.querySelector('#statusSelect').value;

      this.filteredQuestions.unshift({
        ...this.form,
        type: types,
        difficulty: difficulty,
        status: status
      });
      this.showAddExamForm = false;
    },
    editExam(index) {
      this.handleModal('showEditExamForm');
      this.form = { ...this.filteredQuestions.find((product) => product.id === index) };

      let types = document.querySelector('#itemTypeSelect');
      let difficulty = document.querySelector('#difficultLevelSelect');
      let status = document.querySelector('#statusSelect');

      types.setValue(this.form.type);
      difficulty.setValue(this.form.difficulty);
      status.setValue(this.form.status);
    },
    updateExam() {
      const index = this.examQuestions.findIndex((product) => product.id === this.form.id);
      let types = document.querySelector('#itemTypeSelect').value;
      let difficulty = document.querySelector('#difficultLevelSelect').value;
      let status = document.querySelector('#statusSelect').value;
      this.filteredQuestions[index] = {
        ...this.form,
        type: types,
        difficulty: difficulty,
        status: status
      };
      types = '';
      difficulty = '';
      status = '';
      this.showEditExamForm = false;
      this.showAddExamForm = false;
    },
    validateForm() {
      this.errors = {};
      this.validateField('question', this.form.question, 'question is required.');
      this.validateField(
        'type',
        document.querySelector('#itemTypeSelect').value,
        'type is required.'
      );
      this.validateField(
        'difficulty',
        document.querySelector('#difficultLevelSelect').value,
        'difficulty is required.'
      );
      this.validateField(
        'status',
        document.querySelector('#statusSelect').value,
        'status is required.'
      );
      if (document.querySelector('#itemTypeSelect').value === 'MCQ') {
        this.validateField('option1', this.form.options[0], 'option1 is required.');
        this.validateField('option2', this.form.options[1], 'option2 is required.');
        this.validateField('option3', this.form.options[2], 'option3 is required.');
        this.validateField('option4', this.form.options[3], 'option4 is required.');
      }
      return Object.keys(this.errors).length === 0;
    },

    validateField(fieldName, fieldValue, errorMessage) {
      if (!fieldValue) this.errors[fieldName] = errorMessage;
      else delete this.errors[fieldName];
    },

    handleModal(modal) {
      if (modal === 'showAddExamForm') {
        this.showAddExamForm = true;
        this.showEditExamForm = false;
        this.resetForm();
      } else if (modal === 'showEditExamForm') {
        this.showEditExamForm = true;
        this.showAddExamForm = false;
        this.resetForm();
      } else {
        this.showEditExamForm = false;
        this.showAddExamForm = false;
      }
    },

    submitForm() {
      if (this.validateForm()) {
        drawerSetting();
        if (this.showAddExamForm) this.addExam();
        else this.updateExam();
        this.resetForm();
        document.body.classList.toggle('overflow-hidden', false);
        this.showEditExamForm = false;
        this.showAddExamForm = false;
      }
    },
    resetForm() {
      let types = document.querySelector('#itemTypeSelect');
      let difficulty = document.querySelector('#difficultLevelSelect');
      let status = document.querySelector('#statusSelect');
      this.errors = {};
      this.form = {
        id: '',
        question: '',
        options: [],
        type: types?.setValue(''),
        difficulty: difficulty?.setValue(''),
        status: status?.setValue('')
      };
    },

    init() {
      this.examQuestions = questionsData;
      setTimeout(() => {
        drawerSetting();
      }, 0);
      this.filterQuestions();
    },
    setReviewQuestion(question) {
      this.reviewQuestion = question;
    },
    DeleteQuestion() {
      this.filteredQuestions = this.filteredQuestions.filter(
        (question) => question.id !== this.reviewQuestion.id
      );
      this.reviewQuestion = {
        id: '',
        question: '',
        options: [],
        type: '',
        difficulty: '',
        status: ''
      };
    },
    filterQuestions() {
      this.filteredQuestions = this.examQuestions;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filteredQuestions = this.filteredQuestions.filter((question) => {
          return Object.values(question).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
      const sortby = document.querySelector('#sortBySelect').value;
      if (sortby !== 'All' && sortby !== '') {
        if (sortby === 'MCQ' || sortby === 'Q & A') {
          this.filteredQuestions = this.filteredQuestions.filter(
            (question) => question.type === sortby
          );
        } else if (sortby === 'Hard' || sortby === 'Normal' || sortby === 'Medium') {
          this.filteredQuestions = this.filteredQuestions.filter(
            (question) => question.difficulty === sortby
          );
        }
      }
      // drawerSetting();
    }
  };
}

document.addEventListener('alpine:init', () => {
  Alpine.data('questions', questions);
});
