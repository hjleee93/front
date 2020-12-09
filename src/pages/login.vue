<template>
    <q-layout class="text-center">
        <q-page-container>

            <q-page>
<!--                <q-toolbar class="maxWidth">-->
<!--                    &lt;!&ndash;                <q-btn&ndash;&gt;-->
<!--                    &lt;!&ndash;                    flat&ndash;&gt;-->
<!--                    &lt;!&ndash;                    dense&ndash;&gt;-->
<!--                    &lt;!&ndash;                    round&ndash;&gt;-->
<!--                    &lt;!&ndash;                    icon="menu"&ndash;&gt;-->
<!--                    &lt;!&ndash;                    aria-label="Menu"&ndash;&gt;-->
<!--                    &lt;!&ndash;                    @click="$store.commit('leftDrawerOpen', !$store.getters.leftDrawerOpen )"&ndash;&gt;-->
<!--                    &lt;!&ndash;                />&ndash;&gt;-->
<!--                    <div class="row">-->
<!--                        <q-avatar>-->
<!--                            <img src="favicon.ico" style="width: 34px; height: 34px;">-->
<!--                        </q-avatar>-->
<!--                        <q-toolbar-title style="line-height: 38px">-->
<!--                            Zempie-->
<!--                        </q-toolbar-title>-->
<!--                    </div>-->
<!--                </q-toolbar>-->
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
<!--                        <div class="q-mt-xl"></div>-->
                        <q-input square outlined filled
                                 color="" class=""
                                 :error="!!emailError"
                                 :error-message="emailError"
                                 type="email"
                                 v-model="email"
                                 label="이메일"
                                 ref="email"
                                 lazy-rules
                                 @keypress.enter="emailLogin"
                                 :rules="[val=>val.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) || '올바른 이메일을 입력해 주세요.']"
                        >
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>
                        <div class="q-mt-xs"></div>
                        <q-input square outlined filled
                                 color="" class=""
                                 :error="!!passwordError"
                                 :error-message="passwordError"
                                 type="password"
                                 v-model="password"
                                 label="비밀번호"
                                 ref="password"
                                 :onchange="passwordError = ''"
                                 @keypress.enter="emailLogin"
                                 lazy-rules
                                 :rules="[
                                     val=>val.match(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/) || '영문과 최소 1개의 숫자 혹은 특수 문자를 포함한 6~20자리 비밀번호를 입력해주세요.',
                                 ]"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <div  class="text-right">
                            <router-link to="/resetPassword">
                                <span class="cursorPoint non-selectable">비밀번호 찾기</span>
                            </router-link>
                        </div>

                        <div class="q-mt-lg"></div>
                        <q-btn color="positive" class="width100p height50" @click="emailLogin">로그인</q-btn>
                        <div class="q-mt-md non-selectable">
                            처음이신가요? <router-link to="/joinEmail"><span class="text-bold cursorPoint">회원가입</span></router-link>
                        </div>

                        <q-separator class="q-my-lg"></q-separator>

<!--                        <q-btn color="primary" class="width100p height50" @click="facebook">-->
<!--                            <div></div>-->
<!--                            <q-icon name="facebook"></q-icon> <span class="q-ml-md">Facebook 로그인</span>-->
<!--                        </q-btn>-->

                        <div class="q-my-md"></div>

<!--                        <q-btn color="negative" class="width100p height50" @click="google">-->
<!--                            <q-icon name="fab fa-google"></q-icon> <span class="q-ml-md">Google 로그인</span>-->
<!--                        </q-btn>-->

                        <q-btn color="white" class="width100p height50 googleButton"  @click="google">
                            <q-img height="24px" width="24px" src="img/google-logo.png"></q-img>
                            <span class="q-ml-md googleText" >Google 계정으로 로그인</span>
                        </q-btn>

                        <div class="q-my-md"></div>

<!--                        <div class="text-uppercase cursorPoint underline" @click="$router.replace('/')">접속에 문제가 있으신가요?</div>-->

                        <div class="q-my-md"></div>
                    </div>



<!--                    <div>-->
<!--                        <q-input v-model="id"></q-input>-->
<!--                        <q-input type="password" v-model="pass"></q-input>-->

<!--                        <q-btn color="primary" class="q-ma-xl" @click="signup">-->
<!--                            이메일 가입-->
<!--                        </q-btn>-->

<!--                        <q-btn color="primary" class="q-ma-xl" @click="email">-->
<!--                            이메일 로그인-->
<!--                        </q-btn>-->
<!--                    </div>-->


<!--                    <div>-->
<!--                        <q-btn color="primary" class="q-mt-xl" @click="google">-->
<!--                            구글 로그인-->
<!--                        </q-btn>-->
<!--                    </div>-->

<!--                    <div>-->
<!--                        <q-btn color="primary" class="q-mt-xl" @click="facebook">-->
<!--                            페이스북-->
<!--                        </q-btn>-->
<!--                    </div>-->

<!--                    <div>-->
<!--                        <q-btn color="primary" class="q-mt-xl" @click="logout">-->
<!--                            로그아웃-->
<!--                        </q-btn>-->
<!--                    </div>-->
                </div>

            </q-page>
        </q-page-container>
        <q-footer class="footer q-py-lg text-grey-5">
            Copyright 2020. zempie. All rights reserved.
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';
import firebase from "firebase";
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";
import LoginManager from "src/scripts/login";

@Component
export default class Login extends Vue {

    @Prop() private redirect! : string;

    private email : string = '';
    private password : string = '';

    private emailError : string = '';
    private passwordError : string  = '';


    async mounted() {
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                // if(this.redirect) {
                //     window.location.href = this.redirect;
                // }
                // else {
                //     await this.$router.replace('/');
                // }


                await this.$router.replace('/');
                break;
        }

        if( this.redirect ) {
            // console.log(this.redirect);
            this.$store.commit('redirectUrl', this.redirect);
        }
    }


    @Watch( 'email' )
    watchEmail() {
        if( this.email ) {
            this.emailError = '';
        }
    }

    @Watch( 'password' )
    watchPassword() {
        if( this.password ) {
            this.passwordError = '';
        }
    }

    async emailLogin() {

        if( !this.email ) {
            this.emailError = '이메일을 입력해주세요.';
            // alert('이메일을 입력해주세요.');
            return;
        }

        if( !this.password ) {
            // alert('비밀번호를 입력해주세요.');
            this.passwordError = '비밀번호를 입력해주세요.'
            return;
        }

        if( !this.emailError && !this.passwordError ) {

            try {
                const result = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                // console.log(result);
                // await this.$router.replace('/');

                if(result.user) {
                    const token = await firebase.auth().currentUser.getIdToken();
                    this.$store.commit('idToken', token);

                    const result = await Vue.$api.user();
                    if( result.error && result.error === '잘 못 된 유저 아이디입니다' ) {
                        alert( '진행중인 회원가입이 절차가 남아 있습니다. 이어서 진행 해주세요.' );
                        this.$store.commit('loginState', LoginState.no_user );
                        await this.$router.replace('/joinEmailContinue');
                        return;
                    }

                    const {user} = result;
                    this.$store.commit('user', user);
                    await LoginManager.login();
                    // this.$store.commit('loginState', LoginState.login );

                    if( this.$store.getters.redirectUrl ) {
                        window.location.href = this.$store.getters.redirectUrl;
                    }
                    else {
                        await this.$router.replace('/');
                    }
                }

            }
            catch (e) {
                // console.log(e);

                const code = e.code;
                // console.log(code);
                if( code ) {
                    switch (code) {
                        case 'auth/wrong-password' :
                            alert('잘못된 비밀번호 입니다. 다시 입력하세요.');
                            // this.passwordError = '잘못된 비밀번호 입니다. 다시 입력하세요.'
                            break;
                        case 'auth/user-not-found' :
                            alert('등록된 이메일이 아닙니다. 회원가입 후 이용해 주세요.');
                            break;
                    }
                }
            }
        }
    }

    async google() {
        await this.$store.dispatch('loginState');

        const provider = new firebase.auth.GoogleAuthProvider();
        const result: any = await firebase.auth().signInWithPopup(provider);

        if( result.user ) {
            const token = await firebase.auth().currentUser.getIdToken();
            this.$store.commit('idToken', token);

            const result = await Vue.$api.user();
            if( result.error && result.error === '잘 못 된 유저 아이디입니다' ) {
                alert( '회원가입 후 이용하세요.' );
                this.$store.commit('loginState', LoginState.no_user );
                await this.$router.replace('/join');
                return;
            }

            const { user } = result;
            this.$store.commit('user', user);
            await LoginManager.login();
            // this.$store.commit('loginState', LoginState.login );
            // await this.$router.replace('/');
            if( this.$store.getters.redirectUrl ) {
                window.location.href = this.$store.getters.redirectUrl;
            }
            else {
                await this.$router.replace('/');
            }
        }

    }

    async facebook() {
        await this.$store.dispatch('loginState');

        const provider = new firebase.auth.FacebookAuthProvider();
        const result: any = await firebase.auth().signInWithPopup(provider);

        if( result.user ) {
            const token = await firebase.auth().currentUser.getIdToken();
            this.$store.commit('idToken', token);

            const result = await Vue.$api.user();
            if( result.error && result.error === '잘 못 된 유저 아이디입니다' ) {
                alert( '회원가입 후 이용하세요.' );
                this.$store.commit('loginState', LoginState.no_user );
                await this.$router.replace('/join');
                return;
            }

            const { user } = result;
            this.$store.commit('user', user);
            await LoginManager.login();
            // this.$store.commit('loginState', LoginState.login );
            // await this.$router.replace('/');
            if( this.$store.getters.redirectUrl ) {
                window.location.href = this.$store.getters.redirectUrl;
            }
            else {
                await this.$router.replace('/');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    a {
        color: inherit;
        text-decoration: none;
    }

    .footer {
        //background-color: ;
        background-color: #121212;
    }

    .googleButton {
        .googleText {
            color: black !important;
            font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            text-transform: none;
        }
    }
</style>
