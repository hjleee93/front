<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { i18n } from "boot/i18n";
let app : App;

@Component
export default class App extends Vue {
  mounted() {
    // console.log( this.$t('failed'));
    this.$i18n.locale = 'ko';
    console.log( this.$i18n.t('failed'));
    console.log( i18n.t('failed') );
    app = this;
  }
}

export {
    app
}

</script>
