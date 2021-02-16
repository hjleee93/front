<template>
    <router-link class="card" :to="`/play/${data.pathname}`" v-intersection="entry => onIntersection(entry)"
    >
<!--        <div class="object3d" :class="isVisible?'visible':''">-->
        <div :class="isVisible?'visible':''">
            <div class="thumbBox">
<!--                <q-img class="base" :src="'img/default.png'"></q-img>-->
                <q-img class="base" src="http://placehold.it/150x100"></q-img>
                <q-img class="thumb video" :src="`${data.url_thumb_gif || data.url_thumb || 'img/default.png'}`">

                </q-img>
                <q-img class="thumb img" :src="`${data.url_thumb_webp || data.url_thumb || 'img/default.png'}`">

                </q-img>

                <div class="heartBox" v-if="data.category !== 2">
                    🧡 {{ data.count_heart.toLocaleString() }}
                </div>
            </div>

            <div class="row detail text-left q-mt-sm">
                <router-link class="q-mt-xs" :to="`/channel/${data.user.channel_id}`" v-if="data.user !== undefined">
                    <q-img class="developerLogo" :src="data.user.picture">
                    </q-img>
                </router-link>

                <div class="text q-ml-sm">
                    <strong
                        class="ellipsis block title">
                        {{ data.title }}
                    </strong>
                    <span
                        class="ellipsis block userName"
                        v-if="data.user !== undefined">
                        {{ data.user.name }}
                    </span>
                    <span
                        class="ellipsis block playCount"
                        v-if="data.category !== 2">
                        {{ countOverFormat(data.count_over)}} 플레이
                    </span>
                </div>

                <div class="more" :class="$q.platform.is.desktop ? 'desktop' : ''" v-if="data.user !== undefined">
                    <q-btn @click.prevent="more" flat dense color="bg-transparent" class="" key="btn_size_dense_rd_md" size="md">
                        <q-icon color="grey-5" name="more_vert"></q-icon>


                        <q-menu v-if="$q.platform.is.desktop">
                            <q-list>
                                <router-link :to="`/channel/${data.user.channel_id}`" v-if="data.user !== undefined">
                                    <q-item clickable>
                                        <q-item-section>
                                            <div class="row">
                                                <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>
                                                <div class="self-center">개발자 채널 가기</div>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </router-link>
<!--                                <q-item clickable class="" @click="popupReport = true; popup = false;">-->
<!--                                    <q-item-section>-->
<!--                                        <div class="row">-->
<!--                                            <q-icon name="report" class="self-center q-mr-sm"></q-icon>-->
<!--                                            <div>게임 신고 하기</div>-->
<!--                                        </div>-->
<!--                                    </q-item-section>-->
<!--                                </q-item>-->
                            </q-list>
                        </q-menu>


                        <q-dialog v-else v-model="popup">
                            <q-list class="bg-dark width90p maxWidth400px">
                                <router-link :to="`/channel/${data.user.channel_id}`" v-if="data.user !== undefined">
                                    <q-item clickable class="">
                                        <q-item-section>
                                            <div class="row">
                                                <!--                                            <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>-->
                                                <div class="self-center">개발자 채널 가기</div>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </router-link>
<!--                                <q-item clickable class="" @click="popupReport = true; popup = false;">-->
<!--                                    <q-item-section>-->
<!--                                        <div class="row">-->
<!--                                            &lt;!&ndash;                                            <q-icon name="report" class="self-center q-mr-sm"></q-icon>&ndash;&gt;-->
<!--                                            <div>게임 신고 하기</div>-->
<!--                                        </div>-->
<!--                                    </q-item-section>-->
<!--                                </q-item>-->
                                <q-item clickable class="" @click="popup = !popup">
                                    <q-item-section>
                                        <div class="row">
<!--                                            <q-icon name="report" class="self-center q-mr-sm"></q-icon>-->
                                            <div>취소</div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-dialog>
                    </q-btn>
                </div>
            </div>
        </div>
        <report-popup :visible="popupReport" v-on:@close="popupReport=false;"></report-popup>
    </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ReportPopup from "components/common/card/reportPopup.vue";
@Component({
    components: {ReportPopup}
})
export default class GameCard extends Vue {
    @Prop() private data : any;
    @Prop() private index : number;

    private isVisible : boolean = false;
    private popup : boolean = false;
    private popupReport : boolean = false;

    mounted() {
    }

    more() {
        if( this.$q.platform.is.mobile ) {
            this.popup = !this.popup;
        }
    }

    countOverFormat( countOver : number ) {
        return countOver >= 10000 ? Math.floor( countOver / 10000 ) + '만회' : countOver + '회'
    }

    onIntersection( entry ) {
        const isIntersecting = entry.isIntersecting;
        this.isVisible = isIntersecting;
        if( this.isVisible ) {
            this.$emit( 'onVisible', this.index );
        }
    }
}
</script>
<style scoped lang="scss">
@import "../../../css/quasar.variables";

a {
    color: inherit;
    text-decoration: none;
}

.object3d {
    transform : perspective( 1000px ) rotateY( 45deg );
    transition : transform 0.5s ease;
    &.visible {
        transform: perspective( 0 ) rotateY( 0 );

    }
}
.card {

    cursor: pointer;
    padding: 10px;
    //position: relative;
    //overflow: hidden;

    &:hover {
        .detail {
            .more.desktop {
                visibility: visible;
            }
        }

    }

    .detail {
        display: flex;
        justify-content: space-between;
        //position: absolute;
        //left: 0;
        //bottom : 0;
        //background-color: rgba(0, 0, 0, 0.7);
        //width: 100%;
        //padding: 6px;
        //border-radius: 0 0 6px 6px;

        .developerLogo {
            border-radius: 32px;
            width: 32px;
            height: 32px;
        }

        .text {
            //40 + 32 + 8(마진)
            width: calc(100% - 60px);
            display: inline-block;
            //margin-left: 10px
            .title {
                font-size: 1.2em;
            }
            .userName {
                color: #d0d0d0;
            }
            .playCount {
                color: #d0d0d0;
                font-size: 0.9em;
            }
        }

        .more {

            width: 20px;
            button {
                //width: 100%;
                width: 20px;
            }
        }

        .more.desktop {
            visibility: hidden;
        }
    }

    @media (max-width: $breakpoint-xs) {
        padding: 2px;

        .detail {
            .developerLogo {
                display: none;
            }
            .text {
                width: calc(100% - 28px);
                font-size: 12px;
            }
        }

    }

    @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
        padding: 5px;

    }


    .thumbBox {
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        display: flex;

        .base {
            width: 100%;
            height: 100%;
            visibility: hidden;
        }

        .thumb {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            //transform: translate(-50%, -50%);
            //transform: ;
            background-size: cover;
            background-repeat: no-repeat;
            //background-origin: content-box;

        }

        .img {
            transition: transform 0.15s linear, opacity 0.15s ease-out;
        }

        .video {
            position: absolute;
            transition: transform 0.15s linear;
        }

        &:hover {
            .video {
                transform: scale(1.1);

            }
            .img {
                transform: scale(1.1);
                opacity: 0;
            }
        }

        .heartBox {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.7);
            //min-width: 80px;
            height: 26px;
            padding: 0 8px;
            text-align: left;
            line-height: 26px;
            border-radius: 6px;
            bottom: 10px;
            right: 10px;
        }
    }


    //.card {
    //
    //    //transform: rotateY( 45deg );
    //}
    //
    //.visible {
    //    //transform:  rotateY( 0 );
    //    //transition: transform 1s ease-out;
    //}
}
</style>
