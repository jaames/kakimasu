<template>
  <div class="page page--index">
    <grid ref="grid" :characters="charsetItems"></grid>
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
    data: () => {
      return {
        charsetId: "hiragana",
      };
    },
    computed: {
      charsetItems: function () {
        return charsets[this.charsetId];
      }
    },
  }
</script>
