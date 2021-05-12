<template>
    <div :class="$q.platform.is.desktop ? 'slider-desktop' : 'slider-mobile'">
        <div class="slider-main">
            <q-tabs
                v-model="slide"
                class="text-grey slider-tab"
                active-color="black"
                indicator-color="primary"
                align="justify"
            >
                <q-tab name="developer" label="FOR DEVELOPER" />
                <q-tab name="publisher" label="FOR PUBLISHER" />
            </q-tabs>
            <q-carousel
                v-model="slide"
                transition-prev="jump-right"
                transition-next="jump-left"
                swipeable
                animated
                control-color="black"
                navigation-icon="radio_button_unchecked"
                navigation
                padding
                height="260px"
                class="bg-white"
            >
                <q-carousel-slide
                    name="developer"
                    class="column no-wrap flex-center"
                >
                    <div class="carousel-mid q-mt- text-center text-h6">
                        자랑해보세요!<br />

                        내가만든 게임을 <br />전세계에 알리기<br />

                        <q-btn
                            class="carousel-btn"
                            @click="showModal()"
                            label="바로가기"
                        />
                        <entry-modal v-if="modal" @close="modal = false" />
                    </div>
                </q-carousel-slide>
                <q-carousel-slide
                    name="publisher"
                    class="column no-wrap flex-center"
                >
                    <div class="carousel-mid q-mt-md text-center">
                        퍼블리셔용<br />

                        <q-btn class="carousel-btn" label="바로가기" />
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>

        <template v-if="$q.platform.is.desktop">
            <div class="slider-img">
                <q-carousel
                    v-model="slide"
                    transition-prev="jump-right"
                    transition-next="jump-left"
                    swipeable
                    animated
                    control-color="black"
                    padding
                    height="300px"
                    class="bg-white"
                >
                    <q-carousel-slide
                        name="developer"
                        img-src="img/developer.png"
                    >
                    </q-carousel-slide>
                    <q-carousel-slide
                        name="publisher"
                        img-src="img/publisher.png"
                    >
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import EntryModal from "components/studio/entryModal.vue";

@Component({ components: { EntryModal } })
export default class carouselSlider extends Vue {
    private slide = "developer";

    private modal: boolean = false;

    showModal() {
        if (this.$store.getters.user !== null) {
            if (this.$store.getters.user.is_developer === true) {
                window.location.href = this.$store.getters.studioUrl;
            } else {
                this.modal = true;
            }
        } else {
            this.modal = true;
        }
    }
}
</script>

<style scoped>
.slider-main {
    display: inline-block;
    width: 40%;
}
.slider-img {
    display: inline-block;
    width: 60%;
}
.slider-desktop {
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
.slider-tab {
    height: 40px;
    background-color: #fff;
}
.slider-tab .q-hoverable:hover {
    background-color: #fff;
}
.slider-mobile .slider-main {
    width: 100%;
}
</style>
