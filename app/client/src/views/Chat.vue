<template>
  <div id="chat">
    <div id="messages">
      <div class="message" v-for="message in messages" :key="message.user">
        <h4>{{message.user}} </h4>
        <p>{{message.comments}}</p>
      </div>
    </div>
    <input id="message" placeholder="write something"/>
    <input id="name" placeholder="what's your name"/>
    <button id="send" @click="postMessage">Send</button>
  </div>
</template>

<script>
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
  methods: {
    postMessage() {
      const message = { user: document.querySelector('#name').value, comments: document.querySelector('#message').value };
      fetch('/messages', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }).catch(error => console.error('Error:', error));
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
#messages {
  grid-column: 2 / 12;
  grid-row: 2 / 7;
  overflow-y: scroll;
  box-sizing: content-box;
  padding-right: 15px;
}
::-webkit-scrollbar {
  display: none;
}

</style>
