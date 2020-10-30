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
                <q-tab class="min-height50" name="Major" icon="mail" label="Major" />
                <q-tab class="min-height50" name="Minor" icon="alarm" label="Minor" />
                <q-tab class="min-height50" name="G-Studio" icon="movie" label="G-Studio" />
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
}
</script>


<style lang="scss" scoped>

</style>
