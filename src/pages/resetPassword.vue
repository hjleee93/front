<template>
    <q-layout class="text-center">
        <q-page-container>

            <q-page>
                <div>
                    <div class="row flex-center">
                        <q-avatar size="60px" class="q-my-lg">
                            <img src="favicon.ico">
                        </q-avatar>
                        <div class="q-ml-sm" style="font-size: 40px;">
                            Zempie
                        </div>
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
                        >
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>
                        <div class="q-mt-xs"></div>



                        <div class="q-mt-lg"></div>
                        <q-btn color="positive" :loading="loading" class="width100p height50" @click="reset">비밀번호 초기화</q-btn>
                        <div class="q-my-md"></div>
                    </div>

                </div>

            </q-page>
        </q-page-container>
        <q-footer class="footer q-py-lg bg-dark text-grey-5">
            Copyright 2020. zempie. All rights reserved.
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import firebase from "firebase";
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";

@Component
export default class ResetPassword extends Vue {

    private email : string = '';
    private emailError : string = '';

    private loading : boolean = false;


    async mounted() {
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                await this.$router.replace('/');
                break;
        }
    }

    async reset() {

        this.$store.commit('ajaxBar', true);
        this.loading = true;
        const result = await firebase.auth().sendPasswordResetEmail(this.email);
        // console.log(result);
        alert('재설정 메일을 보냈습니다. 메일을 확인해 주세요.');
        await this.$router.replace('/login');
        this.loading = false;

        this.$store.commit('ajaxBar', false);
    }




}
</script>
<style lang="scss" scoped>
.footer {
    //background-color: #292929;
}
</style>
