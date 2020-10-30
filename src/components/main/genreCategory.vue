<template>
    <div class="width100p">
        <ul class="categoryContainer scroll-x">
            <template v-for="item in list">
                <li class="buttonBox shadow-3" :class="select===item.name &&'select'">
                    <q-btn class="button" @click="select=item.name">
                        <q-icon class="icon" :name="item.icon"></q-icon>
                        <span class="text q-ml-md text-weight-bold q-mt-sm ellipsis">{{ item.text }}</span>
                    </q-btn>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class GenreCategory extends Vue {
    private list: any[] = [
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
        }
    ];

    private select : string = 'arcade';
}
</script>
<style lang="scss" scoped>

.categoryContainer {

    margin: 0;
    padding: 20px 0;

    display: grid;
    grid-template-columns: repeat(5, 1fr);

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: $breakpoint-xs) {
        //grid-template-columns: 33.33% 33.33% 33.33%;
    }

    @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
        //grid-template-columns: 25% 25% 25% 25%
    }

    .buttonBox {
        min-width: 120px;
        width: 100%;
        height: 60px;

        padding: 5px 10px;
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
}


</style>
