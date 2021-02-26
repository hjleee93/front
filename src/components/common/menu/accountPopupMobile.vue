<template>
    <q-dialog :maximized="true" v-model="active" transition-show="slide-right" transition-hide="slide-left">
        <q-list class="root">
            <q-item>
                <q-item-section>
                    <div class="row">
                        <q-avatar class="icon q-mr-md" @click="$store.commit('accountPopupMobile', false)">
                            <q-icon name="clear" class="q-mr-md"></q-icon>
                        </q-avatar>
                        <div class="menuText">{{ $t('accountPopup.accountLabel') }}</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
                <q-item-section class="q-my-md">
                    <div class="row no-wrap">
                        <div>
                            <q-avatar size="40px">
                                <q-img :src="$store.getters.user.picture || 'img/icon_pic_empty_01.png'"></q-img>
                            </q-avatar>
                        </div>
                        <div class="q-ma-sm"></div>
                        <div>
                            <div class="text-h7">
                                {{ $store.getters.user.name }}
                            </div>
                            <div>
                                {{ $store.getters.user.email }}
                            </div>
                        </div>
                    </div>
                </q-item-section>
            </q-item>
            <q-separator />
            <router-link to="/profile">
                <q-item class="menuItem" clickable>
                    <q-item-section>
                        <div class="row">
                            <q-avatar class="icon q-mr-md">
                                <q-icon name="fas fa-user" class="q-mr-md"></q-icon>
                            </q-avatar>
                            <div class="menuText">{{ $t('accountPopup.profileLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </router-link>

            <router-link :to="`/channel/${$store.getters.user.channel_id}`">
                <q-item class="menuItem" clickable>
                    <q-item-section>
                        <div class="row">
                            <q-avatar class="icon q-mr-md">
                                <q-icon name="far fa-id-card" class="q-mr-md"></q-icon>
                            </q-avatar>
                            <div class="menuText">{{ $t('accountPopup.channelLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </router-link>

            <a :href="$store.getters.supportUrl">
                <q-item class="menuItem" clickable>
                    <q-item-section>
                        <div class="row">
                            <q-avatar class="icon q-mr-md">
                                <q-icon name="far fa-question-circle" class="q-mr-md"></q-icon>
                            </q-avatar>
                            <div class="menuText">{{ $t('accountPopup.supportLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </a>



<!--            <q-item class="menuItem" clickable>-->
<!--                <q-item-section>-->
<!--                    <div class="row">-->
<!--                        <q-avatar class="icon q-mr-md">-->
<!--                            <q-icon name="fas fa-cog" class="q-mr-md"></q-icon>-->
<!--                        </q-avatar>-->
<!--                        <div class="menuText">설정</div>-->
<!--                    </div>-->
<!--                </q-item-section>-->
<!--            </q-item>-->
            <q-item class="menuItem" clickable @click="logout">
                <q-item-section>
                    <div class="row">
                        <q-avatar class="icon q-mr-md">
                            <q-icon name="fas fa-sign-out-alt" class="q-mr-md"></q-icon>
                        </q-avatar>
                        <div class="menuText">{{ $t('accountPopup.logoutLabel') }}</div>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import Login from "src/scripts/login";

@Component
export default class AccountPopupMobile extends Vue {

    private active : boolean = false;

    mounted() {

    }

    beforeDestroy() {
        // console.log(1234);
    }

    @Watch( 'active' )
    private onChangedActive() {
        this.$store.commit('accountPopupMobile', this.active);
    }

    @Watch( '$store.getters.accountPopupMobile' )
    private onChangedAccountPopupMobile() {
        this.active = this.$store.getters.accountPopupMobile;
    }

    async logout() {
        this.active = false;


        try {
            if( this.$store.getters.user )
                await Vue.$api.signOut();
        }
        catch (e) {

        }

        await Login.logout();

        // await this.$store.dispatch( 'logout' );
        // this.active = false;
    }
}
</script>
<style lang="scss" scoped>
    a {
        text-decoration: none;
    }

    .root {
        background-color: #282828;
        .menuItem {
            color: #b7b7b7;
        }

        .menuText {
            line-height: 48px;
            font-size: 18px;
        }
    }
</style>
