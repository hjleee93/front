<template>
    <q-carousel
        v-if="$q.platform.is.desktop"
        class="text-white shadow-1"
        v-model="slide"

        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        :navigation="navigation"
        padding
        arrows
        height="300px"
    >
        <q-carousel-slide name="game" class="column no-wrap flex-center" img-src="banner/img-main-banner-03.png">
            <div class="width100p maxWidth text-left q-pt-lg">
                <div class="text-h4 text-weight-bold">
                    {{ $t('affiliateCarousel.main') }}
                </div>
                <div class="text-h6">
                    {{ $t('affiliateCarousel.sub') }}
                </div>
            </div>
        </q-carousel-slide>
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

@Component
export default class AffiliateCarousel extends Vue {
    private slide: string = 'game';
    private navigation : boolean = false;
}
</script>
