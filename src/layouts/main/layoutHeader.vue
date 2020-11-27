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

<!--                <q-avatar @click="goTo('/')">-->
<!--                    <img draggable="false" src="favicon.ico" style="width: 34px; height: 34px;">-->
<!--                </q-avatar>-->

                <q-toolbar-title class="non-selectable cursor-pointer" @click="goTo('/')">
                    <q-img src="img/zempie-logo.png" width="130px"></q-img>
                </q-toolbar-title>

                <q-tabs v-model="tab" v-if="$q.platform.is.desktop">
                    <q-tab name="Major" label="게임" @click="goTo('/')" />
                    <q-tab name="Minor" label="도전 게임" @click="goTo('/challenge')" />
                    <q-tab name="G-Studio" label="개발 스튜디오" @click="studio" />
                </q-tabs>

<!--                <q-btn-->
<!--                    flat-->
<!--                    dense-->
<!--                    round-->
<!--                    icon="search"-->
<!--                    class="q-mr-md"-->
<!--                />-->

                <div class="q-mr-xl"></div>

                <q-avatar class="cursorPoint" v-if="$store.getters.user" size="30px" @click="$store.commit('accountPopupMobile', true)">
                    <img :src="$store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'">
                    <account-popup-desktop v-if="$q.platform.is.desktop"></account-popup-desktop>
                    <account-popup-mobile v-if="$q.platform.is.mobile"></account-popup-mobile>
                </q-avatar>
                <q-btn v-else color="positive" @click="goTo('/login')">
                    로그인
                </q-btn>

            </q-toolbar>
        </q-header>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import AccountPopupMobile from "components/common/menu/accountPopupMobile.vue";
import AccountPopupDesktop from "components/common/menu/accountPopupDesktop.vue";
@Component({
    components: {AccountPopupDesktop, AccountPopupMobile}
})
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
        try {
            await this.$router.push( path );
        }
        catch (e) {

        }
    }

    async studio() {
        location.href = process.env.VUE_APP_STUDIO_URL;
    }
}
</script>


<style lang="scss" scoped>
</style>
