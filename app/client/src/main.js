import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';

const eventBus = new Vue();
export const SocketInstance = socketio('http://localhost:3000');
Vue.config.productionTip = false;
export default eventBus;

Vue.use(VueSocketIO, SocketInstance);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
