<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <challenge-carousel></challenge-carousel>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2187650629390403"
             data-ad-slot="8292832492"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <div class="maxWidth">
<!--            <genre-category></genre-category>-->
<!--            <q-separator inset/>-->
            <search-game></search-game>
<!--            <sort-category v-on:@sortChange="sortChange"></sort-category>-->
            <div class="q-pt-none">
                <div class="cardContainer" v-if="$store.getters.isSearchGame">

                    <game-card v-for="(game, index) in $store.getters.searchGames"
                               :key="index"
                               :index="index"
                               class="card"
                               :data="game">
                    </game-card>

<!--                    <game-card v-for="game in $store.getters.searchGames" :data="game"></game-card>-->
                </div>
                <div class="cardContainer" v-else>

                    <game-card v-for="(game, index) in $store.getters.noneOfficialGames"
                               :key="index"
                               :index="index"
                               class="card"
                               v-on:onVisible="onVisibleItem"
                               :data="game">
                    </game-card>

<!--                    <game-card v-intersection="entry => onIntersection(index, entry)" v-for="(game,index) in $store.getters.noneOfficialGames" :data="game"></game-card>-->
                </div>
            </div>
        </div>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2187650629390403"
             data-ad-slot="8292832492"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import GameCard from "components/common/card/gameCard.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import ChallengeCarousel from "components/challenge/challengeCarousel.vue";
import SearchGame from "components/common/searchGame.vue";
import {GameLoadState} from "src/store/modules/games";

@Component({
    components: {SearchGame, ChallengeCarousel, MainFooter, SortCategory, GenreCategory, GameCard}
})
export default class Challenge extends Vue {

    private sort : string = 'create';
    private sortData : {
        [ name:string ] : {
            sort : string,
            dir : string
        }
    } = {
        new : { sort : 'u', dir : 'desc' },
        create : { sort : 'c', dir : 'asc' },
        name : { sort : 't', dir : 'asc' },
    };

    async mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Minor');

        this.$store.commit('isOfficialPage', false);

        await this.$store.dispatch('clearGames', 0);
        await this.$store.dispatch('loadGames', {
            official : 0,
            sort : this.sortData[ this.sort ].sort,
            dir : this.sortData[ this.sort ].dir
        });
    }

    beforeDestroy() {
        this.$store.commit('headerBgTransparent', false );
    }

    onVisibleItem( index :  number ) {
        const games = this.$store.getters.noneOfficialGames;
        if( index < games.length - 1) {
            return;
        }
        if( this.$store.getters.noneOfficialLoadState === GameLoadState.loaded ) {
            this.$store.dispatch('loadGames', {
                official : 0,
                sort : this.sortData[ this.sort ].sort,
                dir : this.sortData[ this.sort ].dir
            });
        }
    }

    async sortChange( sort ) {
        this.sort = sort;

        await this.$store.dispatch('clearGames', 0);
        await this.$store.dispatch('loadGames', {
            official : 0,
            sort : this.sortData[ this.sort ].sort,
            dir : this.sortData[ this.sort ].dir
        });
    }
};
</script>
<style scoped lang="scss">
@import "./../css/quasar.variables";

.page {
    top: -50px;
}


</style>
