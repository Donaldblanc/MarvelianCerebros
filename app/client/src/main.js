/* eslint-disable */ 
import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VueMoment from 'vue-moment';
import VueFire from 'vuefire';
import Firebase from 'firebase';
import App from './App.vue';
import router from './router';

const eventBus = new Vue();
export const SocketInstance = socketio(process.env.SOCKET);
Vue.config.productionTip = false;
export default eventBus;

const config = {
  apiKey: "AIzaSyDI0QzEY--AmU8EYqeBHdBWEOHauJhrCyc",
  authDomain: "marvelliancerebros2.firebaseapp.com",
  databaseURL: "https://marvelliancerebros2.firebaseio.com",
  projectId: "marvelliancerebros2",
  storageBucket: "",
  messagingSenderId: "115106650682",
};

Firebase.initializeApp(config);

Vue.use(VueSocketIO, SocketInstance);
Vue.use(VueMoment);
Vue.use(VueFire);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
