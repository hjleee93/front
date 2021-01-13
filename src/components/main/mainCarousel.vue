<template>
    <q-carousel
        class="text-white shadow-1 carouselContainer"
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

        <q-carousel-slide name="game" class="column no-wrap flex-center relative-position no-padding" img-src="">
            <q-img src="game/gamebg.png" class="gameBg"></q-img>
            <div class="width100p maxWidth text-left">
                <div>
                    <iframe class="game" src="game/kr/index.html"></iframe>
                </div>
                <div class="info">
                    <div class="text  q-pl-lg">
                        <div class="text-h4 text-weight-bold">
                            고퀄리티 캐주얼 게임
                        </div>
                        <div class="text-h6">
                            누구나 무료로 게임을 즐겨 보세요!
                        </div>
                    </div>
                </div>
            </div>
        </q-carousel-slide>

        <q-carousel-slide name="game2" class="column no-wrap flex-center relative-position no-padding" img-src="">
            <q-img src="game/gamebg.png" class="gameBg"></q-img>
            <div class="width100p maxWidth text-left">
                <div>
                    <iframe class="game" src="game/alpaca/index.html"></iframe>
                </div>
                <div class="info">
                    <div class="text  q-pl-lg">
                        <div class="text-h4 text-weight-bold">
                            고퀄리티 캐주얼 게임
                        </div>
                        <div class="text-h6">
                            누구나 무료로 게임을 즐겨 보세요!
                        </div>
                    </div>
                </div>
            </div>
        </q-carousel-slide>

        <q-carousel-slide name="game3" class="column no-wrap flex-center relative-position no-padding" img-src="">
            <q-img src="game/gamebg.png" class="gameBg"></q-img>
            <div class="width100p maxWidth text-left">
                <div>
                    <iframe class="game" src="game/totembreaker/index.html"></iframe>
                </div>
                <div class="info">
                    <div class="text  q-pl-lg">
                        <div class="text-h4 text-weight-bold">
                            고퀄리티 캐주얼 게임
                        </div>
                        <div class="text-h6">
                            누구나 무료로 게임을 즐겨 보세요!
                        </div>
                    </div>
                </div>
            </div>
        </q-carousel-slide>

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
import {Vue, Component, Prop} from 'vue-property-decorator';
import {randomInt} from "src/scripts/util";

@Component
export default class mainCarousel extends Vue {

    private gameList : string[] = [
        'game',
        'game2',
        'game3'
    ];

    private slide: string = 'game2';
    private navigation : boolean = false;

    // private height : string = '300px';


    mounted() {
        this.slide = this.gameList[ randomInt( 0, this.gameList.length ) ];
    }





    onResize() {
    }


}
</script>
<style scoped lang="scss">

    .carouselContainer {

        position: relative;
        width: 100%;
        height: 100%;
        background-color: black;

        .game {
            width: 100%;
            height: 100%;
            border: 0;
            position: absolute;
            left: 0;
            top:0;
        }

        .gameBg {
            max-height: 250px;
            width: 100%;
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



</style>
