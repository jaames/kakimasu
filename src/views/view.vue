<template>
  <div class="modal__frame" @click.self="close">
    <div class="modal">
      <div class="modal__head">
        <h5 class="modal__title">{{ char.romaji }}</h5>
        <router-link class="modal__close" :to="{name: 'index'}"><i class="icon icon--close"></i></router-link>
      </div>
      <div class="modal__body">
        <kana ref="kana" :character="char" animatable="true"></kana>
        <div class="modal__arrows">
          <router-link v-if="prev" class="arrow arrow--left" :to="prev"><i class="icon icon--leftArrow"></i></router-link>
          <router-link v-if="next" class="arrow arrow--right" :to="next"><i class="icon icon--rightArrow"></i></router-link>
        </div>
      </div>
      <div class="modal__foot">
        <button class="button" @click="togglePlay">
          <i :class="['icon', isPlaying ? 'icon--pause' : 'icon--play']"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import charsets from "../components/charsets.js"

  var doc = document.documentElement;

  // component imports
  import kana from "../components/kana.vue";

  module.exports = {
    components: {
      kana
    },
    data: () => {
      return {
        isPlaying: false
      }
    },
    methods: {
      error404: function () {
        this.$router.push({name: "error404"});
        return false;
      },
      close: function () {
        this.$router.replace({
          name: "index",
          params: {
            charset: this.$route.params.charset
          }
        });
      },
      togglePlay: function () {
        this.$refs.kana.togglePlay();
      }
    },
    computed: {
      char: function () {
        var params = this.$route.params;
        var char = this.charset.filter((item) => {
          return item.romaji === params.character;
        });
        if (char.length === 0) return this.error404();
        return char[0];
      },
      next: function () {
        var params = this.$route.params;
        var nextItem = this.char.nextItem;
        return nextItem ? {name: "viewCharacter", params: {charset: params.charset, character: nextItem.romaji}} : false;
      },
      prev: function () {
        var params = this.$route.params;
        var prevItem = this.char.prevItem;
        return prevItem ? {name: "viewCharacter", params: {charset: params.charset, character: prevItem.romaji}} : false;
      },
      charset: function () {
        return charsets[this.$route.params.charset];
      },
    },
    mounted: function () {
      doc.classList.add("is-under-modal");
      doc.setAttribute("scroll", "no");
      var vm = this;
      var kana = this.$refs.kana;
      kana.$on("animationStart", function () {
        vm.isPlaying = true;
      });
      kana.$on("animationStop", function () {
        vm.isPlaying = false;
      });
    },
    beforeDestroy: function () {
      doc.classList.remove("is-under-modal");
      doc.removeAttribute("scroll");
    },
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";

  .modal {
    width: 312px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    @include breakpoint(medium) {
      width: 380px;
    }
  }

  .modal .kana__svg {
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }

  .modal__frame {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color-secondary-dark, 0.85);

    &.modal__frame--clear {
      pointer-events: none;
      background-color: none;
      background: none;
    }

  }

  .modal__head {
    font-size: 2.5rem;
    position: relative;
    text-align: center;
    @include clearfix();
  }

  .modal__title {
    font-size: inherit;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
  }

  .modal__subtitle {
    display: block;
    font-size: 1rem;
  }

  .modal__close {
    padding: 0 12px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: inline-block;
  }

  .modal__body {
    padding: 0 48px;
    position: relative;
  }

  .modal__foot {
    margin-top: 1rem;
    text-align: center;
    display: block;
  }

  .modal__foot .button {
    margin: 0 auto;
    width: 84px;
  }

  .modal__arrows {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 96px;
  }

  .arrow {
    display: block;
    height: 96px;
    padding: 36px 12px;

    &.arrow--left { float: left; }
    &.arrow--right { float: right; }
  }

</style>
