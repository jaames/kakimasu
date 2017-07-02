<template>
  <div>
    <nav class="navbar">
      <div class="wrap">
        <h1 class="navbar__title">
          <router-link to="/">kakimasu</router-link>
        </h1>
        <div class="navbar__right">
          <dropdown :items="dropdownItems" :selected="dropdownSelection"></dropdown>
        </div>
      </div>
    </nav>
    <div class="wrap" id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import vue from "vue";
  import vueRouter from "vue-router";
  import ga from "vue-ga";
  import charsets from "../components/charsets.js";
  import index from "./index.vue";
  import view from "./view.vue";
  import error404 from "./404.vue";
  import dropdown from "../components/dropdown.vue";
  import config from "../../poi.config.js";

  var router = new vueRouter({
    mode: "history",
    routes: [
      {
        path: '/',
        redirect: '/hiragana'
      },
      {
        path: "/404",
        name: "error404",
        component: error404
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
    ]
  });

  var gaConfig = config.html.googleAnalytics || null;
  if (gaConfig) ga(router, gaConfig);

  export default {
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
    },
    computed: {
      dropdownSelection() {
        var params = this.$route.params;
        return this.dropdownItems.filter(function (item) {
          return item.label === params.charset;
        })[0];
      }
    }
  };
</script>

<style lang="scss">
  @import "../scss/main.scss";
</style>
