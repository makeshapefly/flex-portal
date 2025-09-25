/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: group chat init Js File
*/

import '../../../../../node_modules/virtual-select-plugin/dist/virtual-select.js';
import { groups, messages, members } from '../../../json/apps/chat/group.js';
import brand8 from '../../../images/brands/img-08.png';
import brand27 from '../../../images/brands/img-27.png';
import user17 from '../../../images/avatar/user-17.png';
function groupChatComponent() {
  return {
    members: [],
    searchQuery: '',
    groupList: [],
    groupMessages: [],
    showGroupAddModal: false,
    searchTerms: '',
    message: '',
    deleteIndex: '',
    showDeleteModal: false,
    avatar: brand8,
    groupName: 'Shopify Developers ',
    activeChatIndex: 0,
    groupForm: {
      name: '',
      image: brand27,
      message: 'New Group Created',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      badge: '',
      unread: true,
      active: true
    },
    windowWidth: window.innerWidth,
    init() {
      if (this.groupList.length == 0 && this.members.length == 0) {
        this.groupList = groups;
        this.groupMessages = messages;
        this.members = members;
        if (window.innerWidth >= 1440) {
          this.setActiveChat(0);
          this.scrollToBottom();
        }
      } else {
        this.groupList = this.filteredGroup;
        this.members = this.filteredMembers;
        this.setActiveChat(0);
      }
      if (this.windowWidth == 1440) {
        document.getElementById('chat-wrapper').classList.add('hidden');
      }
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
      this.$watch('windowWidth', (newVal) => {
        if (newVal < 1440) {
          document.getElementById('chat-wrapper').classList.add('hidden');
        } else {
          document.getElementById('chat-wrapper').classList.remove('hidden');
          document.getElementById('chat-list').classList.remove('hidden');
          this.setActiveChat(0);
        }
      });
    },

    get filteredMembers() {
      if (this.searchQuery === '') {
        return this.members;
      }
      return this.members.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    get filteredGroup() {
      if (this.searchTerms === '') {
        return this.groupList;
      }
      return this.groupList.filter((group) =>
        group.name.toLowerCase().includes(this.searchTerms.toLowerCase())
      );
    },
    get memberCount() {
      return this.members.length;
    },
    backToChatList() {
      document.getElementById('chat-list').classList.remove('hidden');
      document.getElementById('chat-wrapper').classList.add('hidden');
    },
    scrollToBottom() {
      setTimeout(function () {
        var chat = document.getElementById('groupchat-messages').lastElementChild;
        chat.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 200);
    },
    DeleteMessage() {
      const index = this.groupMessages.findIndex((message) => message.message === this.deleteIndex);
      this.groupMessages.splice(index, 1);
      this.showDeleteModal = false;
    },
    sendMessage(messageText) {
      if (messageText.trim() === '') return;
      const newMessage = {
        type: 'sent',
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        message: messageText,
        user: {
          avatar: user17
        }
      };
      this.groupMessages.push(newMessage);
      this.scrollToBottom();
      this.message = '';
    },
    addGroup() {
      this.groupList.unshift(this.groupForm);
      this.scrollToBottom();
      this.showGroupAddModal = false;
      this.resetForm();
      this.setActiveChat(this.activeChatIndex);
      document.body.classList.remove('overflow-hidden');
    },
    resetForm() {
      const contactsSelect = document.querySelector('#addMemberSelect');
      this.groupForm = {
        name: '',
        image: brand27,
        message: 'New Group Created',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        badge: '',
        unread: true,
        active: true,
        contacts: contactsSelect.setValue([])
      };
    },
    setActiveChat(index) {
      this.activeChatIndex = index;
      if (index >= 0 && index < this.groupList.length) {
        const group = this.groupList[index];
        const avatar = group.image;
        this.avatar = avatar;
        this.groupName = group.name;
      }
      this.scrollToBottom();

      if (this.windowWidth < 1440) {
        document.getElementById('chat-wrapper').classList.remove('hidden');
        document.getElementById('chat-list').classList.add('hidden');
      }
    },
    isActiveChat(index) {
      return this.activeChatIndex === index;
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('groupChatComponent', groupChatComponent);
});

//Add Member Select
VirtualSelect.init({
  ele: '#addMemberSelect',
  options: [
    { label: 'Auli Ahokas', value: 'Auli Ahokas' },
    { label: 'Sirpa Kolkka', value: 'Sirpa Kolkka' },
    { label: 'Leena Laine', value: 'Leena Laine' },
    { label: 'Risto Saraste', value: 'Risto Saraste' },
    { label: 'Mikko Virtanen', value: 'Mikko Virtanen' },
    { label: 'Tuula Nieminen', value: 'Tuula Nieminen' },
    { label: 'Rosa Lynch', value: 'Rosa Lynch' },
    { label: 'Meagan Snow', value: 'Meagan Snow' },
    { label: 'Jessica Perry', value: 'Jessica Perry' },
    { label: 'Julie Lawson', value: 'Julie Lawson' },
    { label: 'Fiona Smith', value: 'Fiona Smith' },
    { label: 'Linda Stucky', value: 'Linda Stucky' }
  ],
  search: true,
  allowNewOption: true,
  showValueAsTags: true,
  multiple: true
});
