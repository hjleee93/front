<template>
  <q-layout view="lHh Lpr lFf">

    <layout-header></layout-header>
    <layout-drawer></layout-drawer>

    <q-page-container class="bgColor-0" v-scroll="onScroll" ref="scroll">
      <router-view class="bgColor-1" />
    </q-page-container>


    <layout-footer></layout-footer>

  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

import { Vue, Component } from 'vue-property-decorator';
import LayoutHeader from "layouts/main/layoutHeader.vue";
import LayoutDrawer from "layouts/main/layoutDrawer.vue";
import LayoutFooter from "layouts/main/layoutFooter.vue";

@Component({
  components: {LayoutFooter, LayoutDrawer, LayoutHeader, EssentialLink }
})
export default class MainLayout extends Vue {
  mounted() {
    this.$store.commit('scrollPos', 0);
    this.$store.commit('scrollPrePos', 0);
    this.$store.commit( 'scrollMovePos', 0 );
    this.$store.commit( 'scrollHeight', (this.$refs.scroll as Vue).$el.scrollHeight );

    console.log( this.$q );

  }

  onScroll( newPos : number ) {

    const crtPos = this.$store.getters.scrollPos;
    const movePos = newPos - crtPos;
    const height = (this.$refs.scroll as Vue).$el.scrollHeight;

    this.$store.commit('scrollPos', newPos);
    this.$store.commit('scrollPrePos', crtPos);
    this.$store.commit( 'scrollMovePos', movePos );
    this.$store.commit( 'scrollHeight', height );
  }
}
</script>
<style>

</style>
