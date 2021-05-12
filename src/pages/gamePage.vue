<template>
    <q-page
        class="items-center justify-evenly text-center"
        :class="$q.platform.is.desktop ? 'page game-container' : 'maxWidth'"
    >
        <tagbutton v-if="$q.platform.is.desktop"></tagbutton>
        <div class="main-container">
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
                v-model="$route.query.tag"
                dense
                class="text-grey tabs game-tab text-h5"
                active-color="white"
                indicator-color="white"
                align="left"
            >
                <q-route-tab to="/gamePage?tag=game" :name="game"
                    >게임</q-route-tab
                >
                <q-route-tab to="/gamePage?tag=indie" :name="indie"
                    >인디 게임</q-route-tab
                >
            </q-tabs>
            <q-separator />
            <tagbutton v-if="$q.platform.is.mobile"></tagbutton>
            <sort-category
                v-on:@sortChange="sortChange"
                :list="list"
            ></sort-category>
            <div class="q-gutter-y-sm">
                <q-tab-panels
                    v-model="$route.query.tag"
                    class="text-white text-center"
                >
                    <q-tab-panel name="game">
                        <div class="q-pt-none">
                            <template
                                v-for="(featured, index) in featuredList"
                                v-if="featured.games.length"
                            >
                                <home-category
                                    :data="featured"
                                    :game-list="featured.games"
                                >
                                </home-category>
                                <div class="q-mb-xl"></div>
                                <div v-if="banners[index]"></div>
                            </template>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="indie">
                        <div class="q-pt-none">
                            <div
                                class="cardContainer"
                                v-if="$store.getters.isSearchGame"
                            >
                                <game-card
                                    v-for="(game, index) in $store.getters
                                        .searchGames"
                                    :key="index"
                                    :index="index"
                                    class="card"
                                    :data="game"
                                >
                                </game-card>

                                <!--                    <game-card v-for="game in $store.getters.searchGames" :data="game"></game-card>-->
                            </div>
                            <div class="cardContainer" v-else>
                                <game-card
                                    v-for="(game, index) in $store.getters
                                        .challengeGames"
                                    :key="index"
                                    :index="index"
                                    class="card"
                                    v-on:onVisible="onVisibleItem"
                                    :data="game"
                                >
                                </game-card>

                                <!--                    <game-card v-intersection="entry => onIntersection(index, entry)" v-for="(game,index) in $store.getters.noneOfficialGames" :data="game"></game-card>-->
                            </div>
                            <div
                                v-if="
                                    $store.getters.challengeGames.length === 0
                                "
                                class="cardContainer"
                            >
                                <game-card-skeleton
                                    v-for="(_, index) in 20"
                                    :key="index"
                                />
                            </div>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
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
import GameCardSkeleton from "components/common/card/gameCardSkeleton.vue";
import SortCategory from "components/main/sortCategory.vue";
import MainFooter from "components/main/mainFooter.vue";
import SearchGame from "components/common/searchGame.vue";
import { GameLoadState } from "src/store/modules/games";
import HomeCategory from "components/home/homeCategory.vue";
import { consoleLog } from "src/scripts/consoleLog";
import MetaSetting from "src/scripts/metaSetting";
import Tagbutton from "components/game/tagbutton.vue";

@Component({
    components: {
        HomeCategory,
        SearchGame,
        MainFooter,
        SortCategory,
        GameCardSkeleton,
        GenreCategory,
        GameCard,
        MainCarousel,
        Tagbutton,
    },
    // metaInfo() {
})
export default class GamePage extends Vue {
    private indie: string = "indie";
    private game: string = "game";
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

        await this.$store.dispatch("clearGames", 0);
        await this.$store.dispatch("loadGames", {
            category: 0,
            sort: this.sortData[this.sort].sort,
            dir: this.sortData[this.sort].dir,
        });
    }

    onVisibleItem(index: number) {
        const games = this.$store.getters.challengeGames;
        if (index < games.length - 1) {
            return;
        }
        if (this.$store.getters.challengeLoadState === GameLoadState.loaded) {
            this.$store.dispatch("loadGames", {
                category: 0,
                sort: this.sortData[this.sort].sort,
                dir: this.sortData[this.sort].dir,
            });
        }
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
.game-container {
    display: flex;
    align-items: flex-start;
}
.main-container {
    max-width: 1439px;
    flex: 2;
}
.header {
    height: 250px;
    display: flex;
    align-items: center;
}
.tab {
    height: 50px;
}
.q-tab-panel {
    background-color: #121212;
}
.adsbygoogle {
    flex: 0.5;
}
.game-tab .q-tab--active {
    border-bottom: 1px solid;
}
</style>
