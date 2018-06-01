<template>
  <div id="app">
    <div id="nav">
      <MC></MC>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="/">Home</router-link>&nbsp;|&nbsp;<router-link to="chat">Chat</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import MC from '@/components/MC.vue';

export default {
  name: 'App',
  components: {
    MC,
  },
};
</script>


<style>
body {
  background-color: #151517;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(245, 245, 245);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr repeat(11, 200px);
}
#nav {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 13;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: rgb(86, 128, 128);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: crimson;
}

/* .fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
} */


</style>
