<template>
    <q-menu>
        <q-list style="border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.28)">
            <q-item class="">
                <q-item-section class="q-my-md">
                    <div class="row no-wrap">
                        <div>
                            <q-avatar size="40px">
                                <q-img :src="$store.getters.user.picture || 'img/icon_pic_empty_01.png'"></q-img>
                            </q-avatar>
                        </div>
                        <div class="q-ma-sm"></div>
<!--                        <q-separator vertical class="q-mx-sm"></q-separator>-->
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
                <q-item clickable>
                    <q-item-section>
                        <div class="row">
                            <q-icon name="fas fa-user" class="q-mr-md self-center"></q-icon><div class="self-center">{{ $t('accountPopup.profileLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </router-link>

            <router-link :to="`/channel/${this.$store.getters.user.channel_id}`">
                <q-item clickable>
                    <q-item-section>
                        <div class="row">
                            <q-icon name="far fa-id-card" class="q-mr-md self-center"></q-icon><div class="self-center">{{ $t('accountPopup.channelLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </router-link>

            <a :href="$store.getters.supportUrl">
                <q-item clickable>
                    <q-item-section>
                        <div class="row">
                            <q-icon name="far fa-question-circle" class="q-mr-md self-center"></q-icon><div class="self-center">{{ $t('accountPopup.supportLabel') }}</div>
                        </div>
                    </q-item-section>
                </q-item>
            </a>
<!--            <q-item clickable>-->
<!--                <q-item-section>-->
<!--                    <div class="row">-->
<!--                        <q-icon name="fas fa-cog" class="q-mr-md self-center"></q-icon><div class="self-center">설정</div>-->
<!--                    </div>-->
<!--                </q-item-section>-->
<!--            </q-item>-->
            <q-item clickable @click="logout">
                <q-item-section>
                    <div class="row">
                        <q-icon name="fas fa-sign-out-alt" class="q-mr-md self-center"></q-icon><div class="self-center">{{ $t('accountPopup.logoutLabel') }}</div>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Login from "src/scripts/login";

@Component
export default class AccountPopupDesktop extends Vue {

    mounted() {
        // console.log( this.$q.platform.is.mobile )
    }

    async logout() {

        try {
            if( this.$store.getters.user )
                await Vue.$api.signOut();
        }
        catch (e) {

        }

        // await this.$store.dispatch( 'logout' );
        await Login.logout();
    }
}
</script>
<style lang="scss" scoped>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>
