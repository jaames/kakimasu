<template>
  <div class="dropdown">
    <div class="dropdown__button">
      <a ref="button" @click="toggle">{{selected.label}}<i class="icon icon--dropdown"></i></a>
      <ul v-show="isOpen" class="dropdown__menu">
        <li v-for="item in items" class="dropdown__menu__item"><a @click="select(item)">{{item.label}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

  module.exports = {
    props: ["items", "selectedItem"],
    data: function () {
      var selected = this.items.filter((item) => {
        return item.label == this.selectedItem;
      });

      return {
        isOpen: false,
        selected: selected[0]
      };
    },
    methods: {
      bodyClickHandler: function (e) {
        if (e.target !== this.$refs.button) this.hide();
      },
      show: function () {
        this.isOpen = true;
        document.body.addEventListener("click", this.bodyClickHandler, false);
      },
      hide: function (e) {
        this.isOpen = false;
        document.body.removeEventListener("click", this.bodyClickHandler);
      },
      toggle: function () {
        var fn = this.isOpen ? this.hide : this.show;
        fn();
      },
      select: function (item) {
        this.$router.push({name: item.pathName, params: item.pathParams});
        this.selected = item;
      }
    }
  }
</script>

<style lang="scss">
  @import "../scss/foundation.scss";

  .dropdown__button {
    font-size: 1.25rem;
    border-radius: 21px;
    background: $white;
    color: $color-primary;
    padding: 0 24px;
    height: 42px;
    line-height: 42px;
    vertical-align: middle;
    display: inline-block;
    position: relative;

    & .icon {
      pointer-events: none;
    }

  }

  .dropdown__menu {
    border-radius: 21px;
    background: $white;
    box-shadow: 0 2px 0 1px lighten($color-secondary, 12), 0 2px 4px 0px rgba($color-secondary-dark, 0.8);
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 56px;
    right: 0;
    left: 0;

    &::before {
      position: absolute;
      top: -8px;
      margin: 0 auto;
      left: 0;
      right: 0;
      @include css-triangle(8px, $white, "up");
    }

  }

  .dropdown__menu__item {
    text-align: center;
    font-size: 1.25rem;
    line-height: 48px;
    color: $color-primary;
  }

</style>
