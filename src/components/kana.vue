<template>
  <div class="kana">
    <svg ref="svg" class="kana__svg" viewBox="0 0 180 180">
      <path v-for="path in character.paths" :d="path.d" :data-duration="path.t" data-delay="10"></path>
    </svg>
    <div v-if="label" class="kana__label">
      {{ character.romaji }}
    </div>
    <div v-if="animatable && controls" class="kana__playbackControls">
      <button class="button" @click="togglePlay">play</button>
    </div>
  </div>
</template>

<script>
  import Vivus from 'vivus'

  module.exports = {
    props: ["character", "animatable", "controls", "label"],
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
          if(this.animation.getStatus() === 'end') this.animation.reset();
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
        this.animation = new Vivus(this.$refs.svg, {
          duration: 320,
          type: 'scenario-sync',
          start: 'manual',
          pathTimingFunction: Vivus.EASE,
        });
        this.animation.finish();
        this.animation.callback = function () {
          this.isPlaying = false;
        }.bind(this);
      }
    },
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";

  .kana .button {
    text-align: center;
    display: block;
    margin: 0 auto;
    width: 100px;
  }

  .kana__svg {
    display: block;
  	fill: none;
    stroke: $color-primary;
    stroke-width: 14px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .kana__label {
    color: $color-primary;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }

  .grid .kana {
    padding: 1.5em;
  }

</style>
