<template>
  <div>
    <nav class="navbar">
      <div class="wrap">
        <div class="navbar__left">
          <dropdown :items="dropdownItems" :selected="dropdownSelection"></dropdown>
        </div>
      </div>
    </nav>
    <div class="wrap" id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import charsets from '../charsets';
  import Dropdown from "../components/dropdown.vue";

  export default {
    components: {
      Dropdown
    },
    data: () => {
      var dropdownItems = [];
      for (var charset in charsets) {
        if (charsets.hasOwnProperty(charset)) {
          dropdownItems.push({
            pathName: "index",
            pathParams: {
              charset: charset
            },
            label: charset
          });
        }
      }

      return {
        dropdownItems
      }
    },
    computed: {
      dropdownSelection() {
        var params = this.$route.params;
        return this.dropdownItems.filter(function (item) {
          return item.label === params.charset;
        })[0];
      }
    }
  }
</script>


<style lang="scss">
  @import '../scss/main.scss';
</style>