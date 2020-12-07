<template>
    <q-page>
        <div>
            <q-img v-if="user && user.profile.url_banner" :src="user && user.profile.url_banner || ''">
            </q-img>
        </div>
        <div class="head  q-pt-lg bg-grey-10">
            <div class="maxWidth row q-px-lg justify-between">
                <div class="row">
                    <q-avatar size="80px">
                        <img :src="user && user.picture || 'img/icon_pic_empty_01.png'">
                    </q-avatar>
                    <div class="q-ml-lg self-center">
                        <div class="text-h5">
                            {{ user && user.name }}
                        </div>
                        <div>
                            {{ user && user.profile.state_msg || ' ' }}
                        </div>
                    </div>
                </div>
                <div class="self-center" v-if="$store.getters.user && $store.getters.user.channel_id === channelId">
                    <q-btn color="grey-9" @click="$router.push(`/channel/${$store.getters.user.channel_id}/editing`)">채널 설정</q-btn>
                </div>
            </div>
        </div>
        <div class="bg-grey-10">
            <div class="maxWidth">
                <q-tabs
                    bg
                    v-model="tab"
                    dense
                    class="q-pt-lg"
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
            </div>


            <q-separator />

            <div class="">
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="games" class="bgColor-1 no-scroll">
                        <div class="maxWidth">
                            <div class="cardContainer" v-if="games.length">
                                <game-card v-for="game in games" :data="game"></game-card>
                            </div>

                            <div v-else class="text-center q-mt-xl">
                                <q-img width="200px" src="img/img-blank.png"></q-img>
                            </div>
                        </div>


                    </q-tab-panel>
                    <q-tab-panel name="info" class="bgColor-1 no-scroll">
                        <div class="maxWidth">

                            <div v-if="description">
                                <div class="text-h7 q-ml-sm">설명</div>
                                <div class="contentBox text-left">
                                    {{ description }}
                                </div>
                            </div>

                            <div class="q-my-lg"></div>
                            <div class="contentBox">
                                <content-item label="비즈니스 문의" label-style="">
                                    <a :href="'mailto:' + email" style="color: #30a6d8">
                                        {{ email }}
                                    </a>
                                </content-item>
                            </div>
<!--                            <div class="q-my-lg"></div>-->
<!--                            <div class="contentBox">-->
<!--                                <content-item label="링크" label-style="">-->
<!--                                    없음-->
<!--                                </content-item>-->
<!--                            </div>-->
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>



        </div>
        <div style="padding-top: 100px"></div>
        <footer class="footer text-center q-py-lg text-grey-5">
            Copyright 2020. zempie. All rights reserved.
        </footer>
<!--        <main-footer></main-footer>-->
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';
import ProfileTab from "components/profile/profileTab.vue";
import ProfilePrivateTab from "components/profile/profilePrivateTab.vue";
import GameCard from "components/common/card/gameCard.vue";
import MainFooter from "components/main/mainFooter.vue";
import {LoginState} from "src/store/modules/user";
import ContentItem from "components/common/contentItem.vue";

@Component({
    components: {ContentItem, MainFooter, GameCard, ProfilePrivateTab, ProfileTab}
})
export default class Channel extends Vue {

    @Prop() private channelId : string;

    private tab : string = 'games';
    private url : string = '';
    private user : any = null;
    private games : any[] = [];
    private description : string = '';

    private email : string = '';

    async mounted() {
        this.$store.commit('navTab', 'Channel');
        const loginState = await this.$store.dispatch('loginState');

        const result = await this.$api.channel( this.channelId );

        if( !result || result.error ) {
            console.error(result);
        }
        else {
            const { target } = result;
            this.user = target;
            const {dev_games} = this.user;
            if( dev_games ) {
                for( let i = 0; i < dev_games.length; i++ ) {
                    dev_games[i].user = this.user;
                }
                this.games = dev_games;
            }

            this.email = this.user.email;
            this.description = this.user.profile.description;
        }
    }

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
