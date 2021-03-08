<template>
    <div class="homeCategory">
        <div class="top row justify-between">
            <div class="title">
                {{ data.name }}
            </div>
<!--            <router-link v-if="data.key === 'official'" to="/official" class="q-mr-lg self-center"> 더 보기 </router-link>-->
<!--            <router-link v-else-if="data.key === 'unofficial'" to="/challenge" class="q-mr-lg self-center"> 더 보기 </router-link>-->
<!--            <router-link v-else-if="data.key === 'puzzle'" to="/official" class="q-mr-lg self-center"> 더 보기 </router-link>-->
<!--            <router-link v-else-if="data.key === 'sports'" to="/official" class="q-mr-lg self-center"> 더 보기 </router-link>-->
        </div>
        <div class="body">
            <div class="gameList" ref="scrollArea">
                <game-card v-for="(game, index) in gameList"
                           class="homeCard"
                           :key="index"
                           :index="index"
                           :data="game">
                </game-card>
            </div>
            <div class="ctrl">
                <q-btn class="button prev" @click="prev" v-show="isPrev"><q-icon name="arrow_back_ios"></q-icon></q-btn>
                <q-btn class="button next" @click="next" v-show="isNext"><q-icon name="arrow_forward_ios"></q-icon></q-btn>
            </div>
        </div>
        <div class="more">
            <router-link v-if="data.key === 'official'" to="/official" class="q-mr-lg self-center moreGameBtn">{{ $t('homeCategory.moreGame.official') }}</router-link>
            <router-link v-else-if="data.key === 'unofficial'" to="/challenge" class="q-mr-lg self-center moreGameBtn">{{ $t('homeCategory.moreGame.challenge') }}</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.homeCategory {
    text-align: left;

    a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
    }

    .top {
        .title {
            font-size: 28px;
            font-weight: bold;
            margin-left: 10px;

            @media (max-width: $breakpoint-xs) {
                //margin-left: 10px;
                font-size: 20px;
            }

            @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                //margin-left: 10px;
                font-size: 24px;
            }

            .subTitle {
                font-size: 22px;
                color: rgba(255, 255, 255, 0.5);

                @media (max-width: $breakpoint-xs) {
                    font-size: 12px;
                }

                @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                    font-size: 18px;
                }
            }
        }
    }

    .body {
        position: relative;

        .gameList {
            transition: all 0.5s ease;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat( 1000, 20% );
            @media (max-width: $breakpoint-xs) {
                grid-template-columns: repeat( 100, 33.33% );
            }

            @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                grid-template-columns: repeat( 100, 25% );
            }
        }

        .ctrl {
            height: 100%;

            .button {
                font-size: 18px;

                @media (max-width: $breakpoint-xs) {
                    font-size: 5px;
                }

                @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
                    font-size: 12px;
                }
            }



            .prev {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
            }
            .next {
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
            }
        }
    }

    .more {
        width: 100%;
        display: flex;
        justify-content: center;

        .moreGameBtn {
            display: block;
            width: 160px;
            height: 40px;
            margin: 10px 0;
            border-radius: 20px;
            border: 2px solid white;
            text-align: center;
            line-height: 40px;
        }
    }

}
</style>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import GameCard from "components/common/card/gameCard.vue";

@Component({
    components: {GameCard}
})
export default class HomeCategory extends Vue {

    @Prop() private data : any;
    @Prop() private gameList : any[];

    private scrollArea : HTMLDivElement = null;

    private observer : MutationObserver = null;

    private animationId : number = 0;
    private preTime : number = 0;
    private maxTime : number = 0;

    private addWidth : number = 0;
    private scrollLeft : number = 0;
    private cardWidth : number = 0;

    private isPrev : boolean = false;
    private isNext : boolean = false;

    mounted() {
        this.scrollArea = this.$refs.scrollArea as HTMLDivElement;

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach( (mutation) => {
                this.updateButton();
            });
        });

        const config = { attributes: true, childList: true, characterData: true };
        this.observer.observe( this.scrollArea, config );

        window.addEventListener('resize', this.resize);
        window.addEventListener('load', this.updateButton);
        this.updateButton();
    }

    beforeDestroy() {
        this.observer.disconnect();
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('load', this.updateButton);
    }

    @Watch('gameList')
    private watchGameList() {
        this.updateButton();
    }

    updateButton() {
        this.isPrev = this.scrollArea.scrollLeft  > 0;
        this.isNext = this.scrollArea.scrollLeft + this.scrollArea.offsetWidth < this.scrollArea.scrollWidth;
    }

    prev() {

        if( this.animationId ) {
            return;
        }

        const time = 0.2;

        const node = this.scrollArea.childNodes[0] as HTMLElement;
        this.cardWidth = node.offsetWidth;
        this.scrollLeft = this.scrollArea.scrollLeft;

        this.addWidth = -this.cardWidth / time;

        const idx = this.scrollArea.scrollLeft / this.cardWidth;
        if( idx % 1 > 0 ) {
            const ceil = Math.floor( idx );
            this.addWidth = ((this.cardWidth * ceil) - this.scrollArea.scrollLeft) / time;
        }


        this.preTime = Date.now();
        this.maxTime = this.preTime + (1000 * time);
        this.animationId = requestAnimationFrame( this.animate );
    }

    next() {
        if( this.animationId ) {
            return;
        }
        const node = this.scrollArea.childNodes[0] as HTMLElement;
        this.cardWidth = node.offsetWidth;

        if( this.scrollArea.scrollLeft + this.scrollArea.offsetWidth >= this.scrollArea.scrollWidth  ) {
            return;
        }

        const time = 0.2;
        this.addWidth = this.cardWidth / time;
        this.scrollLeft = this.scrollArea.scrollLeft;

        const idx = this.scrollArea.scrollLeft / this.cardWidth;
        if( idx % 1 > 0 ) {
            const ceil = Math.ceil( idx );
            this.addWidth = ((this.cardWidth * ceil) - this.scrollArea.scrollLeft) / time;
        }

        this.preTime = Date.now();
        this.maxTime = this.preTime + (1000 * time);
        this.animationId = requestAnimationFrame( this.animate );
    }

    resize() {
        const node = this.scrollArea.childNodes[0] as HTMLElement;
        if( node ) {
            const idx = this.scrollArea.scrollLeft / this.cardWidth;
            this.scrollArea.scrollLeft = idx * node.offsetWidth;
            this.cardWidth = node.offsetWidth;
            this.updateButton();
        }


        // this.scrollArea.scrollLeft = this.startIdx * rect.width;
    }

    animate() {
        const time = Date.now();
        const delta = (time - this.preTime) / 1000;

        if( time >= this.maxTime ) {
            const delta2 = (this.maxTime - this.preTime) / 1000;
            this.scrollLeft += this.addWidth * delta2;
            this.scrollArea.scrollLeft = this.scrollLeft;

            cancelAnimationFrame(this.animationId);
            this.animationId = 0;
            this.updateButton();
        }
        else {
            this.preTime = time;
            this.scrollLeft += this.addWidth * delta;
            this.scrollArea.scrollLeft = this.scrollLeft;
            this.animationId = requestAnimationFrame( this.animate );
        }
    }
}
</script>
