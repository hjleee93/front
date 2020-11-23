<template>
    <div class="width100p">

        <q-tabs
            v-model="select"
            inline-label
            align="justify"
            class="text-white q-py-lg"
            indicator-color="transparent"
        >
            <template v-for="item in list">
                <q-tab  content-class="width100p self-center no-padding"  class="buttonBox" :name="item.name"  :class="select===item.name &&'select'">
                    <q-btn class="button width100p" >
                        <div class="no-wrap">
                            <q-icon class="icon" :name="item.icon"></q-icon>
                            <span class="text q-ml-md text-weight-bold q-mt-sm ellipsis">{{ item.text }}</span>
                        </div>

                    </q-btn>
                </q-tab>
            </template>
        </q-tabs>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class GenreCategory extends Vue {
    private list: any[] = [
        {
            name : 'all',
            icon: 'sports_esports',
            text: '전체보기',

        },
        {
            name : 'arcade',
            icon: 'sports_esports',
            text: '아케이드',

        },
        {
            name : 'sport',
            icon: 'fas fa-baseball-ball',
            text: '스포츠',
        },
        {
            name : 'action',
            icon: 'fas fa-ghost',
            text: '액션',
        },
        {
            name : 'strategy',
            icon: 'fas fa-chess-king',
            text: '전략',
        },
        {
            name : 'puzzle',
            icon: 'fas fa-puzzle-piece',
            text: '퍼즐',
        },
    ];

    private select : string = 'arcade';
}
</script>
<style lang="scss" scoped>

.buttonBox {
    min-width: 120px;
    width: 100%;
    height: 60px;

    padding: 0 10px;
    overflow: hidden;

    .button {
        background-color: #272727;
        color: #E1DBB4;
        border-radius: 100px;

        width: 100%;
        height: 100%;
    }

    &.select {
        button {
            background-color: #FFF5CF;
            color: #C79656;
        }
    }

    @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {

        height: 50px;

        .button {
            .icon {
                display: none;
            }

            .text {
                margin-left: 0;
            }
        }
    }

    @media (max-width: $breakpoint-xs) {
        height: 50px;
        button {
            .icon {
                display: none;
            }

            .text {
                margin-left: 0;
            }
        }
    }



}


</style>
