/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: video chat init Js File
*/

function pinManager() {
  return {
    currentTime: 0,
    formattedTime: '00:00:00',
    newPinText: '',
    pins: [
      { time: '00:01:48', text: 'Weekly Update' },
      { time: '00:02:48', text: 'Design Issue' },
      { time: '00:03:01', text: 'Deadline Discuses' }
    ],
    startTimer() {
      setInterval(() => {
        this.currentTime++;
        this.formattedTime = this.formatTime(this.currentTime);
      }, 1000);
    },
    formatTime(seconds) {
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      return `${h}:${m}:${s}`;
    },
    addPin() {
      if (this.newPinText.trim() === '') return;
      this.pins.push({ time: this.formattedTime, text: this.newPinText });
      this.newPinText = '';
    },
    init() {
      this.startTimer();
    }
  };
}

import videoChat from '../../../json/apps/chat/video.group.chat.js';
import user17 from '../../../images/avatar/user-17.png';
function groupChat() {
  return {
    messages: [],
    newMessage: '',
    init() {
      this.messages = videoChat;
      this.scrollToBottom();
    },

    sendMessage() {
      if (this.newMessage.trim() === '') return;
      this.messages.push({
        avatar: user17, // Replace with user's avatar path
        name: 'Sophia Mia', // Replace with user's name
        message: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      setTimeout(function () {
        var chat = document.getElementById('chat-messages').lastElementChild;
        chat.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 200);
    }
  };
}
// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('pinManager', pinManager);
  Alpine.data('groupChat', groupChat);
});
