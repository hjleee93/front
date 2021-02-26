<template>
    <q-page>
        <div class="maxWidth q-pa-md">
            <div class="">

                <div class="q-pt-lg"></div>

                <div class="text-h6">{{ $t('channelEdit.profileImage.label') }}</div>
                <div class="text-grey-5 q-mb-xs">
                    {{ $t('channelEdit.profileImage.description') }}
                </div>
                <div class="contentBox">
                    <div>
                        <div class="row no-wrap">
                            <q-avatar size="100px">
                                <q-img :src="pictureUrl || $store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'"></q-img>
                            </q-avatar>
                            <div class="q-ml-lg self-center">
                                <div class="row q-mb-sm">
                                    <q-btn :loading="loading" color="grey-9 q-mb-sm q-mr-md" @click="fileLoader.addFile()">{{ $t('channelEdit.profileImage.btn') }}</q-btn>
                                    <q-btn :loading="loading" color="grey-9 q-mb-sm" :disable="!pictureUrl" @click="reset()">
                                        <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                                    </q-btn>
                                </div>
                                <div>{{ $t('channelEdit.profileImage.hint') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-my-md"></div>

                <div class="text-h6">{{ $t('channelEdit.bannerImage.label') }}</div>
                <div class="text-grey-5 q-mb-xs">
                    {{ $t('channelEdit.bannerImage.description') }}
                </div>
                <div class="contentBox">
                    <div>
                        <q-img :src="bannerUrl || $store.getters.user && $store.getters.user.profile.url_banner || ''">

                        </q-img>
                    </div>
                    <div class="q-mt-lg">
                        <div>{{ $t('channelEdit.bannerImage.hint') }}</div>
                        <q-btn :loading="loading" color="grey-9 q-my-sm q-mr-md" @click="fileLoader2.addFile()">{{ $t('channelEdit.bannerImage.btn') }}</q-btn>
                        <q-btn :loading="loading" color="grey-9" :disable="!bannerUrl" @click="reset2()">
                            <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                        </q-btn>
                    </div>
                </div>

                <div class="q-my-md"></div>

                <div class="text-h6">{{ $t('channelEdit.channel.infoLabel') }}</div>
                <div class="contentBox">

                    <content-item :label="$t('channelEdit.channel.name.label')" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input maxlength="50" class="width100p maxWidth400px" v-model="channelName" filled>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    {{ $t('channelEdit.channel.name.description') }}
                                </div>
                            </div>
                        </template>
                    </content-item>

                    <div class="q-mt-sm"></div>

                    <content-item :label="$t('channelEdit.channel.stateMessage.label')" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input maxlength="100" class="width100p maxWidth400px" v-model="stateMsg" filled>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    {{ $t('channelEdit.channel.stateMessage.description') }}
                                </div>
                            </div>
                        </template>
                    </content-item>

                    <div class="q-mt-sm"></div>

                    <content-item :label="$t('channelEdit.channel.description.label')" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input maxlength="500" type="textarea" class="width100p maxWidth400px"  v-model="description" filled>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    {{ $t('channelEdit.channel.description.description') }}
                                </div>
                            </div>
                        </template>
                    </content-item>

                </div>


                <div class="q-my-md"></div>

                <div class="text-h6">{{ $t('channelEdit.channel.url.label1') }}</div>
                <div class="contentBox">

                    <content-item :label="$t('channelEdit.channel.id.label')" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input maxlength="20" class="width100p maxWidth400px" filled v-model="channelId">
                                    <template v-slot:append>
                                        <q-btn :loading="loading" v-if="!confirmChannelId" color="grey-9" @click="verifyChannelId">
                                            {{ $t('channelEdit.channel.id.verifyRequest') }}
                                        </q-btn>
                                        <div v-else class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                            {{ $t('channelEdit.channel.id.verifySuccess') }}
                                        </div>
                                    </template>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    {{ $t('channelEdit.channel.id.description') }}
                                </div>
                            </div>
                        </template>
                    </content-item>

                    <div class="q-mt-sm"></div>

                    <content-item :label="$t('channelEdit.channel.url.label2')" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input class="width100p maxWidth400px" readonly filled v-model="channelUrl">
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    {{ $t('channelEdit.channel.url.description') }}
                                </div>
                            </div>
                        </template>
                    </content-item>
                </div>


<!--                <div class="q-my-md"></div>-->

<!--                <div class="text-h6">링크</div>-->
<!--                <div class="q-my-sm text-grey-5">-->
<!--                    공유할 사이트의 링크를 추가하세요.-->
<!--                </div>-->
<!--                <div class="contentBox">-->
<!--                    <div>-->
<!--                        <q-btn :loading="loading" color="grey-9" class="">링크 추가</q-btn>-->
<!--                    </div>-->
<!--                </div>-->

                <div class="text-right q-mt-lg q-mr-md">
                    <q-btn :loading="loading" color="grey-9" @click="save">{{ $t('channelEdit.save.btn') }}</q-btn>
                </div>
            </div>


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
import ContentItem from "components/common/contentItem.vue";
import {FileLoader, mbToByte} from "src/scripts/fileLoader";

@Component({
    components: {ContentItem, ProfilePrivateTab, ProfileTab}
})
export default class ChannelEdit extends Vue {

    private pictureUrl : string = '';
    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;

    private channelId : string = '';
    private channelUrl : string = '';
    private confirmChannelId : boolean = true;

    private bannerUrl : string = '';
    private fileLoader2 : FileLoader = new FileLoader();
    private file2 : File = undefined;


    private channelName : string = '';
    private stateMsg : string = '';
    private description : string = '';



    private loading : boolean = false;

    async mounted() {
        document.title = this.$t('pageTitle.channelEdit') as string;
        this.$store.commit('navTab', 'ChannelEdit');
        this.loading = true;

        //const regExp = /[{}[]/?.,;:|)*~`!^+<>@#$%&\=('"]/gi;
        await this.$store.dispatch('loginState');
        this.channelId = this.$store.getters.user.channel_id;
        this.channelUrl = `${process.env.VUE_APP_ZEMPIE_URL}channel/${decodeURI( this.channelId )}`;

        this.channelName = this.$store.getters.user.name;
        this.stateMsg = this.$store.getters.user.profile.state_msg;

        this.loading = false;

        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
        this.fileLoader2.on( 'onLoadFile', this.onLoadFile2 );
    }


    onLoadFile( data, file ) {

        if( file.size <= mbToByte( 1 ) ) {
            this.pictureUrl = data;
            this.file = file;
        }
        else {
            alert( this.$t('channelEdit.fileSizeError') )
        }
    }

    onLoadFile2( data, file ) {

        if( file.size <= mbToByte( 15 ) ) {
            this.bannerUrl = data;
            this.file2 = file;
        }
        else {
            alert( this.$t('channelEdit.fileSizeError') )
        }
    }

    reset() {
        this.pictureUrl = '';
        this.file = null;
    }

    reset2() {
        this.bannerUrl = '';
        this.file2 = null;
    }

    @Watch('channelId')
    updatedChannelId() {
        if( this.$store.getters.user.channel_id === this.channelId ) {
            this.confirmChannelId = true;
        }
        else {
            this.confirmChannelId = false;
        }
    }

    async save() {

        this.loading = true;
        this.$store.commit('ajaxBar', true);

        const name = this.channelName !== this.$store.getters.user.name ? this.channelName : undefined;
        const picture = this.file || undefined;
        const state_msg = this.stateMsg !== this.$store.getters.user.profile.state_msg ? this.stateMsg : undefined;
        const description = this.description !== this.$store.getters.user.profile.description ? this.description : undefined;
        const channel_id = this.channelId !== this.$store.getters.user.channel_idg ? this.channelId : undefined;
        const banner = this.file2 || undefined;
        let isError = false;

        if( name || picture || state_msg || channel_id || description) {
            const result = await this.$api.updateUser( name, state_msg, picture, channel_id, description );

            if( !result || result.error ) {
                result && result.error && alert( result.error.message );
                isError = true;
            }
            else {
                this.$store.commit('userInfoUpdate', {
                    name,
                    picture : this.pictureUrl,
                    state_msg,
                    channel_id,
                    description
                });
            }
        }

        if( !isError && banner ) {
            const result = await this.$api.updateBanner( banner );
            if( !result || result.error ) {
                result && result.error && alert( result.error.message );
                isError = true;
            }
            else {
                this.$store.commit('userInfoUpdate', {
                    url_banner : this.bannerUrl
                });
            }
        }

        this.loading = false;
        this.$store.commit('ajaxBar', false);

        if( !isError ) {
            this.$q.notify({
                message : this.$t('channelEdit.save.success') as string,
                position : 'top',
                color : 'primary',
                timeout: 2000
            });
        }
        else {
            this.$q.notify({
                message : this.$t('channelEdit.save.fail') as string,
                position : 'top',
                color : 'negative',
                timeout: 2000
            });
        }
    }

    async verifyChannelId() {

        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
        if ( regExp.test(this.channelId) ) {
            alert( this.$t('channelEdit.channel.id.specialCharacterError') );
            return;
        }
        else if ( this.channelId.search(/\s/) !== -1 ) {
            alert( this.$t('channelEdit.channel.id.blankError') );
            return;
        }


        this.loading = true;
        this.$store.commit('ajaxBar', true);

        const result = await this.$api.verifyChannelId( this.channelId );
        if( result.error ) {
            this.$q.notify({
                message : this.$t('channelEdit.channel.id.fail') as string,
                position : 'top',
                color : 'primary',
                timeout: 2000
            });
        }
        else {
            this.confirmChannelId = true;
            this.channelUrl = `${process.env.VUE_APP_ZEMPIE_URL}${this.channelId}`;
            this.$q.notify({
                message : this.$t('channelEdit.channel.id.success') as string,
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


//.infoInput {
//    height: 48px;
//    width: 100%;
//    max-width: 400px;
//}
//
//
//.infoButton {
//    height: 40px;
//    //line-height: 56px;
//}



.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    //background-color: #292929;
}
</style>
