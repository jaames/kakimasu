<template>
  <ul class="grid">
    <li class="grid__item" v-for="char in characters">
      <router-link v-if="!char.spacer" router-link :to="'/' + charsetId + '/' + char.romaji">
        <kana :character="char" label="true"></kana>
      </router-link>
      <div v-else class="spacer"></div>
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

  $grid-gutter: 4rem;

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
    margin-bottom: 3rem;
  }
  
  .grid .kana__body {
    background: $white;
    overflow: auto;
    border-radius: 50%;
    box-shadow: 0 2px 0 1px lighten($color-secondary, 12), 0 2px 2px 0px rgba($color-secondary-dark, 0.45);
  }

  .grid .kana__svg {
    width: 82px;
    height: 82px;
    margin: 27px auto;
  }

  .grid .spacer {
    height: 136px;
    border-radius: 50%;
    background: none;
    border: 3px dashed $white;
  }

  .grid a {
    display: block;
    text-decoration: none;
  }

</style>
