import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VueMoment from 'vue-moment';
import App from './App.vue';
import router from './router';

const eventBus = new Vue();
export const SocketInstance = socketio('http://localhost:3000');
Vue.config.productionTip = false;
export default eventBus;

Vue.use(VueSocketIO, SocketInstance);
Vue.use(VueMoment);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
