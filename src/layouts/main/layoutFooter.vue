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
            >
                <q-route-tab to="/" class="min-height50" name="home" icon="home" label="홈"/>
                <q-route-tab to="/official" class="min-height50" name="best" icon="star" label="공식 게임"/>
                <q-route-tab to="/challenge" class="min-height50" name="challenge" icon="emoji_events" label="도전 게임"/>
                <q-route-tab :to="`/channel/${$store.getters.user.channel_id}`" v-if="$store.getters.user" class="min-height50" name="channel" icon="far fa-id-card" label="내 채널"/>
            </q-tabs>
        </q-footer>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class LayoutFooter extends Vue {
    private tab : string = '';

    mounted() {
        this.tab = this.$store.getters.navTab;
    }

    @Watch( 'tab' )
    private onChangedTab() {
        this.$store.commit('navTab', this.tab);
    }

    @Watch( '$store.getters.navTab' )
    private onChangedNavTab() {
        this.tab = this.$store.getters.navTab;
    }

    // async studio() {
    //     window.open(process.env.VUE_APP_STUDIO_URL);
    // }

}
</script>


<style lang="scss" scoped>

</style>
