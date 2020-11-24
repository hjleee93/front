<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <iframe ref="game" class="iframe"
                    :src="url"></iframe>
                <button class="exitButton" @click="exit">
                    <q-icon name="clear"></q-icon>
                </button>
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

    async mounted() {

        await this.$store.dispatch('loadedGames');
        this.gameData = this.$store.getters.gameByPathname(this.pathname);

        // const game_uid = this.gameData.game_uid;
        // this.url = `${process.env.VUE_APP_LAUNCHER_URL}game/${game_uid}`;

        this.url = `${process.env.VUE_APP_LAUNCHER_URL}game/${this.gameData.game_uid}`;

        window.addEventListener('message', this.onMessage);
    }

    beforeDestroy() {
        window.removeEventListener('message', this.onMessage);
    }

    @Watch('$store.getters.idToken')
    onChangedToken() {
        this.toMessage({type: '@updateToken', token: this.$store.getters.idToken});
    }

    async onMessage(msg: MessageEvent) {
        const {type} = msg.data;

        switch (type) {
            case '@initLauncher': {
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
        this.$router.back();
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
