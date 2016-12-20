<template>
  <div>
    <nav class="navbar">
    </nav>
    <div class="wrap" id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  // import charset
  import charsets from "../components/charsets.js";

  // import router views
  import index from "./index.vue";
  import view from "./view.vue";

  // set up a router
  import vue from "vue";
  import vueRouter from "vue-router";
  vue.use(vueRouter);

  var router = new vueRouter({
    routes: [
      { path: "/:charset", component: index },
      { path: "/:charset/:character", component: view },
      { path: "*", component: index },
    ]
  });

  module.exports = {
    router,
  };
</script>

<style lang="scss">
  @import "../scss/main.scss";
</style>
