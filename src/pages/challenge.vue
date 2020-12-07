<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <challenge-carousel></challenge-carousel>
        <div class="maxWidth">
<!--            <genre-category></genre-category>-->
<!--            <q-separator inset/>-->
<!--            <sort-category></sort-category>-->
            <search-game></search-game>
            <div class="q-pt-none">
                <div class="cardContainer">
                    <game-card v-for="game in $store.getters.searchGames" :data="game"></game-card>
                </div>
            </div>
        </div>
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

@Component({
    components: {SearchGame, ChallengeCarousel, MainFooter, SortCategory, GenreCategory, GameCard}
})
export default class Home extends Vue {

    mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Minor');
        this.$store.commit('crtOriginGames', this.$store.getters.noneOfficialGames );
        this.$store.commit('searchGames', this.$store.getters.noneOfficialGames );
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
