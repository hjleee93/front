<template>
    <div>
        <q-footer class="bg-dark text-white"
                  v-if="$q.platform.is.mobile"
                  reveal
        >
            <!--    <q-toolbar>-->
            <!--      <q-toolbar-title>-->
            <!--        <q-avatar>-->
            <!--          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">-->
            <!--        </q-avatar>-->
            <!--        Title-->
            <!--      </q-toolbar-title>-->
            <!--    </q-toolbar>-->


            <q-tabs
                v-model="tab"
                active-color="white"
                class="text-grey-5"
                align="center"
                :breakpoint="1"
            >
                <q-route-tab to="/" class="min-height50" name="home" icon="home" :label="$t('layoutFooter.routeTab.home')"/>
                <q-route-tab to="/official" class="min-height50" name="best" icon="star" :label="$t('layoutFooter.routeTab.official')"/>
                <q-route-tab to="/challenge" class="min-height50" name="challenge" icon="emoji_events" :label="$t('layoutFooter.routeTab.challenge')"/>
                <q-route-tab to="/affiliate" class="min-height50" name="affiliate" icon="business" :label="$t('layoutFooter.routeTab.affiliate')"/>
                <q-route-tab v-if="$store.getters.isLogin" :to="`/channel/${$store.getters.user.channel_id}`" class="min-height50" name="channel" icon="far fa-id-card" :label="$t('layoutFooter.routeTab.channel')"/>
            </q-tabs>
        </q-footer>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {consoleLog} from "src/scripts/consoleLog";

@Component
export default class LayoutFooter extends Vue {
    private tab : string = '';

    mounted() {
        this.tab = this.$store.getters.navTab;
    }

    @Watch( 'tab' )
    private onChangedTab() {
        this.$store.commit('navTab', this.tab)
    }

    @Watch( '$store.getters.navTab' )
    private onChangedNavTab() {
        this.tab = this.$store.getters.navTab;
    }

}
</script>


<style lang="scss" scoped>

</style>
