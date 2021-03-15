<template>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import firebase from "firebase/app";
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";
import {consoleLog} from "src/scripts/consoleLog";

@Component
export default class Redirect extends Vue {

    constructor() {
        super();

        const { params } = this.$route;
        const {pathMatch} = params;
        this.$router.replace( pathMatch );

        consoleLog.log(pathMatch);

        // const { hash } = this.$route;
        // console.log( this.$route, this.$router, hash );
        // if (!hash || hash.length <= 2) {
        //     this.$router.replace('/');
        //     return;
        // }
        // this.$router.replace(hash.substring(2));
    }

}
</script>
<style lang="scss" scoped>
.footer {
    //background-color: #292929;
}
</style>
