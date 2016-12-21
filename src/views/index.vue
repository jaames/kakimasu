<template>
  <div class="page page--index">
    <grid ref="grid" :characters="charsetItems"></grid>
    <transition name="fade">
      <router-view ref="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import charsets from "../components/charsets.js"

  // component imports
  import grid from "../components/grid.vue";

  module.exports = {
    components: {
      grid
    },
    computed: {
      charsetId: function () {
        return this.$route.params.charset;
      },
      charsetItems: function () {
        return charsets[this.$route.params.charset];
      }
    },
  }
</script>
