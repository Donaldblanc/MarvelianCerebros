<template>
  <div id="chat">
    <div id="messages-wrapper">
    <div id="messages" ref="messages">
      <div class="message" v-for="message in messages" :key="message.user">
        <h4 class="users" style="margin: 0">{{message.user}}<span> {{ new Date() | moment("h:mm A") }}</span></h4>
        <p class="comments" style="margin: 0">{{message.comments}}</p>
      </div>
    </div>
    </div>
    <div id="message-input-wrapper">
      <textarea id="message-input" type="text" placeholder="Message chat" @keyup="postMessage($event)"/>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase';

export default {
  data() {
    return {
      messages: [],
      isConnected: false,
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    message(data) {
      this.messages.push(data);
    },
  },
  mounted() {
    this.getMessages();
  },
  updated() {
    this.$refs.messages.scrollTop = this.$refs.messages.lastElementChild.offsetTop;
  },
  methods: {
    postMessage(event) {
      if (event.keyCode === 13) {
        if (!event.shiftKey) {
          let name;
          if (Firebase.auth().currentUser.displayName) {
            name = Firebase.auth().currentUser.displayName
          } else {
            name = 'Anonymous'
          }
          const message = { user: name, comments: document.querySelector('#message-input').value };
          fetch('/messages', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          }).catch(error => console.error('Error:', error));
          event.currentTarget.value = '';
          const messages = document.querySelector('#messages');
          this.$nextTick(() => {
            this.$refs.messages.scrollTop = this.$refs.messages.lastElementChild.offsetTop;
        });
        }
      }
    },
    getMessages() {
      fetch('/messages')
        .then(data => data.json())
        .catch(error => console.error('Error:', error))
        .then((data) => {
          data.forEach((element) => {
            this.messages.push(element);
          });
        });
    },
  },
};
</script>

<style>
#chat {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 13;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 80px repeat(7, 10vh);
  min-height: 0;
  min-width: 0;
  grid-gap: 10px;
}
#messages-wrapper {
  grid-column: 3 / 12;
  grid-row: 2 / 7;
  overflow-y: scroll;
  overflow: hidden;
}
#messages {
  grid-column: 3 / 12;
  grid-row: 2 / 7;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  box-sizing: content-box;
  padding-right: 17px;
  box-sizing: content-box;
}
::-webkit-scrollbar {
  display: none;
}
#message-input-wrapper {
  grid-row: 7 / 8;
  grid-column: 5 / 9;
  overflow-y: scroll;
  overflow: hidden;
  max-height: 50px;
  min-width: 494px;
}
#message-input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(128, 128, 128, 0.267);
  color: aliceblue;
  resize: none;
  box-sizing: content-box;
  padding-right: 17px;
  font-family: inherit;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    line-height: 50px;
    font-size: 20px;
}
::-webkit-input-placeholder { /* Webkit */
    line-height: 50px;
    font-size: 20px;
}
#send {
  grid-row: 7 / 8;
  grid-column: 9 / 10;
  height: 30px;
  border: none;
  background-color: aliceblue;
  height: 50%;
}
form {
  grid-row: 7 / 8;
  grid-column: 3 / 12;
}
.message {
  border-top: 1px solid rgba(128, 128, 128, 0.267);
}
.message:hover {
  background-color: rgba(128, 128, 128, 0.596);
}
.users {
  box-sizing: border-box;
  padding-top: 10px
}
.comments {
  box-sizing: border-box;
  padding-bottom: 10px;
  white-space: pre-wrap;
}
</style>
