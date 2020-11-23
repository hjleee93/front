<template>
    <q-page>
        <div>
            <q-img src="banner/channels4_banner.jpg">
            </q-img>
        </div>
        <div class="head maxWidth q-pt-lg bg-grey-10">
            <div class="row q-px-lg justify-between">
                <div class="row">
                    <q-avatar size="80px">
                        <img :src="$store.getters.user.picture || '/img/icon_pic_empty_01.png'">
                    </q-avatar>
                    <div class="q-ml-lg self-center">
                        <div class="text-h5">
                            박한길
                        </div>
                        <div>
                            김준 바보
                        </div>
                    </div>
                </div>
                <div class="self-center">
                    <q-btn color="grey-9" @click="$router.push(`/channel/${'ss'}/editing`)">채널 설정</q-btn>
                </div>

            </div>
        </div>
        <div class="maxWidth">
            <q-tabs
                bg
                v-model="tab"
                dense
                class="q-pt-lg bg-grey-10"
                indicator-color="color-grey-10"
                align="left"
            >
                <q-tab name="games" label="등록한 게임" />
<!--                <q-tab name="played" label="플레이한 게임" />-->
                <q-tab name="info" label="정보" />
<!--                <q-tab name="activity" label="활동" />-->
<!--                <q-tab name="publishing" label="퍼블리싱" />-->
<!--                <q-tab name="achievement" label="업적" />-->
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="games" class="bgColor-1 no-scroll">
                    <div class="cardContainer">
                        <game-card v-for="game in $store.getters.games" :data="game"></game-card>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="info" class="bgColor-1 no-scroll">

                </q-tab-panel>
            </q-tab-panels>

        </div>
        <div style="padding-top: 100px"></div>

        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import ProfileTab from "components/profile/profileTab.vue";
import ProfilePrivateTab from "components/profile/profilePrivateTab.vue";
import GameCard from "components/common/card/gameCard.vue";
import MainFooter from "components/main/mainFooter.vue";

@Component({
    components: {MainFooter, GameCard, ProfilePrivateTab, ProfileTab}
})
export default class Channel extends Vue {
    private tab : string = 'games';
    private url : string = '';

}
</script>
<style lang="scss" scoped>

.head {
    background-color: #181818;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
