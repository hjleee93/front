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
                                 :label="$t('resetPassword.emailInput.label')"
                                 ref="email"
                                 lazy-rules
                                 :rules="[val=>val.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) || $t('resetPassword.emailInput.rule')]"
                        >
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>
                        <div class="q-mt-xs"></div>



                        <div class="q-mt-lg"></div>
                        <q-btn color="positive" :loading="loading" class="width100p height50" @click="reset">{{ $t('resetPassword.btnLabel') }}</q-btn>
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
        document.title = this.$t('pageTitle.resetPassword') as string;

        this.$store.commit('ajaxBar', true);
        this.loading = true;
        const result = await firebase.auth().sendPasswordResetEmail(this.email);
        // console.log(result);
        alert(this.$t('resetPassword.checkAlertMessage'));
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
