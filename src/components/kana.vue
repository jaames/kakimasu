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
      play() {
        var animation = this.animation;
        if (animation) {
          if(animation.getStatus() === 'end') animation.reset();
          animation.play();
          this.isPlaying = true;
          this.$emit("animationStart");
        }
      },
      pause() {
        if (this.animation) this.animation.stop();
        this.isPlaying = false;
        this.$emit("animationStop");
      },
      togglePlay() {
        var fn = this.isPlaying ? this.pause : this.play;
        fn();
      },
      getSvgPaths() {
        var svg = this.$refs.svg;
        return svg.getElementsByTagName("path");
      }
    },
    mounted() {
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
        animation.callback = () => {
          this.isPlaying = false;
          this.$emit("animationStop");
        };
        // if the character changes, re-init the animation
        this.$watch('character', function () {
          this.animation.init();
          this.animation.finish();
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
    stroke-width: 16px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .kana__label {
    color: $body-font-color;
    font-weight: bold;
    font-size: 1.25rem;
    text-align: center;
    @include breakpoint(medium) {
      font-size: 1.75rem;
    };
  }

</style>
