<template>
  <div class="page page--read">
    <kana :character="char"></kana>
  </div>
</template>

<script>
  import charsets from "../components/charsets.js"

  // component imports
  import kana from "../components/kana.vue";

  module.exports = {
    components: {
      kana
    },
    methods: {
      error404: function () {
        this.$router.replace("/");
        return false;
      }
    },
    computed: {
      char: function () {
        var params = this.$route.params;
        console.log(this.$route);
        var charset = charsets[params.charset];
        if (!charset) return this.error404();
        var char = charset.filter((item) => {
          return item.romaji === params.character;
        });
        if (char.length === 0) return this.error404();
        return char[0];
      }
    }
  }
</script>
