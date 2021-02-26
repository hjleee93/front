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
                    <q-input class="desInput" type="textarea" outlined dense v-model="reason" />
<!--                    <div class="q-mt-md">{{ $t('reportPopup.file') }}</div>-->
<!--                    <input type="file" accept="image/png, image/jpg" />-->
                    <q-btn color="grey-9 q-mt-md q-mb-sm q-mr-md" @click="fileLoader.addFile()">{{ $t('reportPopup.fileBtn') }}</q-btn>
                    <div>
                        {{pictureUrl}}
                    </div>
                </div>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat :label="$t('reportPopup.cancelBtn')" @click="$emit('@close')" />
                <q-btn flat :label="$t('reportPopup.submitBtn')" @click="reportGame" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>



<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {FileLoader, mbToByte} from "src/scripts/fileLoader";

@Component({
    components: {}
})
export default class ReportPopup extends Vue {
    @Prop() private data : any;
    @Prop() visible : boolean;

    private fileLoader : FileLoader = new FileLoader();
    private file : File = undefined;
    private reason : string = '';
    private pictureUrl : string = '';

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
        this.fileLoader.on( 'onLoadFile', this.onLoadFile );
    }


    onLoadFile( data, file ) {
        if( file.size <= mbToByte( 1 ) ) {
            if( file.type.includes('image/') ) {
                this.pictureUrl = file.name;
                this.file = file;
            }
            else {
                alert( this.$t('reportPopup.fileTypeError') )
            }
        }
        else {
            alert( this.$t('reportPopup.fileSizeError') )
        }
    }

    async reportGame() {
        if( !this.$store.getters.isLogin ) {
            this.$emit('@close');
            return;
        }

        const reason_num = this.checkList
                               .map( (checkData : { text : string, checked : boolean }, index : number) => checkData.checked ? index : -1 )
                               .filter( (num : number) => num != -1 );

        if( reason_num.length == 0 ) {
            alert( this.$t('reportPopup.reasonError') )
            return;
        }

        const result = await this.$api.reportGame( this.data.id, reason_num, this.reason, this.file );

        if( !result || result.error ) {
            console.error(result);
        }
        else {
            alert( this.$t('reportPopup.successAlert') );
            this.resetForm();
        }

        this.$emit('@close');
    }

    resetForm() {
        this.file = undefined;
        this.reason = '';
        this.checkList.forEach( (checkData : { text : string, checked : boolean }) => checkData.checked = false);
        this.pictureUrl = '';
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
