<template>
    <q-page class="items-center justify-evenly text-center"
            :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <main-carousel></main-carousel>
        <div class="maxWidth">
            <genre-category></genre-category>
            <q-separator inset/>
            <sort-category></sort-category>
            <div class="q-pt-none">
                <div class="cardContainer">
                    <game-card v-for="game in $store.getters.games" :data="game"></game-card>
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

@Component({
    components: {MainFooter, SortCategory, GenreCategory, GameCard, MainCarousel}
})
export default class Home extends Vue {

    mounted() {
        this.$store.commit('headerBgTransparent', true );
        this.$store.commit('navTab', 'Major');
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
