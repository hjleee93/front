<template>
    <q-page v-if="$store.getters.isLoginComplete">
        <div class="maxWidth">
            <q-tabs
                v-model="tab"
                dense
                class="q-pt-lg"
                indicator-color="color-grey-10"
                align="left"
            >
                <q-tab name="profile" label="프로필" /><!--한국어-->
                <q-tab name="private" label="보안 및 개인 정보" /><!--한국어-->
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="profile" class="bgColor-1 no-scroll">
                    <profile-tab></profile-tab>
<!--                    <div class="text-h6">Mails</div>-->
<!--                    Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
                </q-tab-panel>

                <q-tab-panel name="private" class="bgColor-1 no-scroll">
                    <profile-private-tab></profile-private-tab>
<!--                    <div class="text-h6">Alarms</div>-->
<!--                    Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
                </q-tab-panel>

            </q-tab-panels>

        </div>
        <div style="padding-top: 100px"></div>
        <footer class="footer text-center q-py-lg text-grey-5">
            Copyright 2020. zempie. All rights reserved.
        </footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import ProfileTab from "components/profile/profileTab.vue";
import ProfilePrivateTab from "components/profile/profilePrivateTab.vue";
import {LoginState} from "src/store/modules/user";

@Component({
    components: {ProfilePrivateTab, ProfileTab}
})
export default class Profile extends Vue {
    private  tab : string = 'profile';
    private loading : boolean = true;

    async mounted() {
        document.title = this.$i18n.t('pageProfileTitle');

        this.$store.commit('navTab', 'Profile');


        const loginState = await this.$store.dispatch('loginState');


        this.loading = false;
        if( loginState !== LoginState.login ) {
            await this.$router.replace('/');
        }
    }
}
</script>
<style lang="scss" scoped>

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        //background-color: #292929;
    }
</style>
