<template>
  <div class="page page--index">
    <grid ref="grid" :characters="charsetItems"></grid>
    <transition name="fade">
      <router-view ref="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import charsets from "../components/charsets.js";
  import grid from "../components/grid.vue";

  export default {
    components: {
      grid
    },
    computed: {
      charsetId() {
        return this.$route.params.charset;
      },
      charsetItems() {
        var charsetId = this.$route.params.charset;
        return charsets[charsetId];
      }
    },
    mounted() {
      // if the charset isn't recognised, push to the error 404 page
      if (!charsets.hasOwnProperty(this.charsetId)) this.$router.push({name: "error404"});
    }
  }
</script>
