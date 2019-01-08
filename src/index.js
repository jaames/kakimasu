import Vue from 'vue';
import router from './router';
import App from './components/app.vue';

export default () => ({
  router,
  render: h => h(App)
});