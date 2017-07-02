<template>
  <div v-if="selectedItem" class="dropdown">
    <div class="dropdown__button">
      <a ref="button" @click="toggle">{{selectedItem.label}}<i class="icon icon--dropdown"></i></a>
    </div>
    <ul v-show="isOpen" class="dropdown__menu">
      <li v-for="item in items" class="dropdown__menu__item"><a @click="select(item)">{{item.label}}</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["items", "selected"],
    data: () => {
      return {
        isOpen: false,
      };
    },
    methods: {
      bodyClickHandler(e) {
        if (e.target !== this.$refs.button) this.hide();
      },
      show() {
        this.isOpen = true;
        document.body.addEventListener("click", this.bodyClickHandler, false);
      },
      hide() {
        this.isOpen = false;
        document.body.removeEventListener("click", this.bodyClickHandler);
      },
      toggle() {
        var fn = this.isOpen ? this.hide : this.show;
        fn();
      },
      select(item) {
        this.$router.push({name: item.pathName, params: item.pathParams});
        this.selectedItem = item;
        this.$emit("selectionChange");
      }
    },
    computed: {
      selectedItem () {
        return this.selected;
      }
    }
  }
</script>

<style lang="scss">
  @import "../scss/foundation.scss";

  .dropdown {
    overflow: visible;
    position: relative;
  }

  .dropdown__button {
    font-size: 1rem;
    border-radius: $global-radius;
    background: $white;
    color: $color-primary;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    box-shadow: 0 2px 0 0px mix($white, $color-secondary);

    @include breakpoint(medium) {
      font-size: 1.25em;
      padding: 0 24px;
      height: 42px;
      line-height: 42px;
    }

    & a {
      display: block;
      line-height: inherit;
    }

    & .icon {
      pointer-events: none;
    }
  }

  .dropdown__menu {
    border-radius: $global-radius;
    background: $white;
    box-shadow: 0 2px 0 0 mix($white, $color-secondary), 0 4px 4px 0px rgba($color-secondary-dark, 0.45);
    list-style-type: none;
    padding: 3px 12px;
    margin: 0;
    position: absolute;
    font-size: 1rem;
    top: calc(100% + 14px);
    right: 0;
    left: 0;
    z-index: 1;

    @include breakpoint(medium) {
      font-size: 1.25rem;
    }

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
    line-height: 42px;
    padding: 0;
    color: $color-primary;
  }

</style>
