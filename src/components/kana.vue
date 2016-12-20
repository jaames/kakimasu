<template>
  <div class="kana">
    <svg ref="svg" class="kana__svg" viewBox="0 0 180 180">
      <path v-for="path in character.paths" :d="path.d" :data-duration="path.t" data-delay="10"></path>
    </svg>
  </div>
</template>

<script>
  import Vivus from 'vivus'

  module.exports = {
    props: ["character", "animatable"],
    data: () => {
      return {
        animation: null
      }
    },
    methods: {
      play: function () {
        var animation = this.animation;
        if (animation) {
          animation.reset();
          animation.play();
        }
      }
    },
    mounted: function () {
      if (this.animatable) {
        this.animation = new Vivus(this.$refs.svg, {
          duration: 320,
          type: 'scenario-sync',
          start: 'manual',
          pathTimingFunction: Vivus.EASE,
        });
        this.animation.finish();
      }
    },
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";

  .kana {}

  .kana__svg {
  	fill: none;
    stroke: $color-primary;
    stroke-width: 16px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

</style>
