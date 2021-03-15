<template>
    <div class="">
        <div class="q-mt-lg"></div>

        <div class="text-h6">{{ $t('profileTab.profileImage.label') }}</div>
        <div class="contentBox row no-wrap">
            <q-avatar size="100px">
                <q-img :src="url || $store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'"></q-img>
            </q-avatar>
            <div class="q-ml-lg self-center">
                <div class="row q-mb-sm">
                    <q-btn color="grey-9 q-mb-sm q-mr-md" @click="fileLoader.addFile()"  :loading="loading">{{ $t('profileTab.profileImage.btn') }}</q-btn>
                    <q-btn color="grey-9 q-mb-sm" :disable="!url" @click="reset()"  :loading="loading">
                        <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                    </q-btn>
                </div>
                <div>{{ $t('profileTab.profileImage.description') }}</div>
            </div>
        </div>

        <div class="q-my-md"></div>

        <div class="text-h6">{{ $t('profileTab.info.label') }}</div>
        <div class="contentBox">
            <content-item :label="$t('profileTab.info.emailLabel')" label-style="q-mt-md">
                <template>
                    <q-input class="width100p maxWidth400px" maxlength="50" filled :readonly="!emailNull" v-model="email">
                        <template v-slot:append>
                            <div v-if="emailVerified" class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                {{ $t('profileTab.info.verifySuccess') }}
                            </div>
                            <q-btn v-else color="grey-9"  @click="emailVerify" :loading="loading">
                                {{ $t('profileTab.info.verifyRquest') }}
                            </q-btn>
                        </template>
                    </q-input>
                </template>
            </content-item>
            <div class="q-mt-sm"></div>
            <content-item :label="$t('profileTab.info.nicknameLabel')" label-style="q-mt-md">
                <template>
                    <q-input class="width100p maxWidth400px" maxlength="12" filled v-model="nickname">
                    </q-input>
                </template>
            </content-item>
        </div>

        <div class="text-right q-mt-lg q-mr-md">
            <q-btn color="grey-9" @click="save" :loading="loading">{{ $t('profileTab.saveBtn') }}</q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {FileLoader, mbToByte} from "src/scripts/fileLoader";
import ContentItem from "components/common/contentItem.vue";
import firebase from "firebase/app";

@Component({
    components: {ContentItem}
})
export default class ProfileTab extends Vue {
    private url : string = '';
    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;

    private emailNull : boolean = false;

    private email : string = '';
    private nickname : string = '';

    private emailVerified : boolean = false;

    private loading : boolean = false;

    async mounted() {
        this.loading = true;
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );

        await this.$store.dispatch('loginState');
        const currentUser = firebase.auth().currentUser;
        this.email = currentUser.email;
        this.emailVerified = this.$store.getters.user.email_verified;
        this.emailNull = !this.email;

        this.nickname = this.$store.getters.user.name;
        this.loading = false;
    }

    onLoadFile( data, file ) {

        if( file.size <= mbToByte( 1 ) ) {
            this.url = data;
            this.file = file;
            this.$emit('@file', this.file);
        }
        else {
            alert( this.$t('profileTab.fileSizeError') )
        }
    }

    async reset() {
        this.url = '';
        this.file = undefined;
        this.$emit('@file', undefined);
    }

    async emailVerify() {

        if( this.emailNull && this.email ) {

        }


        try {
            const currentUser = firebase.auth().currentUser;
            const result = await currentUser.sendEmailVerification();
            // console.log(result);
            alert( this.$t('profileTab.emailCheck') );
        }
        catch (e) {

            const code = e.code;

            switch (code) {
                case 'auth/too-many-requests' :
                    alert( this.$t('profileTab.manyRequest') )
                    break;
            }

        }


    }

    async save() {
        this.$store.commit('ajaxBar', true);
        this.loading = true;
        const result = await this.$api.updateUser( this.nickname, undefined, this.file, undefined, undefined );


        if( !result || result.error ) {
            //todo 닉네임 필터 에러 처리
            // if( result && result.error && result.error.message === '사용할 수 없는 단어' ) {
            if( result?.error?.code === 40101 ) {
                this.$q.notify({
                    message : this.$t('profileTab.nicknameError') as string,
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
            }
            else {
                this.$q.notify({
                    message : this.$t('profileTab.fail') as string,
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
            }


            console.error( result && result.error || 'error' );
        }
        else {

            this.$store.commit('userInfoUpdate', {
                name : this.nickname,
                picture : this.url
            });

            this.$q.notify({
                message : this.$t('profileTab.success') as string,
                position : 'top',
                color : 'primary',
                timeout: 2000
            });

        }

        this.loading = false;
        this.$store.commit('ajaxBar', false);

    }

}
</script>
<style lang="scss" scoped>

.lineHeight56 {
    line-height: 56px;
}


</style>
