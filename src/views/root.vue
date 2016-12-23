<template>
  <div>
    <nav class="navbar">
      <div class="wrap">
        <h1 class="navbar__title">kakimasu</h1>
        <dropdown :items="dropdownItems" :selectedItem="$route.params.charset"></dropdown>
      </div>
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

  import dropdown from "../components/dropdown.vue";

  // set up a router
  import vue from "vue";
  import vueRouter from "vue-router";
  vue.use(vueRouter);

  var router = new vueRouter({
    mode: "history",
    routes: [
      {
        path: '/',
        redirect: '/hiragana'
      },
      {
        path: "/:charset",
        name: "index",
        component: index,
        children: [
          {
            path: "/:charset/:character",
            name: "viewCharacter",
            component: view,
          }
        ]
      },
      {
        path: "*",
        component: index
      },
    ]
  });

  module.exports = {
    router,
    components: {
      dropdown
    },
    data: () => {
      var dropdownItems = [];
      for (var charset in charsets) {
        if (charsets.hasOwnProperty(charset)) {
          dropdownItems.push({
            pathName: "index",
            pathParams: {
              charset: charset
            },
            label: charset
          });
        }
      }

      return {
        dropdownItems
      }
    }
  };
</script>

<style lang="scss">
  @import "../scss/main.scss";
</style>
