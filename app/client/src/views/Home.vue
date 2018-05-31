<template>
  <div class="home">
    <HelloWorld msg="marvellian" msg2="cerebros"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
/*eslint-disable */
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
