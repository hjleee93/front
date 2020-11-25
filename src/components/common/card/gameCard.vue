<template>
    <div class="card" @click="$router.push( `/play/${data.pathname}` )">

        <div class="thumbBox">
            <q-img class="thumb" :src=data.url_thumb alt="">
            </q-img>
        </div>


        <div class="row detail text-left q-mt-sm">
            <q-img class="developerLogo self-center" :src="data.user.picture" @click.stop="$router.push( `/channel/${$store.getters.user.channel_id}` )">
            </q-img>

            <div class="text q-ml-sm">
                <strong
                    class="ellipsis block">
                    {{data.title}}
                </strong>
                <span
                    class="ellipsis block">
                        {{data.user.name}}
                </span>
            </div>

            <div class="more">
                <q-btn @click.stop="more">
                    <q-icon color="grey-5" name="more_vert"></q-icon>


                    <q-menu v-if="$q.platform.is.desktop">
                        <q-list>
                            <q-item clickable @click="$router.push(`/channel/${data.user.channel_id}`)">
                                <q-item-section>
                                    <div class="row">
                                        <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>
                                        <div class="self-center">개발자 채널 가기</div>
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item clickable class="">
                                <q-item-section>
                                    <div class="row">
                                        <q-icon name="report" class="self-center q-mr-sm"></q-icon>
                                        <div>게임 신고 하기</div>
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>


                    <q-dialog v-else v-model="popup">
                        <q-list class="bg-dark width90p maxWidth400px">
                            <q-item clickable class="" @click="$router.push(`/channel/${data.user.channel_id}`)">
                                <q-item-section>
                                    <div class="row">
                                        <!--                                            <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>-->
                                        <div class="self-center">개발자 채널 가기</div>
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item clickable class="">
                                <q-item-section>
                                    <div class="row">
                                        <!--                                            <q-icon name="report" class="self-center q-mr-sm"></q-icon>-->
                                        <div>게임 신고 하기</div>
                                    </div>
                                </q-item-section>
                            </q-item>
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class GameCard extends Vue {
    @Prop() private data : any;

    private popup : boolean = false;

    //     {
    //     thumb : 'https://s3.ap-northeast-2.amazonaws.com/zeminiplay.com/games/imgs/4owsAkv8S.png',
    //     title : 'Shark Frenzy',
    //     developer : {
    //         name : 'fromTheRed',
    //         thumb : 'https://zemini.s3.ap-northeast-2.amazonaws.com/companies/FTR_Symbol.png',
    //     },
    // };

    mounted() {
    }

    more() {
        if( this.$q.platform.is.mobile ) {
            this.popup = !this.popup;
        }
    }
}
</script>
<style scoped lang="scss">
@import "../../../css/quasar.variables";

.card {
    cursor: pointer;
    padding: 10px;

    .detail {
        .developerLogo {
            border-radius: 32px;
            width: 32px;
            height: 32px;
        }

        .text {
            //40 + 32 + 8(마진)
            width: calc(100% - 72px);
            display: inline-block;
            //margin-left: 10px
        }

        .more {
            width: 32px;
            button {
                width: 100%;
            }
        }
    }

    @media (max-width: $breakpoint-xs) {
        padding: 2px;

        .detail {
            .developerLogo {
                display: none;
            }
            .text {
                width: calc(100% - 40px);
                font-size: 12px;
            }
        }

    }

    @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
        padding: 5px;

    }


    .thumbBox {
        overflow: hidden;
        border-radius: 6px;

        .thumb {
            transition: transform 0.15s linear;
            &:hover {
                //transition: tra;
                transform: scale(1.1);
            }
        }
    }






}
</style>
