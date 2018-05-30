<template lang="pug">
  div.about
    h1 This is an about page
    p(v-bind:title="message") {{ message }}
    input(v-model="message")
</template>

<script>
export default {
  data() {
    return { message: 'hello world' };
  },
};
</script>
