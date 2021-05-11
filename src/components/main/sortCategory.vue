<template>
    <div class="sortCategory q-my-xl q-mr-sm flex justify-center">
<!--        <ul class="desktop">-->
<!--            <div v-for="item in list" class="sortItem" :class="tab===item.name && 'select'">-->
<!--                <li>-->
<!--                    <q-btn class="button" @click="onClickTab(item.name)">{{ item.text }}</q-btn>-->
<!--                </li>-->
<!--            </div>-->
<!--        </ul>-->
<!--        <div class="mobile">-->
<!--            <q-tabs-->
<!--                v-model="tab"-->
<!--                class="q-pb-lg"-->
<!--                indicator-color="orange-10"-->
<!--                dense-->
<!--            >-->
<!--                <q-tab v-for="item in list" :name="item.name" :label="item.text" />-->
<!--            </q-tabs>-->
<!--        </div>-->

<!--        <select class="selectBox q-mb-sm" @change="onClickTab" v-model="tab">-->
<!--            <option v-for="item in list" :value="item.name">{{ item.text }}</option>-->
<!--        </select>-->

        <div class="sortForm flex justify-between">
            <div class="control cursor-pointer" @click="prev">
                ◀
            </div>

            <div class="sortItems">
                <div class="sortItem">
                    {{ list[this.selectedIndex].text }}
                </div>
            </div>

            <div class="control cursor-pointer" @click="next">
                ▶
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class SortCategory extends Vue {

    // private list : any[] = [
    //     {
    //         name : 'new',
    //         text : this.$t('sortCategory.text1') as string,
    //     },
    //     {
    //         name : 'create',
    //         text : this.$t('sortCategory.text2') as string,
    //     },
    //     {
    //         name : 'name',
    //         text : this.$t('sortCategory.text3') as string,
    //     },
    //     {
    //         name : 'play',
    //         text : this.$t('sortCategory.text4') as string,
    //     },
    //     {
    //         name : 'heart',
    //         text : this.$t('sortCategory.text5') as string,
    //     },
    //     // {
    //     //     name : 'update',
    //     //     text : '업데이트순',
    //     // },
    //     // {
    //     //     name : 'count',
    //     //     text : '조회수',
    //     // },
    // ]

    // private tab : string = 'create';

    @Prop() list! : { text : string, name : string }[];

    selectedIndex = 0;

    prev() {
        this.selectedIndex = ( this.selectedIndex - 1 + this.list.length ) % this.list.length;
        this.$emit('@sortChange', this.list[this.selectedIndex].name);
    }

    next() {
        this.selectedIndex = ( this.selectedIndex + 1 ) % this.list.length;
        this.$emit('@sortChange', this.list[this.selectedIndex].name);
    }

    // onClickTab( tab ) {
    //     this.$emit('@sortChange', this.tab);
    // }

}
</script>
<style lang="scss">

.sortCategory {
    align-content: center;
    //text-align: right;


    .sortForm {
        align-content: center;
        width: 100%;
        max-width: 460px;
        height: 40px;

        .control {
            width: 30px;
            user-select: none;
        }

        .sortItems {
            width: calc(100% - 60px);
            position: relative;
            overflow: hidden;

            .sortItem {
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;

                &.prev {
                    left: -100%;
                }
                &.next {
                    left: 100%;
                }
            }
        }
    }


    //.selectBox {
    //    color: white;
    //    background-color: #1D1D1D;
    //    width: 100px;
    //    height: 40px;
    //    padding-left: 10px;
    //    margin-right: 5px;
    //}
    //
    //.sortItem {
    //    position: relative;
    //    display: inline-block;
    //    color: #b7b7b7;
    //
    //    &.select {
    //        color: white;
    //
    //        li {
    //            display: inline-block;
    //            .button {
    //
    //                &::before {
    //                    background-color: #ff6430;
    //                }
    //            }
    //        }
    //    }
    //
    //    li {
    //        list-style: none;
    //
    //        .button {
    //            padding-left: 15px;
    //
    //            &::before {
    //                position: absolute;
    //                content: "";
    //                width: 6px;
    //                height: 6px;
    //                border-radius: 100%;
    //                background-color: #b9b9b9;
    //                top: 14px;
    //                left: 14px;
    //            }
    //
    //            .q-btn__wrapper::before {
    //                box-shadow: none;
    //            }
    //        }
    //    }
    //
    //
    //}
    //
    //.mobile {
    //    display: none;
    //}
    //
    //@media(max-width: $breakpoint-sm) {
    //
    //    .desktop {
    //        display: none;
    //    }
    //
    //    .mobile {
    //        display: initial;
    //    }
    //
    //    //text-align: center;
    //
    //    .sortItem {
    //        li {
    //            .button {
    //                padding-left: 0;
    //
    //                &::before {
    //                    display: none;
    //                }
    //            }
    //
    //        }
    //        border-left: 1px solid #ffffff47;
    //        &:first-child {
    //            border-left: none;
    //        }
    //    }
    //
    //
    //
    //
    //}
}


</style>
