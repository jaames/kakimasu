import Vue from 'vue'
import vueRouter from "vue-router";
import root from './views/root.vue'

Vue.use(vueRouter);

export default new Vue({
  ...root
})
