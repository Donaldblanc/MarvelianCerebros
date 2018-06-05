import Vue from 'vue';
import App from './App.vue';
import router from './router';

const eventBus = new Vue();
Vue.config.productionTip = false;
export default eventBus;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
