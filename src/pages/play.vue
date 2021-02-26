<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <iframe ref="game" class="iframe" :style="`height:${iframeHeight};`"
                    :src="url"></iframe>
<!--                <button v-if="initLauncher" class="exitButton" @click="exit">-->
<!--                    <q-icon name="clear"></q-icon>-->
<!--                </button>-->
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';
import firebase from "firebase";
import {LoginState} from "src/store/modules/user";

@Component({
    components: { }
})
export default class Play extends Vue {


    @Prop() private pathname : string;

    private gameData: any;
    private url: string = '';
    private initLauncher : boolean = false;
    private iframeHeight : string = '';


    async mounted() {

        // await this.$store.dispatch('loadedGames');
        this.gameData = this.$store.getters.gameByPathname(this.pathname);
        if( !this.gameData ) {
            //todo 게임 요청
            const result = await this.$api.game( this.pathname );
            if( !result && result.error ) {
                console.error( result && result.error || 'error' );
            }
            else {
                this.gameData = result.game;
            }

        }

        // const game_uid = this.gameData.game_uid;
        // this.url = `${process.env.VUE_APP_LAUNCHER_URL}game/${game_uid}`;
        document.title = this.gameData.title;

        this.url = `${process.env.VUE_APP_LAUNCHER_URL}game/${this.gameData.pathname}`;

        window.addEventListener('message', this.onMessage);
        window.addEventListener('resize', this.onResize);
        this.onResize();

        this.tagEvent();
    }

    beforeDestroy() {
        window.removeEventListener('message', this.onMessage);
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        // this.iframeWidth = `${window.innerWidth}px`;
        this.iframeHeight = `${window.innerHeight}px`;
    }

    @Watch('$store.getters.idToken')
    onChangedToken() {
        this.toMessage({type: '@updateToken', token: this.$store.getters.idToken});
    }

    async onMessage(msg: MessageEvent) {
        const {type} = msg.data;

        switch (type) {
            case '@initLauncher': {
                this.initLauncher = true;
                this.toMessage({type: '@initParent'});
                const loginState = await this.$store.dispatch('loginState');
                this.onChangedToken();
                break;
            }
            case '@refreshToken': {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    this.$store.commit('idToken', idToken);
                }
                break;
            }
            case '@requestLogin': {
                await this.$router.push('/login');
                break;
            }
            case '@exit': {
                this.exit();
                break;
            }
        }
    }

    toMessage(message: any) {
        const iframe = this.$refs.game as HTMLIFrameElement;
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(message, '*');
        }
    }

    exit() {
        if( this.$store.getters.fromRouterName ) {
            this.$router.back();
        }
        else {
            this.$router.push('/home');
        }
    }

    tagEvent() {
        this.$gtag && this.$gtag.event(
            'play', {
                'event_category': 'game',
                'event_label': 'title',
                'value': this.gameData.title,
            });
    }
}
</script>
<style lang="scss" scoped>
    .iframe {
        border: 0;
        display: block;
        width: 100%;
        height: 100vh;
    }

    .exitButton {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        padding: 0;
        background-color: initial;
        border: 0;
        color: #727272;
        border-radius: 5px;
        outline: 0;

        &:hover {
            background-color: #ececec;
        }

        &:active {
            background-color: #dddddd;
        }

        i {
            font-size: 24px;
        }
    }

</style>
