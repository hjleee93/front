<template>
    <q-page v-if="user">
        <div>
            <q-img v-if="user && user.profile.url_banner" :src="user && user.profile.url_banner || ''">
            </q-img>
        </div>
        <div class="head  q-pt-lg bg-grey-10">
            <div class="maxWidth row q-px-lg justify-between">
                <div class="row">
                    <q-avatar size="80px">
                        <q-img :src="user && user.picture || 'img/icon_pic_empty_01.png'"></q-img>
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
                    <router-link :to="`/channel/${$store.getters.user.channel_id}/editing`">
                        <q-btn color="grey-9">{{ $t('channel.editBtn') }}</q-btn>
                    </router-link>
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
                    <q-tab name="games" :label="$t('channel.tab.game')" />
                    <!--                <q-tab name="played" label="플레이한 게임" />-->
                    <q-tab name="info" :label="$t('channel.tab.info')" />
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
<!--                                <game-card v-for="game in games" :data="game"></game-card>-->

                                <game-card v-for="(game, index) in games"
                                           :key="index"
                                           :index="index"
                                           class="card"
                                           :data="game">
                                </game-card>

                            </div>

                            <div v-else class="text-center q-mt-xl">
                                <q-img width="200px" src="img/img-blank.png"></q-img>
                            </div>
                        </div>


                    </q-tab-panel>
                    <q-tab-panel name="info" class="bgColor-1 no-scroll">
                        <div class="maxWidth">

                            <div v-if="description">
                                <div class="text-h7 q-ml-sm">{{ $t('channel.descriptionLabel') }}</div>
                                <div class="contentBox text-left">
                                    {{ description }}
                                </div>
                            </div>

                            <div class="q-my-lg"></div>
                            <div class="contentBox">
                                <content-item :label="$t('channel.businessLabel')" label-style="">
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
import {GameLoadState} from "src/store/modules/games";
import MetaSetting from "src/scripts/metaSetting";

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

    private metaSetting : MetaSetting;

    async mounted() {
        this.$store.commit('navTab', 'Channel');
        const loginState = await this.$store.dispatch('loginState');
        await this.init();

        this.metaSetting = new MetaSetting( {
            title : `${this.$t('pageTitle.channel')} - ${this.user?.name} | Zempie.com`,
            meta : [
                { name: 'description', content: this.user?.profile?.description || '' },
                { property: 'og:url', content: `${document.location.href}` },
                { property: 'og:title', content: `${this.$t('pageTitle.channel')} - ${this.user?.name} | Zempie.com` },
                { property: 'og:description', content: this.user?.profile?.description || '' },
                { property: 'og:image', content: this.user?.profile?.url_banner || this.user?.picture },
            ]
        } );
    }

    beforeDestroy() {
        if(this.metaSetting) {
            this.metaSetting.reset();
            this.metaSetting = null;
        }
    }

    async init() {
        const result = await this.$api.channel( this.channelId );

        if( !result || result.error ) {
            console.error(result);
        }
        else {
            const { target } = result;
            this.user = target;
            const {dev_games} = this.user;
            if( dev_games ) {
                const arr = [];
                for( let i = 0; i < dev_games.length; i++ ) {
                    dev_games[i].user = this.user;
                    if( dev_games[i].activated ) {
                        arr.push( dev_games[i] );
                    }
                }
                this.games = arr;
            }

            this.email = this.user.email;
            this.description = this.user.profile.description;

            document.title = this.user.name;
        }
    }

    @Watch('channelId')
    async onChangedChannelId() {
        await this.init();
    }
}
</script>
<style lang="scss" scoped>
a {
    color: inherit;
    text-decoration: none;
}



.head {
    background-color: #181818;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
