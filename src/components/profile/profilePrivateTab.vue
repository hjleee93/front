<template>
    <div>
        <div class="q-mt-lg"></div>

        <div class="text-h6">{{ $t('profilePrivateTab.contactLabel') }}</div>
        <div class="contentBox">
            <content-item :label="$t('profilePrivateTab.emailLabel')" label-style="q-mt-md">
                <template>
                    <q-input class="width100p maxWidth400px" filled readonly v-model="email">
                    </q-input>
                </template>
            </content-item>
            <div class="q-mt-sm"></div>
<!--            <content-item label="전화번호" label-style="q-mt-md">-->
<!--                <template>-->
<!--                    <q-input class="width100p maxWidth400px" filled readonly v-model="phoneNum">-->
<!--                    </q-input>-->
<!--                </template>-->
<!--            </content-item>-->
        </div>


        <div class="q-my-md"></div>

        <div v-if="providerId === 'password'">
            <div class="text-h6">{{ $t('profilePrivateTab.resetPassword.label') }}</div>
            <div class="contentBox">
                <div class="non-selectable fontSize16">{{ $t('profilePrivateTab.resetPassword.text1') }}<span class="underline cursorPoint" @click="reset">{{ $t('profilePrivateTab.resetPassword.text2') }}</span>{{ $t('profilePrivateTab.resetPassword.text3') }}</div>
            </div>
        </div>


        <div class="q-my-md"></div>

        <div class="text-h6">{{ $t('profilePrivateTab.leave.label') }}</div>
        <div class="contentBox">
            <div class="non-selectable fontSize16">{{ $t('profilePrivateTab.leave.text1') }}<span class="underline cursorPoint" @click="leave">{{ $t('profilePrivateTab.leave.text2') }}</span>{{ $t('profilePrivateTab.leave.text3') }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ContentItem from "components/common/contentItem.vue";
import firebase from "firebase";
@Component({
    components: {ContentItem}
})
export default class ProfilePrivateTab extends Vue {
    private email : string = '';
    private phoneNum : string = '010-0000-0000';
    private providerId : string = '';

    private loading : boolean = false;

    async mounted() {
        await this.$store.dispatch('loginState');
        const currentUser = firebase.auth().currentUser;
        this.email = currentUser.email;

        const provider = currentUser.providerData[0];
        this.providerId = provider.providerId;
    }

    async reset() {

        const ok = confirm( this.$t('profilePrivateTab.confirmMessage') as string )

        if( !ok ) {
            return;
        }

        this.$store.commit('ajaxBar', true);
        this.loading = true;
        const result = await firebase.auth().sendPasswordResetEmail(this.email);
        // console.log(result);
        alert(this.$t('profilePrivateTab.emailCheck'));
        this.loading = false;
        this.$store.commit('ajaxBar', false);
    }

    async leave() {
        await this.$router.push('/leave');
    }
}
</script>
<style lang="scss" scoped>



//.box {
//    padding: 20px;
//    background-color: #272727;
//}
//
//.infoName {
//    width: 120px;
//    line-height: 56px;
//}
//
//.infoInput {
//    height: 48px;
//    width: 100%;
//    max-width: 400px;
//}
//
//.infoButton {
//    height: 40px;
//    //line-height: 56px;
//}

.lineHeight56 {
    line-height: 56px;
}

.completeBox {
    //background-color:
    font-size: 14px;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    user-select: none;
}

</style>
