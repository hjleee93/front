<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
        <div class="maxWidth">
            <!--            <genre-category></genre-category>-->
            <!--            <q-separator inset/>-->
            <!-- <search-game></search-game> -->
            <!--            <sort-category v-on:@sortChange="sortChange"></sort-category>-->

            <div class="q-pt-none">
                <div class="tagName">
                    # {{tag}}
                </div>
                <div class="cardContainer">
                    <game-card v-for="(game, index) in games"
                               :key="index"
                               :index="index"
                               class="card"
                               :data="game">
                    </game-card>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import MainCarousel from "components/main/mainCarousel.vue";
import GameCard from "components/common/card/gameCard.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import {GameLoadState} from "src/store/modules/games";
import MetaSetting from "src/scripts/metaSetting";

@Component({
    components: {SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel}
})
export default class SearchResult extends Vue {

    @Prop() private tagId : string;

    private tag : string = '';
    private games : any[] = [];


    private metaSetting : MetaSetting;

    async mounted() {
        // document.title = this.$t('pageTitle.searchResult') as string;
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'SearchResult');

        const result = await this.$api.tagged( this.tagId );

        if( result.tag ) {
            this.tag = result.tag;
        }
        if( result.games ) {
            this.games = result.games;
        }


        this.metaSetting = new MetaSetting( {
            title : `${this.$t('pageTitle.searchResult')} - ${this.tag} | Zempie.com`,
            meta : [
                { name: 'description', content: this.tag },
                // { name: 'author', content: author },
                { property: 'og:url', content: `${document.location.href}` },
                // { property: 'og:site_name', content: `${ title } | Zempie.com` },
                { property: 'og:title', content: `${this.$t('pageTitle.searchResult')} - ${this.tag} | Zempie.com` },
                { property: 'og:description', content: this.tag },
                // { property: 'og:image', content: thumb },
                { property: 'og:type', content: 'website'},
            ]
        } );
    }

    @Watch('tagId')
    async onChangedTagId() {
        const result = await this.$api.tagged( this.tagId );
        if( result.tag ) {
            this.tag = result.tag;
        }
        if( result.games ) {
            this.games = result.games;
        }
    }

    beforeDestroy() {
        this.$store.commit('headerBgTransparent', false );

        if(this.metaSetting) {
            this.metaSetting.reset();
            this.metaSetting = null;
        }
    }

    onVisibleItem( index :  number ) {

    }
};
</script>
<style scoped lang="scss">
@import "./../css/quasar.variables";

.tagName {
    font-size: 18px;
    font-weight: bold;
}


.page {
    top: -50px;

    .tagName {
        text-align: left;
        padding-left: 10px;
        font-size: 24px;
        font-weight: bold;
    }

}



</style>
