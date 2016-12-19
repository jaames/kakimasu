<template>
  <div id="app">
    <grid ref="grid" :characters="charsetItems"></grid>
  </div>
</template>

<script>

  // import charset JSON files and parse into opjects
  import hiragana from "../charsets/hiragana.json";
  import katakana from "../charsets/katakana.json";

  var charsets = {
    hiragana,
    katakana
  };

  // router set up
  import vueRouter from "vue-router";
  var router = new vueRouter();

  import grid from "./grid.vue";

  module.exports = {
    router,
    data: function () {
      return {
        charsetId: "hiragana",
      }
    },
    computed: {
      charsetItems: function () {
        return charsets[this.charsetId];
      }
    },
    components: {
      grid
    }
  }
</script>

<style lang="scss">

  @import "../scss/main.scss";

</style>
