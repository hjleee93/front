<template>
    <div class="sortCategory q-mr-sm">
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
        <select class="selectBox q-mb-sm" @change="onClickTab" v-model="tab">
            <option v-for="item in list" :value="item.name">{{ item.text }}</option>
        </select>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class SortCategory extends Vue {

    private list : any[] = [
        {
            name : 'new',
            text : '최신순', /*한국어*/
        },
        {
            name : 'create',
            text : '오래된순', /*한국어*/
        },
        {
            name : 'name',
            text : '이름순', /*한국어*/
        },
        // {
        //     name : 'update',
        //     text : '업데이트순',
        // },
        // {
        //     name : 'count',
        //     text : '조회수',
        // },
    ]

    private tab : string = 'create';

    onClickTab( tab ) {
        this.$emit('@sortChange', this.tab);
    }

}
</script>
<style lang="scss">

.sortCategory {
    text-align: right;

    .selectBox {
        color: white;
        background-color: #1D1D1D;
        width: 100px;
        height: 40px;
        padding-left: 10px;
        margin-right: 5px;
    }

    .sortItem {
        position: relative;
        display: inline-block;
        color: #b7b7b7;

        &.select {
            color: white;

            li {
                display: inline-block;
                .button {

                    &::before {
                        background-color: #ff6430;
                    }
                }
            }
        }

        li {
            list-style: none;

            .button {
                padding-left: 15px;

                &::before {
                    position: absolute;
                    content: "";
                    width: 6px;
                    height: 6px;
                    border-radius: 100%;
                    background-color: #b9b9b9;
                    top: 14px;
                    left: 14px;
                }

                .q-btn__wrapper::before {
                    box-shadow: none;
                }
            }
        }


    }

    .mobile {
        display: none;
    }

    @media(max-width: $breakpoint-sm) {

        .desktop {
            display: none;
        }

        .mobile {
            display: initial;
        }

        //text-align: center;

        .sortItem {
            li {
                .button {
                    padding-left: 0;

                    &::before {
                        display: none;
                    }
                }

            }
            border-left: 1px solid #ffffff47;
            &:first-child {
                border-left: none;
            }
        }




    }
}


</style>
