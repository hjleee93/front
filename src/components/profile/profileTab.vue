<template>
    <div class="">
        <div class="q-mt-lg"></div>

        <div class="text-h6">프로필 사진</div>
        <div class="contentBox row no-wrap">
            <q-avatar size="100px">
                <img :src="url || 'https://yt3.ggpht.com/a-/AOh14GgyayNSUkUJdTdkfSMlxeiG8G0ayTRyb_JHRxvOOg=s88-c-k-c0x00ffffff-no-rj'">
            </q-avatar>
            <div class="q-ml-lg self-center">
                <div class="row q-mb-sm">
                    <q-btn color="grey-9 q-mb-sm q-mr-md" @click="fileLoader.addFile()">프로필 사진 추가</q-btn>
                    <q-btn color="grey-9 q-mb-sm" :disable="!url" @click="reset()">
                        <q-icon name="far fa-trash-alt" style="font-size: 16px"></q-icon>
                    </q-btn>
                </div>
                <div>98x98픽셀 이상, 4MB 이하의 사진이 권장됩니다. PNG 또는 GIF(애니메이션 GIF 제외) 파일을 사용하세요. 사진이 YouTube 커뮤니티 가이드를 준수해야 합니다.</div>
            </div>
        </div>

        <div class="q-my-md"></div>

        <div class="text-h6">정보</div>
        <div class="contentBox">
            <content-item label="이메일" label-style="q-mt-md">
                <template>
                    <q-input class="width100p maxWidth400px" filled readonly v-model="email">
                        <template v-slot:append>
                            <!--                        <q-btn color="grey-9">-->
                            <!--                            인증 요청-->
                            <!--                        </q-btn>-->
                            <div class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                인증 완료
                            </div>
                        </template>
                    </q-input>
                </template>
            </content-item>
            <div class="q-mt-sm"></div>
            <content-item label="닉네임" label-style="q-mt-md">
                <template>
                    <q-input class="width100p maxWidth400px" filled v-model="nickname">
                    </q-input>
                </template>
            </content-item>
        </div>

        <div class="text-right q-mt-lg q-mr-md">
            <q-btn color="grey-9">저장</q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {FileLoader, mbToByte} from "src/scripts/fileLoader";
import ContentItem from "components/common/contentItem.vue";
@Component({
    components: {ContentItem}
})
export default class ProfileTab extends Vue {
    private url : string = '';
    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;

    private email : string = 'fr@fromthered.com';
    private nickname : string = '';

    mounted() {
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
    }

    onLoadFile( data, file ) {

        if( file.size <= mbToByte( 4 ) ) {
            this.url = data;
            this.file = file;
            this.$emit('@file', this.file);
        }
        else {
            alert( '파일 사이즈가 너무 큽니다.' )
        }
    }

    reset() {
        this.url = '';
        this.file = undefined;
        this.$emit('@file', undefined);
    }
}
</script>
<style lang="scss" scoped>

.lineHeight56 {
    line-height: 56px;
}


</style>
