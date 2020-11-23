<template>
    <q-page>
        <div class="maxWidth">

            <div class="q-pt-lg"></div>

            <div class="text-h6">회원 탈퇴</div>
            <div class="contentBox textColor">
                <div class="text-h6">
                    회원탈퇴 시 개인 정보 및 Zempie에서 만들어진 모든 데이터는 삭제됩니다.
                </div>
                <div>
                    1. 모든 게임 플레이 정보 및 구매 정보는 삭제됩니다.
                </div>
                <div>
                    2. 서비스 이용시 보유하고 있던, 개인의 모든 재산은 삭제됩니다.
                </div>
                <div>
                    3. 사이버 머니가 남아있을 시, 탈퇴 정채겡 의해 환불에 따른 수수료 지급 및 소액 잔약 미환급 등의 불이익이 있을 수 있습니다.
                </div>
                <div>
                    4. 회원탈퇴를 하더라도 특정한 사유가 있을 시 일정 기간동안 개인정보를 보관할 수 있습니다.
                </div>
                <div>
                    5. 회원 탈퇴 진행 시 해당 아이디는 영구적으로 삭제되어 재가입이 불가능합니다.
                </div>
            </div>

            <div class="q-my-lg"></div>

            <div class="text-h6">탈퇴 사유</div>
            <div class="contentBox">
                <q-input maxlength="200" v-model="reason" placeholder="탈퇴 사유를 입력해주세요."></q-input>
            </div>

            <div class="q-my-lg"></div>

            <div>
                <q-checkbox color="grey-9" v-model="check1" label="미결 거래로 인한 수익금을 지급받을 수 없닺는 사실을 이해합니다." />
            </div>



            <div class="q-mt-sm">
                <q-checkbox color="grey-9" v-model="check2" label="해당 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다." />
            </div>

            <div class="q-my-lg"></div>

            <div class="text-center">
                <q-btn color="positive" :disable="!check1 || !check2" class="width100p maxWidth400px height50" @click="leave">회원 탈퇴</q-btn>
            </div>



        </div>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {LoginState} from "src/store/modules/user";
import ContentItem from "components/common/contentItem.vue";


@Component({
    components: {ContentItem}
})
export default class Leave extends Vue {

    private reason : string = '';
    private check1 : boolean =false;
    private check2 : boolean =false;


    async mounted() {
        const loginState =  await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login:
                return;
        }
    }

    async leave() {
        const ok = confirm( '정말로 탈퇴하시겠습니까?' );
        if ( ok ) {
            const result = await this.$api.leave( this.reason  );
            console.log(result);
        }
    }
}
</script>
<style lang="scss" scoped>
.textColor {
    color: #b7b7b7;
}
</style>
