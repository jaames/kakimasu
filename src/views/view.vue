<template>
  <div class="modal__frame" @click.self="close">
    <div class="modal">
      <div class="modal__body">
        <kana :character="char" animatable="true" controls="true" upperLabel="true"></kana>
        <div class="modal__arrows">
          <button @click="openPrevItem" v-show="hasPrevItem" class="button arrow arrow--left">&lt;</button>
          <button @click="openNextItem" v-show="hasNextItem" class="button arrow arrow--right">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import charsets from "../components/charsets.js"

  // component imports
  import kana from "../components/kana.vue";

  var body = document.body;

  module.exports = {
    components: {
      kana
    },
    methods: {
      error404: function () {
        this.$router.replace("/");
        return false;
      },
      close: function () {
        var charsetId = this.$route.params.charset;
        this.$router.replace("/" + charsetId);
      },
      open: function (char) {
        var params = this.$route.params;
        this.$router.replace("/" + params.charset + "/" + char.romaji);
      },
      openNextItem: function () {
        this.open(this.char.nextItem);
      },
      openPrevItem: function () {
        this.open(this.char.prevItem);
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
      }
    },
    mounted: function () {
      body.classList.add("is-under-modal");
      body.setAttribute("scroll", "no");
    },
    beforeDestroy: function () {
      body.classList.remove("is-under-modal");
      body.removeAttribute("scroll");
    },
  }
</script>

<style lang="scss">

  @import "../scss/foundation.scss";

  .modal {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .modal__frame {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color-secondary-dark, 0.85);
  }

  .modal__body {
    padding: 0 48px;
    position: relative;
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
