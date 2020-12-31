<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
        <div class="maxWidth">
            <search-game></search-game>

            <div class="q-pt-none">
                <template v-for="featured in featuredList">
                    <home-category :data="featured"
                                   :game-list="featured.games">
                    </home-category>
                    <div class="q-mb-xl"></div>
                </template>

            </div>
        </div>
        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import MainCarousel from "components/main/mainCarousel.vue";
import GameCard from "components/common/card/gameCard.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import {GameLoadState} from "src/store/modules/games";
import HomeCategory from "components/home/homeCategory.vue";

@Component({
    components: {HomeCategory, SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel}
})
export default class Home extends Vue {

    private featuredList : any[] = [];

    async mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Home');

        const result = await this.$api.featured();
        this.featuredList = result;
        console.log(result);

        // this.$store.commit('isOfficialPage', true);
        // await this.$store.dispatch('clearGames', 1);
        // await this.$store.dispatch('loadGames', {
        //     official : 1,
        //     sort : this.sortData[ this.sort ].sort,
        //     dir : this.sortData[ this.sort ].dir
        // });
    }

    beforeDestroy() {
        this.$store.commit('headerBgTransparent', false );
    }
};
</script>
<style scoped lang="scss">
@import "./../css/quasar.variables";

.page {
    top: -50px;
}



</style>
