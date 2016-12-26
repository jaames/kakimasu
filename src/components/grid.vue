<template>
  <ul class="grid">
    <li class="grid__item" v-for="char in characters">
      <router-link v-if="!char.spacer" class="kana__link" router-link :to="{name: 'viewCharacter', params: {charset: charsetId, character: char.romaji}}">
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
      charsetId() {
        return this.$parent.charsetId;
      }
    }
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";


  $grid-gutter-small: 6px;
  $grid-gutter-medium: 2rem;
  $grid-gutter-large: 4rem;

  .grid {
    margin: 0;
    padding: 0;
    @include clearfix();
    list-style-type: none;
    margin-left: -$grid-gutter-small;
    @include breakpoint(medium) {
      margin-left: -$grid-gutter-medium;
    }
    @include breakpoint(large) {
      margin-left: -$grid-gutter-large;
    }
  }

  .grid__item {
    float: left;
    width: 20%;
    padding-left: $grid-gutter-small;
    margin-bottom: 1rem;
    @include breakpoint(medium) {
      padding-left: $grid-gutter-medium;
    }
    @include breakpoint(large) {
      margin-bottom: 3rem;
      padding-left: $grid-gutter-large;
    }
  }

  .grid .kana__link {
    display: block;
    text-decoration: none;
  }

  .grid .kana__body {
    @include clearfix();
    background: $white;
    border-radius: 50%;
    @include breakpoint(large) {
      box-shadow: 0 2px 0 1px lighten($color-secondary, 12);
    }
  }

  .grid .kana__svg {
    width: 40px;
    height: 40px;
    margin: 6px auto;
    transform: scale(1);
    transition: transform 0.2s ease;
    z-index: 0;
    @include breakpoint(medium) {
      width: 60px;
      height: 60px;
      margin: 20px auto;
    }
    @include breakpoint(large) {
      width: 82px;
      height: 82px;
      margin: 27px auto;
    }
  }

  .grid .kana:hover .kana__svg {
    transform: scale(1.05);
  }

  .grid .spacer {
    height: 50px;
    border-radius: 50%;
    background: none;
    border: 2px dashed $white;
    @include breakpoint(medium) {
      height: 100px;
    }
    @include breakpoint(large) {
      border: 3px dashed $white;
      height: 136px;
    }
  }

</style>
