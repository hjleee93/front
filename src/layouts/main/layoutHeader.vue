<template>
    <div class="headerRoot">
        <q-header
            class="transitionBg bg-dark"
                  :class="$q.platform.is.desktop &&
                          $store.getters.headerBgTransparent &&
                          $store.getters.scrollPos < 100 ? 'headerBg' : ''"
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

                <q-tabs v-model="tab" v-if="$q.platform.is.desktop" inline-label shrink stretch active-bg-color="zem" active-color="black">
                    <q-route-tab to="/" name="home" :label="$t('layoutHeader.routeTab.home')"></q-route-tab>
                    <q-route-tab to="/official" name="major" :label="$t('layoutHeader.routeTab.official')"></q-route-tab>
                    <q-route-tab to="/challenge" name="minor" :label="$t('layoutHeader.routeTab.challenge')"></q-route-tab>
                    <q-route-tab to="/affiliate" name="affiliate" :label="$t('layoutHeader.routeTab.affiliate')"></q-route-tab>
                    <!-- <a :href="$store.getters.studioUrl" class="aTab">
                        <q-tab name="g-studio" :label="$t('layoutHeader.routeTab.studio')">
                        </q-tab>
                    </a> -->
                      <!-- 모달 추가 -->
                    <a @click="showModal" class="aTab">
                        <q-tab name="g-studio" :label="$t('layoutHeader.routeTab.studio')">
                        </q-tab>
                    </a>
                    <template v-if="modal">
                        <guide-modal @close="modal = false" :close="$t('layoutHeader.modal.close')" src="img/sprinting.gif">
                            <template v-slot:header >
                            <p class="header">{{$t('layoutHeader.modal.header')}}</p>
                            <p class="header-desc">{{$t('layoutHeader.modal.headerDesc')}}</p>
                            </template>
                            <template v-slot:body >
                            <q-btn
                            class="modal-body-btn"
                            color="black"
                            text-color="white"
                            :label="$t('layoutHeader.modal.label')"
                            @click="goDevSignUP()"
                            />
                            </template>
                        </guide-modal>
                    </template>
                </q-tabs>

<!--                <q-btn-->
<!--                    flat-->
<!--                    dense-->
<!--                    round-->
<!--                    icon="search"-->
<!--                    class="q-mr-md"-->
<!--                />-->

                <div class="q-mr-md"></div>

                <div v-if="$store.getters.isLoginComplete" class="flex no-wrap">
                    <q-avatar class="cursorPoint mailIcon q-mr-md" v-if="$store.getters.isLogin" size="30px" @click="openMailPopup">
                        <q-icon name="fas fa-bullhorn" class="q-mr-md self-center"></q-icon>
                        <mail-popup-desktop v-if="$q.platform.is.desktop"></mail-popup-desktop>
                        <mail-popup-mobile v-if="$q.platform.is.mobile"></mail-popup-mobile>
                    </q-avatar>
                    <q-avatar class="cursorPoint" v-if="$store.getters.user" size="30px" @click="$store.commit('accountPopupMobile', true)">
                        <q-img :src="$store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'"></q-img>
                        <account-popup-desktop v-if="$q.platform.is.desktop"></account-popup-desktop>
                        <account-popup-mobile v-if="$q.platform.is.mobile"></account-popup-mobile>
                    </q-avatar>
                    <router-link to="/login" v-else >
                        <q-btn color="positive" class="text-no-wrap">
                            {{ $t('layoutHeader.loginBtn') }}
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
import MailPopupDesktop from "components/common/menu/mailPopupDesktop.vue";
import MailPopupMobile from "components/common/menu/mailPopupMobile.vue";
import {consoleLog} from "src/scripts/consoleLog";
import GuideModal from "layouts/guideModal.vue";

@Component({
    components: {AccountPopupDesktop, AccountPopupMobile, MailPopupDesktop, MailPopupMobile,GuideModal}
})
export default class LayoutHeader extends Vue {
    private tab = '';
     private modal: boolean = false;

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

    async openMailPopup() {
        await this.$store.dispatch('loadMails');
        this.$store.commit('mailPopupMobile', true);
    }firebase
    //개발 스튜디오 알람 모달
    goDevSignUP(){
        window.location.href = this.$store.getters.studioUrl
    }
    showModal(){
        // console.log(this.$store.getters.user.is_developer)
        if (this.$store.getters.user !== null) {
            if (this.$store.getters.user.is_developer === true) {
                this.goDevSignUP();
            } else {
                this.modal = true;
            }
        } else {
            this.goDevSignUP();
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
            content: '';
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
    // 모달
    .header{
        color:#181818;
        font-weight: bold;
        font-size: 3rem;

    }
    .header-desc{
        color: #181818;
        font-size: 1rem;
    }
    .modal-body-btn{
        margin-top: 20px;
        border-radius: 40px;
        padding: 0 20px 0 20px;
        height: 60px;
        font-size: 17px;
        font-weight: bold;
    }
</style>
