<template>
    <q-page>
        <div class="maxWidth">

            <div class="q-pt-lg"></div>

            <div class="text-h6">{{ $t('leave.label') }}</div>
            <div class="contentBox textColor">
                <div class="text-h6">
                    {{ $t('leave.description.text1') }}
                </div>
                <div>
                    {{ $t('leave.description.text2') }}
                </div>
                <div>
                    {{ $t('leave.description.text3') }}
                </div>
                <div>
                    {{ $t('leave.description.text4') }}
                </div>
                <div>
                    {{ $t('leave.description.text5') }}
                </div>
                <div>
                    {{ $t('leave.description.text6') }}
                </div>
            </div>

            <div class="q-my-lg"></div>

            <div class="text-h6">{{ $t('leave.reason.label') }}</div>
            <div class="contentBox">
                <q-input maxlength="200" v-model="reason" :placeholder="$t('leave.reason.inputPlaceholder')"></q-input>
            </div>

            <div class="q-my-lg"></div>

            <div>
                <q-checkbox color="grey-9" v-model="check1" :label="$t('leave.reason.check1')" />
            </div>



            <div class="q-mt-sm">
                <q-checkbox color="grey-9" v-model="check2" :label="$t('leave.reason.check2')" />
            </div>

            <div class="q-my-lg"></div>

            <div class="text-center">
                <q-btn color="positive" :disable="!check1 || !check2" class="width100p maxWidth400px height50" @click="leave">{{ $t('leave.btn') }}</q-btn>
            </div>



        </div>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {LoginState} from "src/store/modules/user";
import ContentItem from "components/common/contentItem.vue";
import Login from "src/scripts/login";


@Component({
    components: {ContentItem}
})
export default class Leave extends Vue {

    private reason : string = '';
    private check1 : boolean =false;
    private check2 : boolean =false;


    async mounted() {
        document.title = this.$t('pageTitle.leave') as string;
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                return;
        }
    }

    async leave() {
        const ok = confirm( this.$t('leave.confirmMessage') as string );
        if ( ok ) {
            const result = await this.$api.leave( this.reason );

            if( !result || result.error ) {
                result && result.error && alert( result.error.message );
                console.error( result && result.error || 'error' );
            }
            else  {
                await Login.logout();
                await this.$router.replace('/');
            }
            // console.log(result);
        }
    }
}
</script>
<style lang="scss" scoped>
.textColor {
    color: #b7b7b7;
}
</style>
