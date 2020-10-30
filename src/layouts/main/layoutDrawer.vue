<template>
  <q-drawer
    v-model="open"
    show-if-above
    bordered
    behavior="mobile"
  >
    <q-list>
      <q-item-label
        header
        class="text-grey-8"
      >
        Essential Links
      </q-item-label>
<!--      <EssentialLink-->
<!--        v-for="link in essentialLinks"-->
<!--        :key="link.title"-->
<!--        v-bind="link"-->
<!--      />-->
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class LayoutDrawer extends Vue {

    open : boolean = false;

    mounted() {
        this.open = this.$store.getters.leftDrawerOpen;
    }

    @Watch('$store.getters.leftDrawerOpen')
    onChangedOpenLeftDrawerOpen() {
        this.open = this.$store.getters.leftDrawerOpen;
    }


    @Watch( 'open' )
    onChangedOpen() {
        this.$store.commit( 'leftDrawerOpen', this.open );
    }

}
</script>


<style lang="scss" scoped>

</style>
