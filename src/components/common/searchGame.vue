<template>
    <div class="searchRoot q-py-md">
        <div class="box float-right">
            <q-icon class="icon q-mr-sm" name="fa fa-search"></q-icon>
            <input ref="input" v-model="search" placeholder='게임 검색하기' type="search" @keyup="onChanged">
            <div class="popup" v-if="this.tags && this.tags.length && this.isFocus">
                <div class="searchListBox">
                    <div class="fade" @click="onBlur">
                    </div>
                    <q-list dark bordered>
                        <template v-for="(tag, index) in tags">
                            <router-link :to="`/searchresult/${tag.id}`">
                                <q-item class="searchItem" clickable v-ripple @click.stop="onClickSearchItem(index)">
                                    <q-item-section avatar>
                                        <q-icon color="grey" name="fas fa-hashtag" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label> {{ `${tag.tag}` }} </q-item-label>
                                        <q-item-label overline>게임 145,000 </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </router-link>
                        </template>
                    </q-list>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class SearchGame extends Vue {
    private search : string = '';
    private timer : number = 0;

    private tags : any[] = [];
    private isFocus : boolean = true;

    onChanged() {
        if(this.timer) {
            window.clearTimeout( this.timer );
        }
        this.timer = window.setTimeout( this.onSearch, 500 );

        (this.$refs.input as HTMLInputElement).addEventListener('focus', this.onFocus );
    }

    onFocus() {
        this.isFocus = true;
    }

    onBlur() {
        this.isFocus = false;
    }

    beforeDestroy() {
        (this.$refs.input as HTMLInputElement).removeEventListener('focus', this.onFocus );
    }

    onClickSearchItem(index : number) {
        const tagData = this.tags[index];
        console.log(tagData);
        this.onBlur();
    }

    async onSearch() {

        if( this.search === '' ) {
            this.tags = [];
            return;
        }

        this.timer = 0;
        const result = await this.$api.hashtags( this.search );
        console.log( result );

        if( result.tags ) {
            this.tags = result.tags;
        }




        // if( this.search === '' || this.search[0] === '#' ) {
        //     this.$store.commit('isSearchGame', false );
        // }
        // else {
        //     const result = await this.$api.searchGame( this.search );
        //
        //     if( !result || result.error ) {
        //
        //     }
        //     else {
        //         const { games } = result;
        //         const arr = [];
        //         const isOfficial = this.$store.getters.isOfficialPage;
        //         for( let i = 0; i < games.length; i++ ) {
        //             if( games[i].official === isOfficial ) {
        //                 arr.push( games[i] );
        //             }
        //         }
        //         this.$store.commit('searchGames', arr);
        //     }
        //     this.$store.commit('isSearchGame', true );
        // }
    }

}
</script>
<style lang="scss" scoped>
@import "../../css/quasar.variables";

    .searchRoot {
        width: 99%;
        .box {
            width: 100%;
            //max-width: 250px;

            color: #737373;

            .icon {
                font-size: 18px;
            }

            input {
                color: white;
                height: 35px;
                border: 1px solid #737373;
                background-color: transparent;
                width: calc(100% - 50px);
            }


            @media (min-width: $breakpoint-xs) {
                max-width: 250px;
            }
        }
        .clear {
            clear: both;
        }

        .popup {
            text-align: left;
            position: relative;

            .fade {
                position: fixed;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0);
                left: 0;
                top: 0;
            }

            .searchListBox {
                position: absolute;

                width: 100%;
                background-color: #272727;

                z-index: 100;

                a {
                    text-decoration: none;
                }

            }
        }
    }

</style>
