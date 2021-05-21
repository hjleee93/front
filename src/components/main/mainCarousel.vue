<template>
    <q-carousel
        class="text-white shadow-1 carouselContainer"
        :class="$q.platform.is.desktop ? 'carouselContainer' : 'carouselMobileContainer'"
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        :navigation="navigation"
        padding
        ref="parent"
    >
        <template v-if="$q.platform.is.desktop">
            <q-carousel-slide
                name="game"
                class="column no-wrap flex-center relative-position no-padding"
                img-src=""
            >
                <q-img src="game/gamebg.png" class="gameBg"></q-img>
                <div class="mainView bg-zem">
                    <q-img src="img/img_sun.png" class="sun" />
                    <q-img src="img/img_char.png" class="char" />

                    <div class="text text-center">
                        <div class="mainText">
                            {{ $t("mainCarousel.slide.main") }}
                        </div>

                        <div class="subText1">
                            {{ $t("mainCarousel.slide.sub1") }}
                        </div>

                        <div class="subText2">
                            {{ $t("mainCarousel.slide.sub2") }}
                        </div>
                    </div>
                </div>

                <!--            <q-img src="game/gamebg.png" class="gameBg"></q-img>-->
                <!--            <div class="width100p maxWidth text-left">-->
                <!--                <div>-->
                <!--                    <iframe class="game" src="game/kr/index.html"></iframe>-->
                <!--                </div>-->
                <!--                <div class="info">-->
                <!--                    <div class="text  q-pl-lg">-->
                <!--                        <div class="text-h4 text-weight-bold">-->
                <!--                            {{ $t('mainCarousel.slide1.main') }}-->
                <!--                        </div>-->
                <!--                        <div class="text-h6">-->
                <!--                            {{ $t('mainCarousel.slide1.sub') }}-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
            </q-carousel-slide>
        </template>
        <template v-else>
            <q-carousel-slide
                name="game"
                class="column no-wrap flex-center relative-position no-padding mobile"
                img-src=""
            >
                <q-img src="game/gamebg.png" class="gameBg"></q-img>
                <div class="mainView bg-zem">
                    <q-img src="img/img_sun.png" class="sun" />
                    <q-img src="img/img_char.png" class="char" />

                    <div class="text text-center text-container">
                        <div class="mainText">
                            {{ $t("mainCarousel.slide.main") }}
                        </div>
                    </div>
                </div>
            </q-carousel-slide>
        </template>
        <!--        <q-carousel-slide name="game2" class="column no-wrap flex-center relative-position no-padding" img-src="">-->
        <!--            <q-img src="game/gamebg.png" class="gameBg"></q-img>-->
        <!--            <div class="width100p maxWidth text-left">-->
        <!--                <div>-->
        <!--                    <iframe class="game" src="game/alpaca/index.html"></iframe>-->
        <!--                </div>-->
        <!--                <div class="info">-->
        <!--                    <div class="text  q-pl-lg">-->
        <!--                        <div class="text-h4 text-weight-bold">-->
        <!--                            {{ $t('mainCarousel.slide1.main') }}-->
        <!--                        </div>-->
        <!--                        <div class="text-h6">-->
        <!--                            {{ $t('mainCarousel.slide1.sub') }}-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->

        <!--        <q-carousel-slide name="game3" class="column no-wrap flex-center relative-position no-padding" img-src="">-->
        <!--            <q-img src="game/gamebg.png" class="gameBg"></q-img>-->
        <!--            <div class="width100p maxWidth text-left">-->
        <!--                <div>-->
        <!--                    <iframe class="game" src="game/totembreaker/index.html"></iframe>-->
        <!--                </div>-->
        <!--                <div class="info">-->
        <!--                    <div class="text  q-pl-lg">-->
        <!--                        <div class="text-h4 text-weight-bold">-->
        <!--                            {{ $t('mainCarousel.slide1.main') }}-->
        <!--                        </div>-->
        <!--                        <div class="text-h6">-->
        <!--                            {{ $t('mainCarousel.slide1.sub') }}-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->

        <!--        <q-carousel-slide name="game2" class="column no-wrap flex-center" img-src="banner/img-main-banner-03.png">-->
        <!--            <div class="width100p maxWidth text-left q-pt-lg">-->
        <!--                <div class="text-h4 text-weight-bold">-->
        <!--                    고퀄리티 캐주얼 게임-->
        <!--                </div>-->
        <!--                <div class="text-h6">-->
        <!--                    누구나 무료로 게임을 즐겨 보세요!-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->

        <!--        <q-carousel-slide name="tv" class="column no-wrap flex-center" img-src="/banner/img-main-banner-03.png">-->
        <!--            <q-icon name="live_tv" size="56px"/>-->
        <!--            <div class="q-mt-md text-center">-->
        <!--                {{ lorem }}-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->
        <!--        <q-carousel-slide name="layers" class="column no-wrap flex-center" img-src="/banner/img-main-banner-01.png">-->
        <!--            <q-icon name="layers" size="56px"/>-->
        <!--            <div class="q-mt-md text-center">-->
        <!--                {{ lorem }}-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->
        <!--        <q-carousel-slide name="map" class="column no-wrap flex-center" img-src="/banner/img-main-banner-03.png">-->
        <!--            <q-icon name="terrain" size="56px"/>-->
        <!--            <div class="q-mt-md text-center">-->
        <!--                {{ lorem }}-->
        <!--            </div>-->
        <!--        </q-carousel-slide>-->
    </q-carousel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { randomInt } from "src/scripts/util";

@Component
export default class mainCarousel extends Vue {
    private gameList: string[] = [
        "game",
        // 'game2',
        // 'game3'
    ];

    private slide: string = "game2";
    private navigation: boolean = false;

    // private height : string = '300px';

    mounted() {
        this.slide = this.gameList[randomInt(0, this.gameList.length)];
    }

    onResize() {}
}
</script>
<style scoped lang="scss">
.carouselContainer {
    position: relative;
    width: 100%;
    //height: 100%;
    //max-height: 320px;
    height: 320px;
    background-color: black;

    .game {
        width: 100%;
        height: 100%;
        border: 0;
        position: absolute;
        left: 0;
        top: 0;
    }

    .gameBg {
        max-height: 320px;
        width: 100%;
    }

    .mainView {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;

        .sun {
            position: absolute;
            width: 280px;
            height: 280px;
            left: 150px;
            top: -70px;

            @media (max-width: $breakpoint-xs) {
                width: 70px;
                height: 70px;
                left: 37px;
                top: 0;
            }

            @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                width: 140px;
                height: 140px;
                left: 75px;
                top: 0;
            }
            @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
                width: 210px;
                height: 210px;
                left: 150px;
                top: -30px;
            }
        }

        .char {
            position: absolute;
            width: 820px;
            height: 400px;
            right: 0;
            bottom: -50px;

            @media (max-width: $breakpoint-xs) {
                width: 205px;
                height: 100px;
                right: 0;
                bottom: 0;
            }

            @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                width: 420px;
                height: 200px;
                right: 0;
                bottom: 0;
            }
            @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
                width: 615px;
                height: 300px;
                right: 0;
                bottom: -20px;
            }
        }

        .text {
            position: relative;
            z-index: 100;
            margin-top: 110px;

            .mainText {
                
                font-size: 64px;
            }
            .subText1 {
                font-size: 28px;
            }
            .subText2 {
                font-size: 20px;
            }

            @media (max-width: $breakpoint-xs) {
                margin-top: 70px;
                .mainText {
                    font-size: 40px;
                }
                .subText1 {
                    font-size: 16px;
                    padding: 0 40px;
                }
                .subText2 {
                    font-size: 14px;
                    padding: 0 40px;
                }
            }

            @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                .mainText {
                    font-size: 50px;
                }
                .subText1 {
                    font-size: 20px;
                }
                .subText2 {
                    font-size: 18px;
                }
            }
            @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
                .mainText {
                    font-size: 50px;
                }
                .subText1 {
                    font-size: 22px;
                }
                .subText2 {
                    font-size: 18px;
                }
            }
        }
    }

    .info {
        position: absolute;
        top: 50%;
        user-select: none;

        .text-h4 {
            //font-size: 20wv;/
            font-size: 5vw;
            line-height: initial;

            @media (min-width: 720px) {
                font-size: 30px;
            }
        }

        .text-h6 {
            font-size: 3vw;
            line-height: initial;
            @media (min-width: 720px) {
                font-size: 20px;
            }
        }
    }
}
.carouselMobileContainer{
    height: 160px;
}
.mobile {
   
    .mainText{
        text-align: left;
        // font-family: "ARLRDBD";
    
    }
    .text-container{
        margin-top: 20px !important;
        margin-left:10px !important;
    }
}
</style>
