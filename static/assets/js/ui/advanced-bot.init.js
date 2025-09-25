/*
Template Name: Domiex - Admin & Dashboard Template
Author: Srbthemes
Version: 1.0.0
File: Advanced bot init Js File
*/

import { alternative, coronavirus, prompts, replies } from '../../json/ui/chat-bot';

function chatBot() {
  return {
    prompts: [],
    replies: [],
    alternative: [],
    coronavirus: [],
    botTyping: false,
    messages: [
      {
        from: 'bot',
        text: 'Hello! I am a Domiex chatbot. How can I assist you today?'
      }
    ],
    init() {
      this.prompts = prompts;
      this.replies = replies;
      this.alternative = alternative;
      this.coronavirus = coronavirus;
    },
    output: function (input) {
      let product;

      let text = input
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/[\d]/gi, '')
        .trim();
      text = text
        .replace(/ a /g, ' ')
        .replace(/i feel /g, '')
        .replace(/whats/g, 'what is')
        .replace(/please /g, '')
        .replace(/ please/g, '')
        .replace(/r u/g, 'are you');

      if (this.compare(this.prompts, this.replies, text))
        product = this.compare(this.prompts, this.replies, text);
      else if (text.match(/thank/gi)) product = "You're welcome!";
      else if (text.match(/(corona|covid|virus)/gi))
        product = this.coronavirus[Math.floor(Math.random() * this.coronavirus.length)];
      else product = this.alternative[Math.floor(Math.random() * this.alternative.length)];

      this.addChat(input, product);
    },
    compare: function (promptsArray, repliesArray, string) {
      let reply;
      let replyFound = false;
      for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
          if (promptsArray[x][y] === string) {
            let replies = repliesArray[x];
            reply = replies[Math.floor(Math.random() * replies.length)];
            replyFound = true;
            break;
          }
        }
        if (replyFound) break;
      }
      if (!reply) {
        for (let x = 0; x < promptsArray.length; x++) {
          for (let y = 0; y < promptsArray[x].length; y++) {
            if (this.levenshtein(promptsArray[x][y], string) >= 0.75) {
              let replies = repliesArray[x];
              reply = replies[Math.floor(Math.random() * replies.length)];
              replyFound = true;
              break;
            }
          }
          if (replyFound) break;
        }
      }
      return reply;
    },
    levenshtein: function (s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) return 1.0;
      return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    editDistance: function (s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },
    addChat: function (input, product) {
      this.messages.push({
        from: 'user',
        text: input
      });
      this.autoScrollTop(); // Scroll to the top
      setTimeout(() => {
        this.botTyping = true;
        this.scrollChat();
      }, 1000);
      setTimeout(
        () => {
          this.botTyping = false;
          this.messages.push({
            from: 'bot',
            text: product
          });
          this.scrollChat();
        },
        (product.length / 10) * 1000 + (Math.floor(Math.random() * 2000) + 1500)
      );
    },
    scrollChat: function () {
      const messagesContainer = document.getElementById('messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      setTimeout(() => {
        messagesContainer.scrollTop =
          messagesContainer.scrollHeight - messagesContainer.clientHeight;
      }, 100);
    },
    autoScrollTop: function () {
      const messagesContainer = document.getElementById('messages');
      messagesContainer.scrollTop = 0;
    },
    updateChat: function (target) {
      if (target.value.trim()) {
        this.output(target.value.trim());
        target.value = '';
      }
    }
  };
}

// Initialize Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('chatBot', chatBot);
});
