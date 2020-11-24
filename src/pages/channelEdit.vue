<template>
    <q-page>
        <div class="maxWidth">
            <div class="">

                <div class="q-pt-lg"></div>

                <div class="text-h6">프로필 사진</div>
                <div class="text-grey-5 q-mb-xs">
                    프로필 사진은 동영상 및 댓글 옆과 같이 YouTube에서 채널을 나타내는 위치에 표시됩니다. 여기에서 변경하면 다른 Zempie 서비스에도 반영됩니다.
                </div>
                <div class="contentBox">
                    <div>
                        <div class="row no-wrap">
                            <q-avatar size="100px">
                                <img :src="pictureUrl || $store.getters.user && $store.getters.user.picture || 'img/icon_pic_empty_01.png'">
                            </q-avatar>
                            <div class="q-ml-lg self-center">
                                <div class="row q-mb-sm">
                                    <q-btn :loading="loading" color="grey-9 q-mb-sm q-mr-md" @click="fileLoader.addFile()">프로필 사진 추가</q-btn>
                                    <q-btn :loading="loading" color="grey-9 q-mb-sm" :disable="!pictureUrl" @click="reset()">
                                        <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                                    </q-btn>
                                </div>
                                <div>98x98픽셀 이상, 4MB 이하의 사진이 권장됩니다. PNG 또는 GIF(애니메이션 GIF 제외) 파일을 사용하세요.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="q-my-md"></div>

                <div class="text-h6">베너 이미지</div>
                <div class="text-grey-5 q-mb-xs">
                    이 이미지가 채널 상단에 표시됩니다.
                </div>
                <div class="contentBox">
                    <div>
                        <q-img :src="bannerUrl || $store.getters.user && $store.getters.user.profile.url_banner || ''">

                        </q-img>
                    </div>
                    <div class="q-mt-lg">
                        <div>파일 형식 : JPEG,PNG (1707*282 픽셀,최대 15MB 권장)</div>
                        <q-btn :loading="loading" color="grey-9 q-my-sm q-mr-md" @click="fileLoader2.addFile()">이미지 업로드</q-btn>
                        <q-btn :loading="loading" color="grey-9" :disable="!bannerUrl" @click="reset2()">
                            <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                        </q-btn>
                    </div>
                </div>

                <div class="q-my-md"></div>

                <div class="text-h6">정보</div>
                <div class="contentBox">

                    <content-item label="채널명" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input class="width100p maxWidth400px" v-model="channelName" filled>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    나와 내 콘텐츠를 잘 나타내는 채널 이름을 선택하세요. 변경한 채널 이름이 Zempie 계정에도 표시됩니다.
                                </div>
                            </div>
                        </template>
                    </content-item>

                    <div class="q-mt-sm"></div>

                    <content-item label="상태 메세지" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input class="width100p maxWidth400px" v-model="stateMsg" filled>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    채널에 대해 설명하세요. 이설명은 채널의 상단에 표시됩니다.
                                </div>
                            </div>
                        </template>
                    </content-item>

                </div>


                <div class="q-my-md"></div>

                <div class="text-h6">채널 URL</div>
                <div class="contentBox">

                    <content-item label="채널 ID" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input class="width100p maxWidth400px" filled v-model="channelId">
                                    <template v-slot:append>
                                        <q-btn :loading="loading" v-if="!confirmChannelId" color="grey-9" @click="verifyChannelId">
                                            확인 요청
                                        </q-btn>
                                        <div v-else class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                            확인 완료
                                        </div>
                                    </template>
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    ID를 만들어 자신만의 접속 URL을 만들어 보세요.
                                </div>
                            </div>
                        </template>
                    </content-item>

                    <div class="q-mt-sm"></div>

                    <content-item label="채널 URL" label-style="q-mt-md">
                        <template>
                            <div class="width100p">
                                <q-input class="width100p maxWidth400px" readonly filled v-model="channelUrl">
                                </q-input>
                                <div class="q-my-sm fontSize12 text-grey-5">
                                    채널의 표준 웹 주소입니다. 여기에는 URL 끝에 있는 숫자와 문자 조합인 고유 채널 ID가 포함되어 있습니다.
                                </div>
                            </div>
                        </template>
                    </content-item>
                </div>


                <div class="q-my-md"></div>

                <div class="text-h6">링크</div>
                <div class="q-my-sm text-grey-5">
                    시청자와 공유할 사이트의 링크를 추가하세요.
                </div>
                <div class="contentBox">
                    <div>
                        <q-btn :loading="loading" color="grey-9" class="">링크 추가</q-btn>
                    </div>
                </div>

                <div class="text-right q-mt-lg q-mr-md">
                    <q-btn :loading="loading" color="grey-9" @click="save">저장</q-btn>
                </div>
            </div>


        </div>
        <div style="padding-top: 100px"></div>
        <footer class="footer text-center q-py-lg text-grey-5">
            Copy right 2020. zempie. All rights reserved.
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
    private channelUrl : string = 'https://www.zempie.com/channel/hangil6061';
    private confirmChannelId : boolean = true;

    private bannerUrl : string = '';
    private fileLoader2 : FileLoader = new FileLoader();
    private file2 : File = undefined;


    private channelName : string = '';
    private stateMsg : string = '';



    private loading : boolean = false;

    async mounted() {
        this.loading = true;


        await this.$store.dispatch('loginState');
        this.channelId = this.$store.getters.user.channel_id;
        this.channelUrl = `${process.env.VUE_APP_ZEMPIE_URL}${this.channelId}`;

        this.channelName = this.$store.getters.user.name;
        this.stateMsg = this.$store.getters.user.profile.state_msg;

        this.loading = false;

        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
        this.fileLoader2.on( 'onLoadFile', this.onLoadFile2 );
    }


    onLoadFile( data, file ) {

        if( file.size <= mbToByte( 4 ) ) {
            this.pictureUrl = data;
            this.file = file;
        }
        else {
            alert( '파일 사이즈가 너무 큽니다.' )
        }
    }

    onLoadFile2( data, file ) {

        if( file.size <= mbToByte( 15 ) ) {
            this.bannerUrl = data;
            this.file2 = file;
        }
        else {
            alert( '파일 사이즈가 너무 큽니다.' )
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

        const name = this.channelName !== this.$store.getters.user.name ? this.channelName : undefined;
        const picture = this.file || undefined;
        const state_msg = this.stateMsg !== this.$store.getters.user.profile.state_msg ? this.stateMsg : undefined;
        const channel_id = this.channelId !== this.$store.getters.user.channel_idg ? this.channelId : undefined;
        const banner = this.file2 || undefined;

        if( name || picture || state_msg || channel_id ) {
            const result = await this.$api.updateUser( name, state_msg, picture, channel_id );

            if( result.error ) {
                alert( result.error );
            }
            else {
                this.$store.commit('userInfoUpdate', {
                    name,
                    picture : this.pictureUrl,
                    state_msg,
                    channel_id,
                });
            }
        }

        if( banner ) {
            const result = await this.$api.updateBanner( banner );
            if( result.error ) {
                alert( result.error );
            }
            else {
                this.$store.commit('userInfoUpdate', {
                    url_banner : this.bannerUrl
                });
            }
        }

        this.loading = false;
    }

    async verifyChannelId() {
        this.loading = true;

        const result = await this.$api.verifyChannelId( this.channelId );
        if( result.error ) {
            alert( '사용할수 없는 아이디 입니다.' );
        }
        else {
            this.confirmChannelId = true;
            this.channelUrl = `${process.env.VUE_APP_ZEMPIE_URL}${this.channelId}`;
        }

        this.loading = false;
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
