import Vue from 'vue';
import {router} from 'src/router';
import VueGtag from "vue-gtag";

const id = process.env.VUE_APP_GTAG_ID;

Vue.use(VueGtag,{
    config :{
        id,
    },
}, router );
