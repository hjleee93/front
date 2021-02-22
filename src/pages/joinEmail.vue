<template>
    <q-layout class="text-center">
        <q-page-container>
            <q-page>

                <div>
                    <div class="row flex-center">
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
                                 :rules="[val=>val.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) || '올바른 이메일을 입력해 주세요.']"
                        ><!--한국어-->
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>

<!--                            <template v-slot:append>-->
<!--                                <q-btn color="grey-9">-->
<!--                                    중복확인-->
<!--                                </q-btn>-->
<!--                            </template>-->
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
                                 lazy-rules
                                 :rules="[
                                     val=>val.match(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/) || '영문과 최소 1개의 숫자 혹은 특수 문자를 포함한 6~20자리 비밀번호를 입력해주세요.',
                                 ]"
                        ><!--한국어-->
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>
                        <div class="q-mt-xs"></div>
                        <q-input square outlined filled
                                 color="" class=""
                                 :error="!!passwordError2"
                                 :error-message="passwordError2"
                                 type="password"
                                 v-model="password2"
                                 label="비밀번호 확인"
                                 ref="passwordError2"
                                 :onchange="passwordError = ''"
                                 lazy-rules
                                 :rules="[
                                     val=>val === password || '비밀번호가 다릅니다.',
                                 ]"
                        ><!--한국어-->
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <div class="q-mt-xs"></div>
                        <q-input square outlined filled
                                 color="" class=""
                                 :error="!!nicknameError"
                                 :error-message="nicknameError"
                                 v-model="nickname"
                                 label="이름"
                                 ref="nickname"
                                 lazy-rules
                                 :rules="[
                                     val=>val.length >= 2 && val.length <= 12 || '2글자 이상 12글자 이하로 입력 해주세요.',
                                 ]"
                        ><!--한국어-->
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
                            <q-checkbox color="grey-9" class="non-selectable" v-model="check1" label="이용약관 동의" /><!--한국어-->
                            <div class="absolute-right">
                                <q-btn color="grey-9" @click="show1 = !show1">전체보기</q-btn><!--한국어-->
                            </div>
                        </div>

                        <q-slide-transition>
                            <div v-show="show1" class="height150">
                                <tos></tos>
                            </div>
                        </q-slide-transition>


                        <div class="q-my-md"></div>

                        <div class="row relative-position">
                            <q-checkbox color="grey-9" class="non-selectable" v-model="check2" label="개인정보취급방침 동의" /><!--한국어-->
                            <div class="absolute-right">
                                <q-btn color="grey-9" @click="show2 = !show2">전체보기</q-btn><!--한국어-->
                            </div>
                        </div>

                        <q-slide-transition>
                            <div v-show="show2" class="height150">
                                <tos2></tos2>
                            </div>
                        </q-slide-transition>



                        <div class="q-my-xl"></div>

                        <q-btn color="positive" :loading="loading" :disable="!check1 || !check2" class="width100p height50" @click="emailLogin">회원가입</q-btn><!--한국어-->



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
import firebase from "firebase";
import {LoginState} from "src/store/modules/user";
import Tos from "components/join/tos.vue";
import Tos2 from "components/join/tos2.vue";
import Login from "pages/login.vue";
import LoginManager from "src/scripts/login";
@Component({
    components: {Tos2, Tos}
})
export default class JoinEmail extends Vue {

    private email : string = '';
    private password : string = '';
    private password2 : string = '';
    private nickname : string = '';

    private emailError : string = '';
    private passwordError : string  = '';
    private passwordError2 : string  = '';
    private nicknameError : string  = '';

    private check1 : boolean = false;
    private check2 : boolean = false;

    private show1 : boolean = false;
    private show2 : boolean = false;

    private loading : boolean = false;


    async mounted() {
        document.title = this.$i18n.t('pageJoinEmailTitle');
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                await this.$router.replace('/');
                break;
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
            this.emailError = '이메일을 입력해주세요.'; /*한국어*/
            return;
        }

        if( !this.password ) {
            // alert('비밀번호를 입력해주세요.');
            this.passwordError = '비밀번호를 입력해주세요.' /*한국어*/
            return;
        }

        if( !this.emailError && !this.passwordError ) {

            this.loading = true;

            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);

                const currentUser = firebase.auth().currentUser;
                const idToken = await currentUser.getIdToken();
                this.$store.commit('idToken', idToken);


                const result2 = await this.$api.signUp( this.nickname );

                if( !result2 || result2.error ) {

                    if( result2 && result2.error === '사용할 수 없는 단어' ) { /*한국어*/
                        //todo 닉네임 필터 에러 처리
                        alert( '사용할 수 없는 이름입니다.' ); /*한국어*/
                    }
                    else {
                        console.error( result2 && result2.error || 'error' );
                        result2 && result2.error && alert( result2.error );
                    }
                }
                else {
                    const {user} = result2;
                    this.$store.commit('user', user);
                    await LoginManager.login();

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
                            alert('잘못된 비밀번호 입니다. 다시 입력하세요.'); /*한국어*/
                            // this.passwordError = '잘못된 비밀번호 입니다. 다시 입력하세요.'
                            break;
                        case 'auth/user-not-found' :
                            alert('등록된 이메일이 아닙니다. 회원가입 후 이용해 주세요.'); /*한국어*/
                            break;
                        case 'auth/email-already-in-use':
                            alert('이미 가입된 이메일 입니다.'); /*한국어*/
                            break;
                    }
                }
            }

            this.loading = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.footer {
    background-color: #121212;
}
</style>
