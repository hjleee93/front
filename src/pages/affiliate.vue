<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <affiliate-carousel></affiliate-carousel>
<!--        <ins class="adsbygoogle"-->
<!--             style="display:block"-->
<!--             data-ad-client="ca-pub-2187650629390403"-->
<!--             data-ad-slot="9014988850"-->
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

                    <!--                    <game-card v-for="game in $store.getters.searchGames" :data="game"></game-card>-->
                </div>
                <div class="cardContainer" v-else>

                    <game-card v-for="(game, index) in $store.getters.affiliateGames"
                               :key="index"
                               :index="index"
                               class="card"
                               v-on:onVisible="onVisibleItem"
                               :data="game">
                    </game-card>

                    <!--                    <game-card v-intersection="entry => onIntersection(index, entry)" v-for="(game,index) in $store.getters.noneOfficialGames" :data="game"></game-card>-->
                </div>
                <div v-if="$store.getters.affiliateGames.length === 0" class="cardContainer">
                    <game-card-skeleton v-for="(_, index) in 20" :key="index" type="affilate" />
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import GameCard from "components/common/card/gameCard.vue";
import GameCardSkeleton from "components/common/card/gameCardSkeleton.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import {GameLoadState} from "src/store/modules/games";
import AffiliateCarousel from "components/affiliate/affiliateCarousel.vue";
import MetaSetting from "src/scripts/metaSetting";

@Component({
    components: {AffiliateCarousel, SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, GameCardSkeleton},
    // metaInfo() {
    //     return {
    //         // titleTemplate: '%s ← My Site',
    //         meta: [
    //             {name: 'description', content: '더 다양한 게임들을 원하시나요? ZEMPIE를 통해 모두 플레이해보세요.' },
    //
    //             {name: 'og:url', content: `${this.$store.getters.VUE_APP_ZEMPIE_URL}affiliate` },
    //             {name: 'og:site_name', content: 'Zempie Affiliate - 웹 게임 공유 플랫폼' },
    //             {name: 'og:title', content: '어디서든 모두 즐길 수 있는 게임공유플랫폼 ZEMPIE' },
    //             {name: 'og:description', content: '더 다양한 게임들을 원하시나요? ZEMPIE를 통해 모두 플레이해보세요.' },
    //             {name: 'og:image', content: '' },
    //             {name: 'og:type', content: 'website' },
    //         ]
    //     }
    // }
})
export default class Affiliate extends Vue {

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
        play : { sort : 'p', dir : 'asc' },
        heart : { sort : 'h', dir : 'asc' },
    };

    private metaSetting : MetaSetting;

    async mounted() {
        // document.title = this.$t('pageTitle.affiliate') as string;

        this.metaSetting = new MetaSetting( {
            title : `${this.$t('pageTitle.affiliate')} | Zempie.com`,
            meta : [
                { name: 'description', content:  `${this.$t('pageDescription.affiliate')}` },
                { property: 'og:url', content: `${this.$store.getters.VUE_APP_ZEMPIE_URL}affiliate` },
                { property: 'og:title', content: `${this.$t('pageTitle.affiliate')} | Zempie.com` },
                { property: 'og:description', content: `${this.$t('pageDescription.affiliate')}` },
            ]
        } );

        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Affiliate');

        this.$store.commit('isOfficialPage', false);

        await this.$store.dispatch('clearGames', 0);
        await this.$store.dispatch('loadGames', {
            category : 2,
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
        const games = this.$store.getters.affiliateGames;
        if( index < games.length - 1) {
            return;
        }
        if( this.$store.getters.affiliateLoadState === GameLoadState.loaded ) {
            this.$store.dispatch('loadGames', {
                category : 2,
                sort : this.sortData[ this.sort ].sort,
                dir : this.sortData[ this.sort ].dir
            });
        }
    }

    async sortChange( sort ) {
        this.sort = sort;

        await this.$store.dispatch('clearGames', 0);
        await this.$store.dispatch('loadGames', {
            category : 2,
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
