<template>
    <div class="headerRoot">
        <q-header
            class="transitionBg bg-dark"
            :class="
                $q.platform.is.desktop &&
                $store.getters.headerBgTransparent &&
                $store.getters.scrollPos < 100
                    ? 'headerBg'
                    : ''
            "
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

                <q-tabs
                    v-model="tab"
                    v-if="$q.platform.is.desktop"
                    inline-label
                    shrink
                    stretch
                    active-bg-color="zem"
                    active-color="black"
                >
                    <!-- <q-route-tab to="/" name="home" :label="$t('layoutHeader.routeTab.home')"></q-route-tab> -->
                    <q-route-tab
                        to="/gamePage?tag=game"
                        name="major"
                        :label="$t('layoutHeader.routeTab.official')"
                    ></q-route-tab>
                    <q-route-tab
                        to="/gamePage?tag=indie"
                        name="minor"
                        :label="$t('layoutHeader.routeTab.challenge')"
                    ></q-route-tab>
                    <q-route-tab
                        to="/affiliate"
                        name="affiliate"
                        :label="$t('layoutHeader.routeTab.affiliate')"
                    ></q-route-tab>
                    <!-- <a :href="$store.getters.studioUrl" class="aTab">
                        <q-tab name="g-studio" :label="$t('layoutHeader.routeTab.studio')">
                        </q-tab>
                    </a> -->
                    <!-- 모달 추가 -->
                    <a @click="showModal" class="aTab">
                        <q-tab
                            name="g-studio"
                            :label="$t('layoutHeader.routeTab.studio')"
                        >
                        </q-tab>
                    </a>

                    <entry-modal v-if="modal" @close="modal = false" />
                </q-tabs>
                <template v-if="$q.platform.is.desktop">
                    <search-game></search-game>
                </template>
                <template v-if="$q.platform.is.mobile">
                    <search-game-mobile></search-game-mobile>
                </template>
                <!--                <q-btn-->
                <!--                    flat-->
                <!--                    dense-->
                <!--                    round-->
                <!--                    icon="search"-->
                <!--                    class="q-mr-md"-->
                <!--                />-->

                <div class="q-mr-md"></div>

                <div v-if="$store.getters.isLoginComplete" class="flex no-wrap">
                    <q-avatar
                        class="cursorPoint mailIcon q-mr-md"
                        v-if="$store.getters.isLogin"
                        size="30px"
                        @click="openMailPopup"
                    >
                        <q-icon
                            name="fas fa-bullhorn"
                            class="q-mr-md self-center"
                        ></q-icon>
                        <mail-popup-desktop
                            v-if="$q.platform.is.desktop"
                        ></mail-popup-desktop>
                        <mail-popup-mobile
                            v-if="$q.platform.is.mobile"
                        ></mail-popup-mobile>
                    </q-avatar>
                    <q-avatar
                        class="cursorPoint"
                        v-if="$store.getters.user"
                        size="30px"
                        @click="$store.commit('accountPopupMobile', true)"
                    >
                        <q-img
                            :src="
                                ($store.getters.user &&
                                    $store.getters.user.picture) ||
                                'img/icon_pic_empty_01.png'
                            "
                        ></q-img>
                        <account-popup-desktop
                            v-if="$q.platform.is.desktop"
                        ></account-popup-desktop>
                        <account-popup-mobile
                            v-if="$q.platform.is.mobile"
                        ></account-popup-mobile>
                    </q-avatar>
                    <router-link to="/login" v-else>
                        <q-btn color="positive" class="text-no-wrap">
                            {{ $t("layoutHeader.loginBtn") }}
                        </q-btn>
                    </router-link>
                </div>
            </q-toolbar>
        </q-header>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import AccountPopupMobile from "components/common/menu/accountPopupMobile.vue";
import AccountPopupDesktop from "components/common/menu/accountPopupDesktop.vue";
import MailPopupDesktop from "components/common/menu/mailPopupDesktop.vue";
import MailPopupMobile from "components/common/menu/mailPopupMobile.vue";
import { consoleLog } from "src/scripts/consoleLog";
import Modal from "src/layouts/modal.vue";
import SearchGame from "components/common/searchGame.vue";
import SearchGameMobile from "components/common/searchGameMobile.vue"
import EntryModal from "components/studio/entryModal.vue";

@Component({
    components: {
        AccountPopupDesktop,
        AccountPopupMobile,
        MailPopupDesktop,
        MailPopupMobile,
        Modal,
        SearchGame,
        SearchGameMobile,
        EntryModal,
    },
})
export default class LayoutHeader extends Vue {
    private tab = "";
    private modal: boolean = false;

    mounted() {
        this.tab = this.$store.getters.navTab;
    }

    @Watch("tab")
    private onChangedTab() {
        this.$store.commit("navTab", this.tab);
    }

    @Watch("$store.getters.navTab")
    private onChangedNavTab() {
        this.tab = this.$store.getters.navTab;
    }

    async openMailPopup() {
        await this.$store.dispatch("loadMails");
        this.$store.commit("mailPopupMobile", true);
    }
    firebase;
    //개발 스튜디오 알람 모달
   
    showModal() {
        if (this.$store.getters.user !== null) {
            if (this.$store.getters.user.is_developer === true) {
               window.location.href = this.$store.getters.studioUrl;
            } else {
                this.modal = true;
            }
        } else {
            this.modal = true;
        }
    }
}
</script>


<style lang="scss" scoped>
.headerBg {
    background-color: rgba(0, 0, 0, 0.7) !important;
}
.aTab {
    color: white;
    text-decoration: none;
}

a {
    color: inherit;
    text-decoration: inherit;
}

.mailIcon {
    position: relative;
    text-align: center;
    width: 30px;
    height: 30px;
    i {
        margin: 0 auto;
    }
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        left: 0;
        top: 0;
        border-radius: 50%;
        z-index: -1;
    }
}
</style>
