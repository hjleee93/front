<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
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

@Component({
    components: {SearchGame, MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel}
})
export default class SearchResult extends Vue {

    @Prop() private tagId : string;

    private tag : string = '';
    private games : any[] = [];


    async mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'SearchResult');

        const result = await this.$api.tagged( this.tagId );

        if( result.tag ) {
            this.tag = result.tag;
        }
        if( result.games ) {
            this.games = result.games;
        }

        document.querySelectorAll('.adsbygoogle').forEach(  (element : Element) => {
            if(element.getAttribute('data-ad-slot')) {
                //@ts-ignore
                (window.adsbygoogle || []).push({});
            }
        } )
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
