<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
        <div class="maxWidth">
<!--            <genre-category></genre-category>-->
<!--            <q-separator inset/>-->
<!--            <sort-category></sort-category>-->
            <search-game></search-game>

            <div class="q-pt-none">
                <div class="cardContainer" v-if="$store.getters.isSearchGame">
                    <game-card v-for="(game, index) in $store.getters.searchGames"
                               :key="index"
                               class="card"
                               :class="view[index] ? 'visible':''"
                               v-intersection="entry => onIntersection(index, entry, false)"
                               :data="game">
                    </game-card>
                </div>
                <div class="cardContainer" v-else>
                    <game-card v-for="(game, index) in $store.getters.officialGames"
                               :key="index"
                               class="card"
                               :class="view[index] ? 'visible':''"
                               v-intersection="entry => onIntersection(index, entry, true)"
                               :data="game">
                    </game-card>
                </div>
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

@Component({
    components: {SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel}
})
export default class Home extends Vue {

    private view : boolean[] = [];

    async mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Major');

        // await this.$store.dispatch( 'loadingGame' );

        this.$store.commit('isOfficialPage', true);

        await this.$store.dispatch('loadGames', 1);

        // this.$store.commit('crtOriginGames', this.$store.getters.officialGames );
        // this.$store.commit('searchGames', this.$store.getters.officialGames );
    }

    beforeDestroy() {
        this.$store.commit('headerBgTransparent', false );
    }

    onIntersection( index, entry, search ) {

        const isIntersecting = entry.isIntersecting;
        this.$set( this.view, index,  entry.isIntersecting);

        if( !isIntersecting || !search) {
            return;
        }



        const games = this.$store.getters.officialGames;
        if( index < games.length - 1) {
            return;
        }


        if( this.$store.getters.officialLoadState === GameLoadState.loaded ) {
            this.$store.dispatch('loadGames', 1);
        }
    }


};
</script>
<style scoped lang="scss">
@import "./../css/quasar.variables";

.page {
    top: -50px;
}

.card {
    transform: scale(0);
}

.visible {
    transform: scale(1);
    transition: transform 0.2s ease-out;
}


</style>
