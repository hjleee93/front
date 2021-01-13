<template>
    <q-dialog v-model="visible" persistent>
        <q-card class="reportPopup">
            <q-card-section>
                <div>
                    게임 신고하기
                </div>
            </q-card-section>
            <q-separator inset color="gray" size="1px"></q-separator>
            <q-card-section>
                <div class="box">
                    <div class="text-h7">카테고리</div>
                    <template v-for="checkItem in checkList">
                        <div class="checkItem">
                            <q-checkbox v-model="checkItem.checked" :label="checkItem.text" />
                        </div>
                    </template>


                    <div class="desLabel">게임을 신고하는 이유를 간단히 설명해 주세요.</div>
                    <q-input class="desInput" type="textarea" outlined dense />
                    <div class="q-mt-md">첨부 파일</div>
                    <input type="file" accept="image/png, image/jpg" />
                </div>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="취소" @click="$emit('@close')" />
                <q-btn flat label="등록" @click="$emit('@close')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>



<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ReportPopup extends Vue {
    @Prop() visible : boolean;

    private checkList : {
        text : string,
        checked : boolean,
    }[] = [
        { text : '폭력이 노골적입니다.', checked : false },
        { text : '콘텐츠가 선정적입니다.', checked : false },
        { text : '게임 내 비속한 표현(욕설, 비방 등)이 있습니다.', checked : false },
        { text : '스팸 또는 현혹하는 콘텐츠가 포함되어 있습니다.', checked : false },
        { text : '저작권 신고', checked : false },
        { text : '기타', checked : false },
    ];

    mounted() {
    }

}
</script>

<style lang="scss" scoped>

    .reportPopup {
        width: 100%;
        max-width: 500px;

        .box {
            padding: 10px;
            border: 1px solid gray;

            .desLabel {
                margin-top: 20px;
                margin-bottom: 5px;
                font-size: 12px;
            }

            .desInput {
                height: 60px;
                font-size: 12px;
            }

            .checkItem {
                color: #cdcdcd;
                font-size: 13px;
            }
        }
    }

</style>
