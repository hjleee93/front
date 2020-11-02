<template>
    <div class="headerRoot">
        <q-header
            class="transitionBg bg-dark"
                  :class="$q.platform.is.desktop && $store.getters.headerBgTransparent && $store.getters.scrollPos < 100 ? 'bg-transparent' : ''"
                  :reveal="$q.platform.is.mobile"
        >
            <q-toolbar class="maxWidth">
<!--                <q-btn-->
<!--                    flat-->
<!--                    dense-->
<!--                    round-->
<!--                    icon="menu"-->
<!--                    aria-label="Menu"-->
<!--                    @click="$store.commit('leftDrawerOpen', !$store.getters.leftDrawerOpen )"-->
<!--                />-->

                <q-avatar>
                    <img src="/favicon.ico" style="width: 34px; height: 34px;">
                </q-avatar>

                <q-toolbar-title>
                    Zempie
                </q-toolbar-title>

                <q-tabs v-model="tab" v-if="$q.platform.is.desktop">
                    <q-tab name="Major" label="베스트" @click="goTo('/')" />
                    <q-tab name="Minor" label="챌리지" @click="goTo('/challenge')" />
                    <q-tab name="G-Studio" label="게임 스튜디오" @click="goTo('/')" />
                </q-tabs>

                <q-btn
                    flat
                    dense
                    round
                    icon="search"
                    class="q-mr-md"
                />
                <q-avatar size="30px">
                    <img src="https://yt3.ggpht.com/a-/AOh14GgyayNSUkUJdTdkfSMlxeiG8G0ayTRyb_JHRxvOOg=s88-c-k-c0x00ffffff-no-rj">
                </q-avatar>
            </q-toolbar>
        </q-header>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class LayoutHeader extends Vue {
    private tab = '';

    mounted() {
        this.tab = this.$store.getters.navTab;
    }

    @Watch( 'tab' )
    private onChangedTab() {
        this.$store.commit('navTab', this.tab);
    }

    @Watch( '$store.getters.navTab' )
    private onChangedNavTab() {
        this.tab = this.$store.getters.navTab;
    }

    async goTo( path : string ) {
        await this.$router.push( path );
    }
}
</script>


<style lang="scss" scoped>
</style>
