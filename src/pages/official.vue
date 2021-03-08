<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
<!--        <ins class="adsbygoogle"-->
<!--             style="display:block"-->
<!--             data-ad-client="ca-pub-2187650629390403"-->
<!--             data-ad-slot="9768906554"-->
<!--             data-ad-format="auto"-->
<!--             data-full-width-responsive="true"></ins>-->
        <div class="maxWidth">
            <!--            <genre-category></genre-category>-->
            <!--            <q-separator inset/>-->
            <search-game></search-game>
            <sort-category v-on:@sortChange="sortChange"></sort-category>


            <div class="q-pt-none">
                <div class="cardContainer" v-if="$store.getters.isSearchGame">
                    <game-card v-for="(game, index) in $store.getters.searchGames"
                               :key="index"
                               :index="index"
                               class="card"
                               :data="game">
                    </game-card>
                </div>
                <div class="cardContainer" v-else>
                    <game-card v-for="(game, index) in $store.getters.officialGames"
                               :key="index"
                               :index="index"
                               class="card"
                               v-on:onVisible="onVisibleItem"
                               :data="game">
                    </game-card>
                </div>
                <div v-if="$store.getters.officialGames.length === 0" class="cardContainer">
                    <game-card-skeleton v-for="(_, index) in 20" :key="index"  />
                </div>
            </div>
        </div>
        <div class="q-mb-xl"></div>
        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import MainCarousel from "components/main/mainCarousel.vue";
import GameCard from "components/common/card/gameCard.vue";
import GameCardSkeleton from "components/common/card/gameCardSkeleton.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import {GameLoadState} from "src/store/modules/games";
import MetaSetting from "src/scripts/metaSetting";

@Component({
    components: {SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel, GameCardSkeleton}
})
export default class Official extends Vue {

    private sort : string = 'create';
    private sortData : {
        [ name:string ] : {
            sort : string,
            dir : string
        }
    } = {
        new : { sort : 'l', dir : 'desc' },
        create : { sort : 'c', dir : 'asc' },
        name : { sort : 't', dir : 'desc' },
        play : { sort : 'p', dir : 'asc' },
        heart : { sort : 'h', dir : 'asc' },
    };

    private metaSetting : MetaSetting;

    async mounted() {
        // document.title = this.$t('pageTitle.official') as string;
        this.metaSetting = new MetaSetting( {
            title : `${this.$t('pageTitle.official')} | Zempie.com`,
            meta : [
                { name: 'description', content:  `${this.$t('pageDescription.official')}` },
                { property: 'og:url', content: `${this.$store.getters.VUE_APP_ZEMPIE_URL}official` },
                { property: 'og:title', content: `${this.$t('pageTitle.official')} | Zempie.com` },
                { property: 'og:description', content: `${this.$t('pageDescription.official')}` },
                // { property: 'og:image', content: '' },
            ]
        } );


        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Major');

        this.$store.commit('isOfficialPage', true);

        await this.$store.dispatch('clearGames', 1);
        await this.$store.dispatch('loadGames', {
            category : 1,
            sort : this.sortData[ this.sort ].sort,
            dir : this.sortData[ this.sort ].dir
        });

        // document.querySelectorAll('.adsbygoogle').forEach(  (element : Element) => {
        //     if(element.getAttribute('data-ad-slot')) {
        //         //@ts-ignore
        //         (window.adsbygoogle || []).push({});
        //     }
        // } )
    }

    beforeDestroy() {
        this.$store.commit('headerBgTransparent', false );


        if(this.metaSetting) {
            this.metaSetting.reset();
            this.metaSetting = null;
        }
    }

    onVisibleItem( index :  number ) {
        const games = this.$store.getters.officialGames;
        if( index < games.length - 1) {
            return;
        }
        if( this.$store.getters.officialLoadState === GameLoadState.loaded ) {
            this.$store.dispatch('loadGames', {
                category : 1,
                sort : this.sortData[ this.sort ].sort,
                dir : this.sortData[ this.sort ].dir
            });
        }
    }

    async sortChange( sort ) {
        this.sort = sort;

        await this.$store.dispatch('clearGames', 1);
        await this.$store.dispatch('loadGames', {
            category : 1,
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
