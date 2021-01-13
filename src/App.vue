<template>
    <div id="q-app">
        <router-view/>
        <q-ajax-bar
            ref="bar"
            position="bottom"
            color="primary"
            size="10px"
            skip-hijack
        />
    </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {i18n} from "boot/i18n";
// import {firebaseInitStartTime} from "boot/firebase";

let app: App;

@Component
export default class App extends Vue {
    async mounted() {
        // console.log( this.$t('failed'));
        this.$i18n.locale = 'ko';
        // console.log( this.$i18n.t('failed'));
        // console.log( i18n.t('failed') );
        app = this;

        await this.$store.dispatch('loginState');

        // console.log('로그인완료 : ' + (Date.now() - firebaseInitStartTime) / 1000 );

    }

    @Watch('$store.getters.ajaxBar')
    onChangeAjaxBar() {
        if (this.$store.getters.ajaxBar) {
            //@ts-ignore
            this.$refs.bar.start();
        } else {
            //@ts-ignore
            this.$refs.bar.stop();
        }
    }
}

export {
    app
}

</script>
<style lang="scss" scoped>

</style>
