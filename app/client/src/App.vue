<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="about">About</router-link> |
      <router-link to="test">Test</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
body {
  background-color: rgb(227, 231, 235);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(117, 132, 146);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto
}
#nav {
  padding: 30px;
  grid-row-start: 2;
  grid-row-end: 13;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
}
.home {
  grid-row-start: 4;
  grid-row-end: 5;
}
</style>
