<template>
  <ul class="grid">
    <li class="grid__item" v-for="char in characters">
      <kana :character="char" animatable="true"></kana>
    </li>
  </ul>
</template>

<script>
  import kana from "./kana.vue";

  module.exports = {
    props: ["characters"],
    methods: {
      playAll: function () {
        // loop through the grid's child components
        var children = this.$children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          // and call their play method if they are animatable
          if (child.animatable) child.play();
        }
      }
    },
    components: {
      kana
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

  .kana {}

  .kana__svg {
  	fill: none;
    stroke: $color-primary;
    stroke-width: 16px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

</style>
