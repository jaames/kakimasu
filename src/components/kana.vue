<template>
  <div class="kana">
    <div class="kana__body">
      <svg ref="svg" class="kana__svg" viewBox="0 0 180 180">
        <path v-for="path in character.paths" :d="path.d" :data-duration="path.t" data-delay="10"></path>
      </svg>
    </div>
    <div v-if="label" class="kana__label">
      {{ character.romaji }}
    </div>
  </div>
</template>

<script>
  import Vivus from 'vivus'

  module.exports = {
    props: ["character", "animatable", "label"],
    data: () => {
      return {
        animation: null,
        isPlaying: false
      }
    },
    methods: {
      play: function () {
        var animation = this.animation;
        if (animation) {
          if(animation.getStatus() === 'end') animation.reset();
          animation.play();
          this.isPlaying = true;
        }
      },
      pause: function () {
        var animation = this.animation;
        if (animation) animation.stop();
        this.isPlaying = false;
      },
      togglePlay: function () {
        var fn = this.isPlaying ? this.pause : this.play;
        fn();
      },
      getSvgPaths: function () {
        var svg = this.$refs.svg;
        return svg.getElementsByTagName("path");
      }
    },
    mounted: function () {
      if (this.animatable) {
        // set up the stroke animation
        this.animation = new Vivus(this.$refs.svg, {
          duration: 320,
          type: 'scenario-sync',
          start: 'manual',
          pathTimingFunction: Vivus.EASE,
        });

        var animation = this.animation;
        // set the default state to completion
        animation.finish();
        // when the animation finishes, set isPlaying to false
        animation.callback = function () {
          this.isPlaying = false;
        }.bind(this);
        // if the character changes, re-init the animation
        this.$watch('character', function () {
          animation.init();
          animation.finish();
        });
      }
    },
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";
  .kana__svg {
    margin: -5% 0;
    display: block;
  	fill: none;
    stroke: $color-primary;
    stroke-width: 14px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .kana__label {
    color: $body-font-color;
    font-weight: bold;
    font-size: 1.75rem;
    text-align: center;
  }

  .modal .kana__svg {
    margin: 0;
  }

</style>
