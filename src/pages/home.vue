<template>
    <q-page
        class="items-center justify-evenly text-center"
        :class="[
            $q.platform.is.desktop ? 'page' : '',
            $store.getters.searchBarOpen ? 'dim' : '',
        ]"
    >
        <main-carousel></main-carousel>

        <div class="maxWidth">
            <!--            <div>-->
            <!--                <div class="text-h3 text-weight-bold q-mt-xl q-mb-md">-->
            <!--                    HTML5 GAMES-->
            <!--                </div>-->
            <!--                <div class="text-h5 q-mt-md q-mb-xl">-->
            <!--                    고품질의 검증된 게임만을 유통하는 수익화 플랫폼!-->
            <!--                </div>-->
            <!--            </div>-->
            <!-- <q-btn class="more-gmaes-btn q-my-xl" label="더 많은 게임 보기" to="/gamePage?tag=game" /> -->
            <!-- <search-game></search-game> -->
            <div :class="$q.platform.is.desktop ? 'q-mb-xl' : 'q-mb-sm'"></div>
            <div class="q-pt-none section">
                <template
                    v-for="(featured, index) in featuredList"
                    v-if="featured.games.length"
                >
                    <home-category :data="featured" :game-list="featured.games">
                    </home-category>

                    <div v-if="banners[index]">
                        <!--                        <router-link :to="banners[index].link">-->
                        <!--                            <q-img :src="banners[index].src"></q-img>-->
                        <!--                        </router-link>-->
                    </div>
                </template>
            </div>

            <!-- swiper -->
            <swiper-carousel></swiper-carousel>
            <!-- swiper(E) -->
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

        <!-- about us -->
        <div class="maxWidth about-section">
            <span class="about-us">ABOUT US</span>
            <div class="short-seperator"></div>
            <template v-if="$q.platform.is.desktop">
                <div class="desc-section">
                    <q-img
                        src="img/aboutUs/computer_1.png"
                        class="about-img"
                    ></q-img>
                    <div class="description">
                        <div class="title q-mb-md">
                            {{ $t("home.aboutUs1.title") }}
                        </div>
                        <div style="text-align: left">
                            <div>{{ $t("home.aboutUs1.desc1") }}</div>
                        </div>
                    </div>
                </div>

                <div class="desc-section">
                    <div class="description">
                        <div class="title q-mb-md">
                            {{ $t("home.aboutUs2.title") }}
                        </div>
                        <div style="text-align: right">
                            <div>{{ $t("home.aboutUs2.desc1") }}</div>
                        </div>
                    </div>
                    <q-img
                        src="img/aboutUs/computer_2.png"
                        class="about-img"
                    ></q-img>
                </div>

                <div class="desc-section">
                    <q-img
                        src="img/aboutUs/computer_3.png"
                        class="about-img"
                    ></q-img>
                    <div class="description">
                        <div class="title q-mb-md">
                            {{ $t("home.aboutUs3.title") }}
                        </div>
                        <div style="text-align: left">
                            <div>{{ $t("home.aboutUs3.desc1") }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="desc-section mobile">
                    <q-img
                        src="img/aboutUs/computer_1.png"
                        class="about-img"
                    ></q-img>
                    <div class="description q-mb-xl">
                        <div class="title q-my-xl">
                            {{ $t("home.aboutUs1.title") }}
                        </div>
                        <div>
                            <div>{{ $t("home.aboutUs1.desc1") }}</div>
                        </div>
                    </div>
                </div>

                <div class="desc-section mobile">
                    <q-img
                        src="img/aboutUs/computer_2.png"
                        class="about-img"
                    ></q-img>
                    <div class="description q-mb-xl">
                        <div class="title q-my-xl">
                            {{ $t("home.aboutUs2.title") }}
                        </div>
                        <div>
                            <div>{{ $t("home.aboutUs2.desc1") }}</div>
                        </div>
                    </div>
                </div>

                <div class="desc-section mobile">
                    <q-img
                        src="img/aboutUs/computer_3.png"
                        class="about-img"
                    ></q-img>
                    <div class="description q-mb-xl">
                        <div class="title q-my-xl">
                            {{ $t("home.aboutUs3.title") }}
                        </div>
                        <div>
                            <div>{{ $t("home.aboutUs3.desc1") }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <!-- about us (E) -->
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

@Component<Home>({
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
    //     return {
    //         // titleTemplate: '%s ← My Site',
    //         meta: [
    //             { name: 'description', content: '직접 만든 게임을 업로드하고, 플레이하고, 주변에 공유해 보세요. 개발 방법을 모르는 분들을 위한 템플릿도 준비되어 있습니다.', vmid: 'description' },
    //             { name: 'keywords', content: '젬파이, zempie, 게임, game, html5 game, html5 게임, 웹게임, 게임공유, 게임 플랫폼' },
    //             { name: 'author', content: 'FromTheRed' },
    //             { property: 'og:url', content: `${this.$store.getters.VUE_APP_ZEMPIE_URL}/home`, vmid: 'og:url' },
    //             { property: 'og:site_name', content: 'Zempie - 웹 게임 공유 플랫폼', vmid: 'og:site_name' },
    //             { property: 'og:title', content: '누구나 업로드할 수 있는 게임공유플랫폼 ZEMPIE',  template: chunk => `${chunk} - My page`, vmid: 'og:title' },
    //             { property: 'og:description', content: '직접 만든 게임을 업로드하고, 플레이하고, 주변에 공유해 보세요. 개발 방법을 모르는 분들을 위한 템플릿도 준비되어 있습니다.', vmid: 'og:description' },
    //             { property: 'og:image', content: '', vmid: 'og:image' },
    //             { property: 'og:type', content: 'website', vmid: 'og:type' },
    //         ]
    //     }
    // }
})
export default class Home extends Vue {
    private featuredList: any[] = [];
    private banners: {
        src: string;
        link: string;
    }[] = [
        null,
        { src: "banner/banner1.png", link: "" },
        null,
        { src: "banner/banner2.png", link: "" },
    ];

    private metaSetting: MetaSetting;

    private options = {
        controlArrows: true,
        scrollBar: true,
    };

    async mounted() {
        // document.title = this.$t('pageTitle.home') as string;

        this.metaSetting = new MetaSetting({
            title: `${this.$t("pageTitle.home")} | Zempie.com`,
            meta: [
                {
                    name: "description",
                    content: `${this.$t("pageDescription.home")}`,
                },
                {
                    property: "og:url",
                    content: `${this.$store.getters.VUE_APP_ZEMPIE_URL}home`,
                },
                {
                    property: "og:title",
                    content: `${this.$t("pageTitle.home")} | Zempie.com`,
                },
                {
                    property: "og:description",
                    content: `${this.$t("pageDescription.home")}`,
                },
                // { property: 'og:image', content: '' },
            ],
        });

        this.$store.commit("headerBgTransparent", true);
        this.$store.commit("navTab", "Home");

        const result = await this.$api.featured();
        console.log(result);
        this.featuredList = result;

        this.$nextTick(() => {
            document
                .querySelectorAll(".adsbygoogle")
                .forEach((element: Element) => {
                    if (element.getAttribute("data-ad-slot")) {
                        //@ts-ignore
                        (window.adsbygoogle || []).push({});
                    }
                });
        });

        // this.$store.commit('isOfficialPage', true);
        // await this.$store.dispatch('clearGames', 1);
        // await this.$store.dispatch('loadGames', {
        //     official : 1,
        //     sort : this.sortData[ this.sort ].sort,
        //     dir : this.sortData[ this.sort ].dir
        // });
    }

    beforeDestroy() {
        this.$store.commit("headerBgTransparent", false);

        if (this.metaSetting) {
            this.metaSetting.reset();
            this.metaSetting = null;
        }
    }
}
</script>
<style scoped lang="scss">
@import "./../css/quasar.variables";

.page {
    top: -50px;
}
.home-info {
    display: inline-block;
    width: 40%;
}
.carousel-img {
    display: inline-block;
    width: 60%;
}
.carousel-img .off {
    display: none;
}
.home-bottom {
    display: flex;
}
.develop-btn {
    display: inline-block;
}
.carousel-tab {
    height: 20%;
    color: #4545459a;
    font-weight: 700;
    font-size: 18px;
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
}
.carousel-tab .active {
    color: #454545;
}
.carousel-mid {
    height: 80%;
    width: 100%;
    text-align: left;
    padding-left: 10%;
    font-size: 2rem;
    color: #454545;
}
.carousel-btn {
    color: #454545;
    background-color: #e89414;
    width: 130px;
    border-radius: 30px;
}
.more-gmaes-btn {
    color: #454545;
    background-color: #e89414;
    width: 200px;
    border-radius: 30px;
    font-size: 18px;
}
.dim {
    transition: all 0.5s;
    opacity: 0.5;
    background-color: rgb(0, 0, 0);
}

//about us

.about-section {
    .short-seperator {
        width: 30px;
        border-bottom: 3px solid #ededed;
        margin: 20px auto 20px auto;
    }
    .title {
        font-size: 25px;
        font-weight: bold;
    }
    .about-us {
        font-weight: bold;
        font-size: 40px;
    }
    .my-card {
        width: 33%;
        display: inline-block;
    }
    .desc-section {
        width: 70%;
        margin: 0 auto;
        display: inline-block;
        .about-img {
            width: 40%;

            // border: 1px solid #ededed;
        }
        .description {
            font-size: 16px;
            width: 60%;
            display: inline-block;
            vertical-align: middle;

            // border: 1px solid #ededed;
        }
    }
    .desc-section.mobile {
        width: 90%;
        .about-img {
            width: 65%;
        }
        .description {
            width: 100%;
        }
    }
}
</style>
