import Vue from 'vue';
import Router from 'vue-router';
import Analytics from 'vue-ga';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/kakimasu/',
  routes: [
    {
      path: '/',
      redirect: '/hiragana'
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue')
    },
    {
      path: '/:charset',
      name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '',
          name: 'viewCharacter',
          component: () => import('./views/view.vue')
        }
      ]
    },
  ]
});

if (process.client) {
  // Hook in analytics
  // Also @ 2016 James -- it really doesn't matter if your tracking ID isn't private
  Analytics(router, 'UA-52026208-3');
}

export default router;