<template>
    <q-menu>
        <q-list style="border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.28)">
            <q-item class="">
                <q-item-section class="q-my-md">
                    <div class="row no-wrap">
                        <div>
                            <q-avatar size="40px">
                                <img src="https://yt3.ggpht.com/a-/AOh14GgyayNSUkUJdTdkfSMlxeiG8G0ayTRyb_JHRxvOOg=s88-c-k-c0x00ffffff-no-rj">
                            </q-avatar>
                        </div>
                        <div class="q-ma-sm"></div>
<!--                        <q-separator vertical class="q-mx-sm"></q-separator>-->
                        <div>
                            <div class="text-h7">
                                프롬더레드
                            </div>
                            <div>
                                ftr@fromthered.com
                            </div>
                        </div>
                    </div>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable  @click="$router.push('/profile')">
                <q-item-section>
                    <div class="row">
                        <q-icon name="fas fa-user" class="q-mr-md"></q-icon><div>내 프로필</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item clickable @click="$router.push(`/channel/${'ss'}`)">
                <q-item-section>
                    <div class="row">
                        <q-icon name="far fa-id-card" class="q-mr-md"></q-icon><div>내 채널</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item clickable @click="serviceCenter">
                <q-item-section>
                    <div class="row">
                        <q-icon name="far fa-question-circle" class="q-mr-md"></q-icon><div>고객센터</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item clickable>
                <q-item-section>
                    <div class="row">
                        <q-icon name="fas fa-cog" class="q-mr-md"></q-icon><div>설정</div>
                    </div>
                </q-item-section>
            </q-item>
            <q-item clickable @click="logout">
                <q-item-section>
                    <div class="row">
                        <q-icon name="fas fa-sign-out-alt" class="q-mr-md"></q-icon><div>로그아웃</div>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import firebase from "firebase";

@Component
export default class AccountPopupDesktop extends Vue {

    mounted() {
        // console.log( this.$q.platform.is.mobile )
    }

    async logout() {
        await this.$store.dispatch( 'logout' );
    }

    async serviceCenter() {
        window.open('http://gtest.fromthered.com/lhs/zempieServiceCenter/');
    }
}
</script>
<style lang="scss">
</style>
