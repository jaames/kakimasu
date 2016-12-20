<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import charset
  import charsets from "../components/charsets.js";

  // import router views
  import index from "./index.vue";
  import learn from "./learn.vue";

  // set up a router
  import vue from "vue";
  import vueRouter from "vue-router";
  vue.use(vueRouter);

  var router = new vueRouter({
    routes: [
      { path: "*", component: index },
      { path: "/learn/:charset/:character", component: learn },
    ]
  });

  module.exports = {
    router,
  };
</script>

<style lang="scss">
  @import "../scss/main.scss";
</style>
