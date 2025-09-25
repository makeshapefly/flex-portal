/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: deal init Js File
*/

import dealsData from '../../../json/apps/crm/deals-list';
function dealsTable() {
  return {
    deals: [],
    sortBy: '',
    sortDirection: 'asc',
    sortClasses: {
      asc: '↑',
      desc: '↓'
    },
    selectAll: false,
    selectedItems: [],
    filterDeals: [],
    selectedDeal: {},
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 8,
    currentChat: {
      projectName: '',
      image: '',
      userImage: '',
      status: '',
      messages: []
    },
    newMessage: '',
    reviewDeal(project) {
      this.selectedDeal = this.deals.find((deal) => deal.projectName === project);
    },
    toggleAll() {
      this.selectedItems = this.selectAll ? [...this.filterDeals] : [];
    },
    get totalPages() {
      return Math.ceil(this.filterDeals.length / this.itemsPerPage);
    },
    get displayedDeals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      drawerSetting();
      return this.filterDeals.slice(start, end);
    },
    deleteDeals(selectedDeal) {
      this.filterDeals = this.filterDeals.filter((deal) => deal !== selectedDeal);
    },
    filteredDeals() {
      this.filterDeals = this.deals;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      if (searchTerm) {
        this.filterDeals = this.filterDeals.filter((deal) => {
          return Object.values(deal).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          );
        });
      }
    },
    get showingStart() {
      return Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.filterDeals.length);
    },
    get showingEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filterDeals.length);
    },
    get totalEvents() {
      return this.filterDeals.length;
    },
    init() {
      this.deals = dealsData.map((deal) => ({
        ...deal,
        daysLeft: this.calculateDaysLeft(deal.endDate)
      }));
      this.filteredDeals();
    },
    sort(column) {
      if (column === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDirection = 'asc';
        this.sortBy = column;
      }

      this.deals.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        this.open = false;
        return this.sortDirection === 'desc' ? comparison * -1 : comparison;
      });
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    },
    calculateDaysLeft(endDate) {
      const today = new Date();
      const end = new Date(endDate);
      const timeDiff = end - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysLeft > 0 ? daysLeft : 'Expired';
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
    deleteEvent(index) {
      this.selectedItems.forEach((item) => {
        const index = this.deals.indexOf(item);
        if (index !== -1) {
          this.deals.splice(index, 1);
        }
      });

      this.selectedItems = [];
      this.selectAll = false;
      this.deals.splice(index, 1);
      this.$refs.dropdown.classList.toggle('open');
    },

    openChat(deal) {
      this.currentChat.projectName = deal.projectName;
      this.currentChat.image = deal.image;
      this.currentChat.userImage = deal.userImage;
      this.currentChat.status = deal.status;
      this.currentChat.messages = deal.messages || [];
      this.showChat = true;
    },
    closeChat() {
      this.showChat = false;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.currentChat.messages.push({ id: Date.now(), text: this.newMessage, sender: 'user' });
        this.newMessage = '';
      }
    }
  };
}
function callModal() {
  return {
    isMuted: false,
    isCalling: false,
    callDuration: 0,
    intervalId: null,
    timeoutId: null,
    callModalOpen: false,
    toggleMute() {
      this.isMuted = !this.isMuted;
    },

    startCall() {
      this.resetCall();
      this.isCalling = true;
      this.timeoutId = setTimeout(() => {
        if (this.isCalling) {
          this.isCalling = false;
          this.startTimer();
        }
      }, 4000);
    },

    startTimer() {
      this.intervalId = setInterval(() => {
        this.callDuration++;
      }, 1000);
    },

    stopCall() {
      this.callModalOpen = false;
      this.stopTimer();
      clearTimeout(this.timeoutId);
      this.callDuration = 0;
      this.resetCall();
    },

    resetCall() {
      this.callDuration = 0;
    },

    stopTimer() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },

    // Ensure cleanup on modal close or component destruction
    beforeDestroy() {
      this.stopCall();
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('dealsTable', dealsTable);
  Alpine.data('callModal', callModal);
});
