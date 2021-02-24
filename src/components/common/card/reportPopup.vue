<template>
    <q-dialog v-model="visible" persistent>
        <q-card class="reportPopup">
            <q-card-section>
                <div>
                    {{ $t('reportPopup.label') }}
                </div>
            </q-card-section>
            <q-separator inset color="gray" size="1px"></q-separator>
            <q-card-section>
                <div class="box">
                    <div class="text-h7">{{ $t('reportPopup.category.label') }}</div>
                    <template v-for="checkItem in checkList">
                        <div class="checkItem">
                            <q-checkbox v-model="checkItem.checked" :label="checkItem.text" />
                        </div>
                    </template>


                    <div class="desLabel">{{ $t('reportPopup.description') }}</div>
                    <q-input class="desInput" type="textarea" outlined dense />
                    <div class="q-mt-md">{{ $t('reportPopup.file') }}</div>
                    <input type="file" accept="image/png, image/jpg" />
                </div>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat :label="$t('reportPopup.cancelBtn')" @click="$emit('@close')" />
                <q-btn flat :label="$t('reportPopup.submitBtn')" @click="$emit('@close')" />
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
        { text : this.$t('reportPopup.category.text1') as string, checked : false },
        { text : this.$t('reportPopup.category.text2') as string, checked : false },
        { text : this.$t('reportPopup.category.text3') as string, checked : false },
        { text : this.$t('reportPopup.category.text4') as string, checked : false },
        { text : this.$t('reportPopup.category.text5') as string, checked : false },
        { text : this.$t('reportPopup.category.text6') as string, checked : false },
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
