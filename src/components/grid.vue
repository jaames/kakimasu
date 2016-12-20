<template>
  <ul class="grid">
    <li class="grid__item" v-for="char in characters">
      <router-link :to="'/' + charsetId + '/' + char.romaji">
        <kana :character="char"></kana>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import kana from "./kana.vue";

  module.exports = {
    props: ["characters"],
    components: {
      kana
    },
    computed: {
      charsetId: function () {
        return this.$parent.charsetId;
      }
    }
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";

  $grid-gutter: 6px;

  .grid {
    margin: 0;
    padding: 0;
    @include clearfix();
    list-style-type: none;
    margin-left: -$grid-gutter;
  }

  .grid__item {
    float: left;
    width: 20%;
    padding-left: $grid-gutter;
  }

  .grid a {
    display: block;
    text-decoration: none;
  }

</style>
