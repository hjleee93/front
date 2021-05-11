<template>
    <q-page
        class="items-center justify-evenly text-center"
        :class="$q.platform.is.desktop ? 'page' : ''"
    >
        <div class="maxWidth">
            <div class="header text-left">
                <tr class="header-contents">
                    <td>
                        <q-img
                            src="/img/game_banner_icon.png"
                            width="77px"
                        ></q-img>
                    </td>

                    <td>
                        <div class="text-h4 text-bold">Find great games</div>
                        <div>조잘조잘</div>
                    </td>
                </tr>
            </div>
            <q-tabs
                v-model="tab"
                dense
                class="text-grey tabs"
                active-color="white"
                align="left"
                narrow-indicator
            >
                <q-tab name="game" label="게임" />
                <q-tab name="alarms" label="인디게임" />
            </q-tabs>
            <sort-category
                v-on:@sortChange="sortChange"
                :list="list"
            ></sort-category>
            <!-- <search-game></search-game> -->

            <div class="q-pt-none">
                <template
                    v-for="(featured, index) in featuredList"
                    v-if="featured.games.length"
                >
                    <home-category :data="featured" :game-list="featured.games">
                    </home-category>
                    <div class="q-mb-xl"></div>
                    <div v-if="banners[index]">
                        <!--                        <router-link :to="banners[index].link">-->
                        <!--                            <q-img :src="banners[index].src"></q-img>-->
                        <!--                        </router-link>-->
                    </div>
                </template>
            </div>
        </div>

        <ins
            class="adsbygoogle"
            style="display: inline-block; width: 468px; height: 60px"
            data-ad-client="ca-pub-2187650629390403"
            data-ad-slot="1069857092"
        ></ins>

        <!--        <ins class="adsbygoogle"-->
        <!--             style="display:block"-->
        <!--             data-ad-client="ca-pub-2187650629390403"-->
        <!--             data-ad-slot="4210825092"-->
        <!--             data-ad-format="auto"-->
        <!--             data-full-width-responsive="true"></ins>-->

        <main-footer></main-footer>
    </q-page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MainCarousel from "components/main/mainCarousel.vue";
import GameCard from "components/common/card/gameCard.vue";
import GenreCategory from "components/main/genreCategory.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import { GameLoadState } from "src/store/modules/games";
import HomeCategory from "components/home/homeCategory.vue";
import { consoleLog } from "src/scripts/consoleLog";
import MetaSetting from "src/scripts/metaSetting";

@Component({
    components: {
        HomeCategory,
        SearchGame,
        MainFooter,
        SortCategory,
        GenreCategory,
        GameCard,
        MainCarousel,
    },
    // metaInfo() {
})
export default class GamePage extends Vue {
    private tab:string = 'game'
    private list: any[] = [
        {
            name: "new",
            text: this.$t("sortCategory.text1") as string,
        },
        {
            name: "create",
            text: this.$t("sortCategory.text2") as string,
        },
        {
            name: "name",
            text: this.$t("sortCategory.text3") as string,
        },
        {
            name: "play",
            text: this.$t("sortCategory.text4") as string,
        },
        {
            name: "heart",
            text: this.$t("sortCategory.text5") as string,
        },
    ];

    private featuredList: any[] = [];
    private sort: string = "create";
    private sortData: {
        [name: string]: {
            sort: string;
            dir: string;
        };
    } = {
        new: { sort: "l", dir: "desc" },
        create: { sort: "c", dir: "asc" },
        name: { sort: "t", dir: "desc" },
        play: { sort: "p", dir: "asc" },
        heart: { sort: "h", dir: "asc" },
    };
    private banners: {
        src: string;
        link: string;
    }[] = [
        null,
        { src: "banner/banner1.png", link: "" },
        null,
        { src: "banner/banner2.png", link: "" },
    ];

    async mounted() {
        const result = await this.$api.featured();
        this.featuredList = result;
    }

    async sortChange(sort) {
        this.sort = sort;

        await this.$store.dispatch("clearGames", 1);
        await this.$store.dispatch("loadGames", {
            category: 1,
            sort: this.sortData[this.sort].sort,
            dir: this.sortData[this.sort].dir,
        });
    }
}
</script>

<style scoped>
.header {
    height: 250px;
    display: flex;
    align-items: center;
}
.tab {
    height: 50px;
}
</style>
