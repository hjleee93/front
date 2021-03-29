<template>
    <q-layout class="text-center">
        <q-page-container>
            <q-page>

                <div>
                    <div class="row flex-center">
<!--                        <q-avatar size="60px" class="q-my-lg">-->
<!--                            <img src="favicon.ico">-->
<!--                        </q-avatar>-->
<!--                        <div class="q-ml-sm" style="font-size: 40px;">-->
<!--                            Zempie-->
<!--                        </div>-->
                        <a :href="$store.getters.homeUrl">
                            <q-img src="img/zempie-logo.png" width="300px" class="q-my-xl cursor-pointer"></q-img>
                        </a>
                    </div>
                </div>

                <div class="maxWidth">
                    <div class="width90p margin0auto maxWidth800px">
                        <div class="q-mt-xs"></div>
                        <q-input square outlined filled
                                 color="" class=""
                                 :error="!!nicknameError"
                                 :error-message="nicknameError"
                                 v-model="nickname"
                                 :label="$t('joinEmailContinue.nicknameInput.label')"
                                 ref="nickname"
                                 lazy-rules
                                 :rules="[
                                     val=>val.length >= 2 && val.length <= 12 || $t('joinEmailContinue.nicknameInput.label'),
                                 ]"
                                 @input="onNicknameChange"
                        >
                            <template v-slot:prepend>
                                <q-icon name="account_box" />
                            </template>

<!--                            <template v-slot:append>-->
<!--                                <q-btn color="grey-9">-->
<!--                                    중복확인-->
<!--                                </q-btn>-->
<!--                            </template>-->

                        </q-input>

                        <div class="q-mt-lg"></div>

                        <div class="row relative-position">
                            <q-checkbox class="non-selectable" color="grey-9" v-model="check1" :label="$t('joinEmailContinue.tos.label')" />
                            <div class="absolute-right">
                                <q-btn color="grey-9" @click="show1 = !show1">{{ $t('joinEmailContinue.tos.showAll') }}</q-btn>
                            </div>
                        </div>

                        <q-slide-transition>
                            <div v-show="show1" class="height150">
                                <tos></tos>
                            </div>
                        </q-slide-transition>


                        <div class="q-my-md"></div>

                        <div class="row relative-position">
                            <q-checkbox class="non-selectable" color="grey-9" v-model="check2" :label="$t('joinEmailContinue.policy.label')" />
                            <div class="absolute-right">
                                <q-btn color="grey-9" @click="show2 = !show2">{{ $t('joinEmailContinue.policy.showAll') }}</q-btn>
                            </div>
                        </div>

                        <q-slide-transition>
                            <div v-show="show2" class="height150">
                                <tos2></tos2>
                            </div>
                        </q-slide-transition>



                        <div class="q-my-xl"></div>

                        <q-btn color="positive" :loading="loading" :disable="joinCheck" class="width100p height50" @click="signup">{{ $t('joinEmailContinue.joinBtn') }}</q-btn>



                        <div class="q-my-md"></div>


                        <div class="q-my-md"></div>
                    </div>
                </div>

            </q-page>
        </q-page-container>
        <q-footer class="footer q-py-lg text-grey-5">
            Copyright 2020. zempie. All rights reserved.
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import firebase from "firebase/app";
import {LoginState} from "src/store/modules/user";
import Tos from "components/join/tos.vue";
import Tos2 from "components/join/tos2.vue";
import Login from "pages/login.vue";
import LoginManager from "src/scripts/login";
@Component({
    components: {Tos2, Tos}
})
export default class JoinEmailContinue extends Vue {

    private nickname : string = '';
    private nicknameError : string  = '';

    private check1 : boolean = false;
    private check2 : boolean = false;

    private show1 : boolean = false;
    private show2 : boolean = false;

    private loading : boolean = false;


    async mounted() {
        document.title = this.$t('pageTitle.joinEmailContinue') as string;
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                await this.$router.replace('/');
                return;
        }

        const currentUser = firebase.auth().currentUser;

        if( !currentUser ) {
            await this.$router.replace('/login');
            return;
        }

        this.nickname = currentUser.displayName;
    }

    async signup() {
        this.loading = true;
        const result = await this.$api.signUp( this.nickname );

        if( !result || result.error ) {
            // if( result && result.error && result.error.message === '사용할 수 없는 단어' ) {
            if( result?.error?.code === 40101 ) {
                //todo 닉네임 필터 에러 처리
                alert( this.$t('joinEmailContinue.joinNicknameError') );
            }
            else {
                console.error( result && result.error || 'error' );
                result && result.error && alert( result.error );
            }
        }
        else {
            const { user } = result;
            this.$store.commit('user', user);
            await LoginManager.login();

            if(this.$store.getters.redirectRouter) {
                const router = this.$store.getters.redirectRouter;
                this.$store.commit('redirectRouter', null);
                await this.$router.replace( router );
            }
            else if( this.$store.getters.redirectUrl ) {
                const url = this.$store.getters.redirectUrl;
                this.$store.commit('redirectUrl', null);
                window.location.href = url;
            }
            else {
                await this.$router.replace('/');
            }
        }

        this.loading = false;
    }

    get joinCheck() {
        return !this.check1 || !this.check2 || !!this.nicknameError || ( this.nickname.length < 2 || this.nickname.length > 12);
    }

    async onNicknameChange( word ) {
        const result = await this.$api.testBadWord( word );
        if( result && result.error ) {
            this.nicknameError = this.$t('joinEmailContinue.nicknameError') as string;
        } else {
            this.nicknameError = '';
        }
    }

    // async signup() {
    //
    //     let result = null;
    //     const id = this.id;
    //     const pass = this.pass;
    //
    //     try {
    //         result = await firebase.auth().createUserWithEmailAndPassword( id, pass );
    //         console.log( result );
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    //
    //
    //
    //     if( result.user?.emailVerified ) {
    //         const result2 = await result.user.sendEmailVerification();
    //         console.log(result2);
    //     }
    // }
}
</script>
<style lang="scss" scoped>
.footer {
    background-color: #121212;
}
</style>
