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

let app: App;

@Component
export default class App extends Vue {
    async mounted() {
        // this.$i18n.locale = navigator.language.substring(0,2);
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
