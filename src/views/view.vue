<template>
  <div class="modal__frame" @click.self="close">
    <div class="modal">
      <div class="modal__head">
        {{ char.romaji }}
      </div>
      <div class="modal__body">
        <kana ref="kana" :character="char" animatable="true"></kana>
        <div class="modal__arrows">
          <button @click="openPrevItem" v-show="hasPrevItem" class="arrow arrow--left">
            <i class="icon icon--leftArrow"></i>
          </button>
          <button @click="openNextItem" v-show="hasNextItem" class="arrow arrow--right">
            <i class="icon icon--rightArrow"></i>
          </button>
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
        this.$router.replace("/");
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
      open: function (char) {
        this.$router.replace({
          name: "viewCharacter",
          params: {
            charset: this.$route.params.charset,
            character: char.romaji
          }
        });
      },
      openNextItem: function () {
        this.open(this.char.nextItem);
      },
      openPrevItem: function () {
        this.open(this.char.prevItem);
      },
      togglePlay: function () {
        this.$refs.kana.togglePlay();
        this.isPlaying = this.$refs.kana.isPlaying;
      }
    },
    computed: {
      char: function () {
        var params = this.$route.params;
        var charset = this.charset;
        var char = charset.filter((item) => {
          return item.romaji === params.character;
        });
        if (char.length === 0) return this.error404();
        return char[0];
      },
      hasNextItem: function () {
        return this.char.nextItem ? true : false;
      },
      hasPrevItem: function () {
        return this.char.prevItem ? true : false;
      },
      charset: function () {
        return charsets[this.$route.params.charset];
      },
    },
    mounted: function () {
      doc.classList.add("is-under-modal");
      doc.setAttribute("scroll", "no");
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
    width: 380px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }

  .modal__head {
    text-align: center;
    font-size: 2.5rem;
  }

  .modal__body {
    padding: 0 48px;
    position: relative;
  }

  .modal__foot {
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
