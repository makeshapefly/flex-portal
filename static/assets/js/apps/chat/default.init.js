/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: default chat init Js File
*/

import { messages, chats } from '../../../json/apps/chat/chat.js';
import contacts from '../../../json/apps/chat/contact.js';
import videoImage1 from '../../../images/chat/video-1.png';
import videoImage2 from '../../../images/chat/video-2.png';
import user17 from '../../../images/avatar/user-17.png';
function videoCallSwap() {
  return {
    mainImage: videoImage1,
    swapVideoSrc: videoImage2,
    swapVideo() {
      let temp = this.mainImage;
      this.mainImage = this.swapVideoSrc;
      this.swapVideoSrc = temp;
    }
  };
}

//contact list modals
function contactListComponent() {
  return {
    contacts: [],
    searchQuery: '',
    showAddChatModal: false,
    chatList: [],
    messages: [],
    avatarText: '',
    searchChat: '',
    message: '',
    deleteMsg: '',
    activeChatIndex: 0,
    chatAvtar: '',
    chatName: '',
    showchatsModal: true,
    windowWidth: window.innerWidth,

    init() {
      if (this.chatList.length == 0 && this.contacts.length == 0) {
        this.contacts = contacts;
        this.chatList = chats;
        this.messages = messages;
        if (window.innerWidth > 1440) {
          this.setActiveChat(0);
          this.scrollToBottom();
        }
      } else {
        this.chatList = this.filteredChatList;
        this.contacts = this.filteredContacts;
        this.setActiveChat(0);
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

    get filteredContacts() {
      if (this.searchQuery === '') {
        return this.contacts;
      }
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    get displayChatlist() {
      return this.filteredChatList;
    },
    get filteredChatList() {
      if (this.searchChat === '') {
        return this.chatList;
      }
      return this.chatList.filter((chat) =>
        chat.name.toLowerCase().includes(this.searchChat.toLowerCase())
      );
    },

    get initialChatList() {
      return this.chatList;
    },
    setActiveChat(index) {
      this.activeChatIndex = index;
      if (index >= 0 && index < this.chatList.length) {
        const chat = this.chatList[index];
        const avatar = chat.avatar;
        this.messages.forEach((message) => {
          if (message.type === 'received') {
            message.avatar = avatar;
            message.name = chat.name;
            this.chatName = chat.name;
            this.chatAvtar = avatar;
            this.avatarText = chat.avatarText;
            message.avatarText = chat.avatarText;
          }
        });
      }
      if (this.windowWidth < 1440) {
        document.getElementById('chat-wrapper').classList.remove('hidden');
        document.getElementById('chat-list').classList.add('hidden');
      }
      this.scrollToBottom();
    },
    backToChatList() {
      document.getElementById('chat-list').classList.remove('hidden');
      document.getElementById('chat-wrapper').classList.add('hidden');
    },
    isActiveChat(index) {
      return this.activeChatIndex === index;
    },

    openChat(contact) {
      let contactIndex = this.filteredContacts.findIndex((item) => item.name === contact.name);
      let newChat = {
        name: contact.name,
        avatar: contact.avatar,
        lastMessage: 'New chat',
        status: 'online',
        timestamp: 'just now'
      };
      document.body.classList.toggle('overflow-hidden', false);
      this.filteredChatList.unshift(newChat);
      this.filteredContacts.splice(contactIndex, 1);
      this.init();
      this.showAddChatModal = false;
    },
    scrollToBottom() {
      setTimeout(function () {
        var chat = document.getElementById('chat-messages').lastElementChild;
        chat.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 200);
    },
    DeleteMessage(index) {
      this.messages.splice(index, 1);
    },
    sendMessage(messageText) {
      if (messageText.trim() === '') return;
      const newMessage = {
        type: 'sent',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        text: messageText,
        avatar: user17
      };
      this.messages.push(newMessage);
      this.scrollToBottom();
      this.message = '';
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
    beforeDestroy() {
      this.stopCall();
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('videoCallSwap', videoCallSwap);
  Alpine.data('contactListComponent', contactListComponent);
  Alpine.data('callModal', callModal);
});
