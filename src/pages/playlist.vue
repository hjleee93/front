<template>
    <q-page>
        <div class="maxWidth">
<!--            <q-list>-->
<!--                <q-item clickable v-for="game in games" :key="game.id" class="listItem">-->
<!--                    <q-item-section>-->
<!--                        <div class="flex items-center full-width">-->
<!--                            <div class="q-mr-sm">-->
<!--                                <q-icon name="drag_indicator" class="moveIcon" size="24px" />-->
<!--                            </div>-->

<!--                            <div class="flex items-center">-->
<!--                                <div class="thumbBox q-mr-md">-->
<!--                                    <q-img :src="game.url_thumb" style="width: 100%;" class="thumb" />-->
<!--                                </div>-->

<!--                                <div>-->
<!--                                    {{ game.title }}-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-item-section>-->
<!--                    <q-item-section side class="more">-->
<!--&lt;!&ndash;                        <q-btn round flat>&ndash;&gt;-->
<!--                            <q-icon color="grey-5" name="more_vert" />-->
<!--&lt;!&ndash;                        </q-btn>&ndash;&gt;-->
<!--                    </q-item-section>-->
<!--                </q-item>-->
<!--            </q-list>-->

            <draggable tag="div" :list="games" class="list-group" handle=".handle">
                <q-item clickable v-for="game in games" :key="game.id" class="listItem">
                    <q-item-section>
                        <div class="flex items-center full-width">
                            <div class="q-mr-sm">
                                <q-icon name="drag_indicator" class="moveIcon handle" size="24px" />
                            </div>

                            <div class="flex items-center">
                                <div class="thumbBox q-mr-md">
                                    <q-img :src="game.url_thumb" style="width: 100%;" class="thumb" />
                                </div>

                                <div>
                                    {{ game.title }}
                                </div>
                            </div>
                        </div>
                    </q-item-section>
                    <q-item-section side class="more">
                        <!--                        <q-btn round flat>-->
                        <div class="more" :class="$q.platform.is.desktop ? 'desktop' : ''" v-if="game.user !== undefined">
                            <q-btn @click.prevent="more" flat dense color="bg-transparent" class="" key="btn_size_dense_rd_md" size="md">
                                <q-icon color="grey-5" name="more_vert"></q-icon>


                                <q-menu v-if="$q.platform.is.desktop">
                                    <q-list>
                                        <q-item clickable>
                                            <q-item-section>
                                                <div class="row">
                                                    <q-icon name="far fa-trash-alt" class="self-center q-mr-sm"></q-icon>
                                                    <div class="self-center">{{ $t('playlist.removeItem') }}</div>
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                        <router-link :to="`/channel/${game.user.channel_id}`" v-if="game.user !== undefined">
                                            <q-item clickable>
                                                <q-item-section>
                                                    <div class="row">
                                                        <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>
                                                         <div class="self-center">{{ $t('playlist.moveChannel') }}</div>
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </router-link>
                                        <q-item clickable class="" @click="popupReport = true; popup = false;" v-if="$store.getters.isLogin">
                                            <q-item-section>
                                                <div class="row">
                                                    <q-icon name="fas fa-exclamation-circle" class="self-center q-mr-sm"></q-icon>
                                                    <div>{{ $t('playlist.reportGame') }}</div>
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>


                                <q-dialog v-else v-model="popup">
                                    <q-list class="bg-dark width90p maxWidth400px">
                                        <q-item clickable>
                                            <q-item-section>
                                                <div class="row">
<!--                                                    <q-icon name="far fa-trash-alt" class="self-center q-mr-sm"></q-icon>-->
                                                    <div class="self-center">{{ $t('playlist.removeItem') }}</div>
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                        <router-link :to="`/channel/${game.user.channel_id}`" v-if="game.user !== undefined">
                                            <q-item clickable class="">
                                                <q-item-section>
                                                    <div class="row">
                                                        <!--                                            <q-icon name="far fa-id-card" class="self-center q-mr-sm"></q-icon>-->
                                                        <div class="self-center">{{ $t('playlist.moveChannel') }}</div>
                                                    </div>
                                                </q-item-section>
                                            </q-item>
                                        </router-link>
                                        <q-item clickable class="" @click="popupReport = true; popup = false;" v-if="$store.getters.isLogin">
                                            <q-item-section>
                                                <div class="row">
<!--                                                                                                <q-icon name="report" class="self-center q-mr-sm"></q-icon>-->
                                                    <div>{{ $t('playlist.reportGame') }}</div>
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                        <q-item clickable class="" @click="popup = !popup">
                                            <q-item-section>
                                                <div class="row">
                                                    <!--                                            <q-icon name="report" class="self-center q-mr-sm"></q-icon>-->
                                                    <div>{{ $t('playlist.cancelLabel') }}</div>
                                                </div>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-dialog>
                            </q-btn>
                        </div>
<!--                        <q-icon color="grey-5" name="more_vert" />-->
                        <!--                        </q-btn>-->
                    </q-item-section>
                </q-item>
            </draggable>
        </div>
    </q-page>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component( {
    components : {
        draggable
    }
} )
export default class playlist extends Vue {
    games = [
        {
            id: 13,
            title: 'Basketball Boy',
            url_thumb: 'https://zemini.s3.ap-northeast-2.amazonaws.com/newz/n8lFf5Nu51UTU4d7ph7gol0ESvs1/p/basketballboy.webp',
            user : {
                channel_id : '123'
            },
        },
        {
            id: 14,
            title: 'Basketball Papa',
            url_thumb: 'https://zemini.s3.ap-northeast-2.amazonaws.com/newz/n8lFf5Nu51UTU4d7ph7gol0ESvs1/p/basketballpapa.webp',
            user : {
                channel_id : '123'
            },
        },
        {
            id: 15,
            title: 'Honey Kepper',
            url_thumb: 'https://zemini.s3.ap-northeast-2.amazonaws.com/newz/n8lFf5Nu51UTU4d7ph7gol0ESvs1/p/honeykeeper.webp',
            user : {
                channel_id : '123'
            },
        },
        {
            id: 16,
            title: 'Ninja Dart',
            url_thumb: 'https://zemini.s3.ap-northeast-2.amazonaws.com/newz/n8lFf5Nu51UTU4d7ph7gol0ESvs1/p/ninja_dart.webp',
            user : {
                channel_id : '123'
            },
        },
        {
            id: 17,
            title: 'Yummy Jelly',
            url_thumb: 'https://zemini.s3.ap-northeast-2.amazonaws.com/newz/n8lFf5Nu51UTU4d7ph7gol0ESvs1/p/yummy_jelly.webp',
            user : {
                channel_id : '123'
            },
        },
    ];

    private popup : boolean = false;

    more() {
        if( this.$q.platform.is.mobile ) {
            this.popup = !this.popup;
        }
    }
}
</script>
<style scoped lang="scss">



.listItem {

    .more {
        visibility: hidden;
    }
    &:hover {
        .more {
            visibility: visible;
        }
    }

    .moveIcon {
        cursor: n-resize;
    }
}


.thumbBox {
    width: 100px;
    height: 66px;
    position: relative;
    overflow: hidden;

    .thumb {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}

.handle {
    float: left;
    padding-top: 8px;
    padding-bottom: 8px;
}


</style>
