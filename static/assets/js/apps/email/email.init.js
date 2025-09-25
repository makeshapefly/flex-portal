/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Email init Js File
*/

import { emailData, userMailsData } from '../../../json/apps/email/email';
import user11 from '../../../images/avatar/user-11.png';
import brand4 from '../../../images/brands/img-04.png';

function emailApp() {
  return {
    emails: [],
    filteredEmails: [],
    attachments: true,
    showMailModal: false,
    showComposeModal: false,
    openMails: {},
    sendAvatar: user11,
    activeName: 'Armand Noto',
    showSuggestion: false,
    searchTerms: '',
    deleteEmail: '',
    selectAll: false,
    selectedItems: [],
    activeEmail: {},
    activeEmailId: 1,
    isMenuOpen: true,
    showMailList: true,
    windowWidth: window.innerWidth,
    formatDate(date) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format, handling midnight as 12

      return `${day} ${month}, ${formattedHours}:${minutes}${period}`;
    },
    emailForm: {
      sender: '',
      email: '',
      date: '',
      subject: '',
      message: '',
      avatarText: '',
      avatarColor: 'blue',
      badges: ['sent'],
      type: 'sent'
    },
    openComposeMail() {
      this.emailForm = {
        sender: '',
        email: '',
        date: '',
        subject: '',
        message: '',
        avatarText: '',
        avatarColor: 'blue',
        badges: ['sent'],
        type: 'sent'
      };
      this.showComposeModal = true;
    },
    sendNewMail() {
      if (
        this.emailForm.email &&
        this.emailForm.message &&
        this.validateEmail(this.emailForm.email)
      ) {
        this.filteredEmails.unshift({
          ...this.emailForm,
          id: this.filteredEmails.length + 1,
          date: this.formatDate(new Date()),
          avatarText: this.emailForm.email.charAt(0),
          sender: this.emailForm.email.split('@')[0],
          replies: []
        });
        this.showComposeModal = false;
      }
      document.body.classList.toggle('overflow-hidden', false);
    },
    activeUserEmail: {
      image: brand4,
      name: 'Srbthemes Account',
      email: 'shopia@srbthemes.com'
    },
    userEmail: [],
    async fetchEmails() {
      this.emails = emailData;
      // this.openMails = data.openMails;
      this.userEmail = userMailsData;
      this.filteredEmails = this.emails; // Initially display all emails
    },
    toggleAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedItems = [...this.filteredEmails];
        this.showMailModal = false;
      } else {
        this.selectedItems = [];
      }
    },
    deleteMailItems() {
      if (this.filteredEmails.length > 0) {
        this.filteredEmails = this.filteredEmails.filter((email) => email !== this.deleteEmail);
        this.showMailModal = this.filteredEmails.length === 0 ? false : this.showMailModal;
        if (this.filteredEmails.length > 0) {
          this.setActiveMail(this.filteredEmails[0]);
        }
      } else {
        this.showMailModal = false;
      }
    },

    setActiveUserEmail(emailData) {
      this.activeUserEmail = emailData;
    },
    prevButton() {
      if (this.activeEmailId > 1) {
        this.activeEmailId--;
      }
      this.setActiveMail(this.filteredEmails[this.activeEmailId - 1]);
    },
    nextButton() {
      if (this.activeEmailId < this.filteredEmails.length) {
        this.setActiveMail(this.filteredEmails[this.activeEmailId]);
      }
    },

    setActiveMail(mail) {
      if (this.filteredEmails.length !== 0) {
        this.showMailModal = true;
        if (this.windowWidth < 1600) {
          this.showMailList = false;
        }
        const mailIndex = this.filteredEmails.indexOf(mail);
        // Ensure mailIndex is valid
        if (mailIndex !== -1) {
          this.activeEmailId = mailIndex + 1;
        } else {
          this.activeEmailId = null;
        }
        if (this.openMails.length > 0) {
          this.openMails.splice(0, 1);
          this.openMails = mail;
        } else {
          this.openMails = mail;
        }
        this.activeEmail = mail;
        this.mailform.email = mail.email;
        this.sendAvatar = mail.avatarImage;
        this.activeName = mail.sender;
      }
    },
    mailform: {
      message: '',
      subject: '',
      email: '',
      name: '',
      avatarImage: this.sendAvatar
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = re.test(email);
      return isValid;
    },
    BackToList() {
      this.showMailList = true;
      this.showMailModal = false;
    },
    sendEmailReply() {
      if (this.validateEmail(this.mailform.email)) {
        this.openMails = this.activeEmail;

        const newMail = {
          id: this.openMails.length + 1,
          sender: this.activeName,
          avatarImage: this.sendAvatar,
          email: this.mailform.email,
          subject: this.mailform.subject,
          message: [this.mailform.message],
          avatarText: this.mailform.email.charAt(0)
        };

        this.openMails.replies.push(newMail);
        // Clear form or handle success
        this.mailform = {
          message: '',
          subject: '',
          email: '',
          name: this.activeName,
          avatarImage: this.sendAvatar
        };
      }
    },
    toggleItem(email) {
      if (this.selectedItems.includes(email)) {
        this.selectedItems = this.selectedItems.filter((item) => item !== email);
      } else {
        this.selectedItems.push(email);
      }
      this.selectAll = this.selectedItems.length === this.filteredEmails.length;
      this.showMailModal = false;
    },
    deleteSelectedItems() {
      this.selectedItems.forEach((item) => {
        this.filteredEmails = this.filteredEmails.filter((email) => email.id !== item.id);
      });
      this.selectedItems = [];
      this.selectAll = false;
      this.setActiveMail(this.filteredEmails[0]);
    },
    filterEmails(type = 'all', badge = null) {
      if (type === 'all') {
        this.filteredEmails = this.emails;
      } else {
        this.filteredEmails = this.emails.filter((email) => email.type === type);
      }

      if (badge) {
        this.filteredEmails = this.filteredEmails.filter((email) => email.badges.includes(badge));
      }
    },
    init() {
      this.fetchEmails();
      if (this.windowWidth < 1600) {
        this.isMenuOpen = false;
      }
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
      this.$watch('windowWidth', (newVal) => {
        if (newVal < 1600) {
          this.isMenuOpen = false;
          this.showMailModal = false;
        } else {
          this.isMenuOpen = true;
          // this.setActiveChat(0);
        }
      });
    }
  };
}

document.addEventListener('alpine:init', function () {
  Alpine.data('emailApp', emailApp);
});
