<template>
  <div id="chat">
    <div id="messages"></div>
  </div>
</template>

<script>
export default {
  data() {
    return { message: 'hello world' };
  },
  mounted() {
    const socket = io();
    $(() => {
      $('#send').click(() => {
        const message = { user: $('#name').val(), comments: $('#message').val() };
        postMessage(message);
        // console.log("button working" + $("#name").val());
      });
      getMessages();
    });

    socket.on('message', addMessages);

    function addMessages(message) {
      $('#messages').append(`<h4> ${message.user} </h4> <p> ${message.comments} </p>`);
    }

    function getMessages() {
      fetch('/messages')
        .then(data => data.json())
        .catch(error => console.error('Error:', error))
        .then((data) => {
          data.forEach(addMessages);
        });
    }

    function postMessage(message) {
      fetch('/messages', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }).catch(error => console.error('Error:', error));
    }
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
  grid-template-rows: 80px repeat(16, 1fr);
  min-height: 0;
  min-width: 0;
  grid-gap: 10px;
}
#messages {
  grid-column: 2 / 12;
  grid-row: 2 /5 ;
}
</style>
