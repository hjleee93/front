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


                    <q-toolbar-title class="non-selectable cursor-pointer">
                        <a :href="$store.getters.homeUrl">
                            <q-img src="img/zempie-logo.png" width="130px"></q-img>
                        </a>
                    </q-toolbar-title>

                <q-tabs v-model="tab" v-if="$q.platform.is.desktop">
                    <q-route-tab to="/" name="home" label="홈"></q-route-tab>
                    <q-route-tab to="/official" name="Major" label="공식 게임"></q-route-tab>
                    <q-route-tab to="/challenge" name="Minor" label="도전 게임"></q-route-tab>
                    <a :href="$store.getters.studioUrl" class="aTab">
                        <q-tab name="G-Studio" label="개발 스튜디오">
                        </q-tab>
                    </a>
                </q-tabs>

<!--                <q-btn-->
<!--                    flat-->
<!--                    dense-->
<!--                    round-->
<!--                    icon="search"-->
<!--                    class="q-mr-md"-->
<!--                />-->

                <div class="q-mr-xl"></div>

                <div v-if="$store.getters.isLoginComplete">
                    <q-avatar class="cursorPoint" v-if="$store.getters.user" size="30px" @click="$store.commit('accountPopupMobile', true)">
                        <img :src="$store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'">
                        <account-popup-desktop v-if="$q.platform.is.desktop"></account-popup-desktop>
                        <account-popup-mobile v-if="$q.platform.is.mobile"></account-popup-mobile>
                    </q-avatar>
                    <router-link to="/login" v-else >
                        <q-btn color="positive">
                            로그인
                        </q-btn>
                    </router-link>
                </div>

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
}
</script>


<style lang="scss" scoped>
    .aTab {
        color: white;
        text-decoration: none;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
</style>
