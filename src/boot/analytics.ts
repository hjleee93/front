import Vue from 'vue';
import {router} from 'src/router';
import VueGtagPlugin, { VueGtag } from "vue-gtag";

const id = process.env.VUE_APP_GTAG_ID;

declare module 'vue/types/vue' {
    interface VueConstructor {
        $gtag: VueGtag
    }
}

Vue.use(VueGtagPlugin,{
    config :{
        id,
    },
}, router );
