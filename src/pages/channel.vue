<template>
    <q-page>
        <div>
            <q-img :src="user && user.profile.url_banner || ''">
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
                            {{ user && user.profile.state_msg || '-' }}
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

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="games" class="bgColor-1 no-scroll">
                    <div class="cardContainer">
                        <game-card v-for="game in games" :data="game"></game-card>
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
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';
import ProfileTab from "components/profile/profileTab.vue";
import ProfilePrivateTab from "components/profile/profilePrivateTab.vue";
import GameCard from "components/common/card/gameCard.vue";
import MainFooter from "components/main/mainFooter.vue";
import {LoginState} from "src/store/modules/user";

@Component({
    components: {MainFooter, GameCard, ProfilePrivateTab, ProfileTab}
})
export default class Channel extends Vue {

    @Prop() private channelId : string;

    private tab : string = 'games';
    private url : string = '';
    private user : any = null;
    private games : any[] = [];

    async mounted() {

        const loginState = await this.$store.dispatch('loginState');

        if( loginState === LoginState.login
            && this.channelId === this.$store.getters.user.channel_id ) {
            this.user = this.$store.getters.user;

            const {developed_games} = this.user;
            if( developed_games ) {
                for( let i = 0; i < developed_games.length; i++ ) {
                    developed_games[i].user = this.user;
                }
                this.games = developed_games;
            }

            console.log(this.games);

            return;
        }

        const result = await this.$api.channel( this.channelId );
        const { target } = result;
        this.user = target;
        const {developed_games} = this.user;
        if( developed_games ) {
            for( let i = 0; i < developed_games.length; i++ ) {
                developed_games[i].user = this.user;
            }
            this.games = developed_games;
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
