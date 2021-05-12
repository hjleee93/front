<template>
    <div class="searchRoot q-ml-md">
        <div class="box flex justify-center">
            <div class="searchForm flex items-center">
                <div class="icon flex items-center">
                    <q-icon class="q-ml-sm q-mr-sm" name="fa fa-search"></q-icon>
                </div>
                <div class="inputArea">
                    <input ref="input" v-model="search" :placeholder="$t('searchGame.inputLabel')" type="search" @keyup="onChanged">
                </div>
            </div>
            <div class="popup" v-if="this.tags && this.tags.length && this.isFocus">
                <div class="searchListBox">
                    <div class="fade" @click="onBlur">
                    </div>
                    <q-list dark bordered>
                        <template v-for="(tag, index) in tags">
                            <router-link v-if="tag.id" :to="`/searchresult/${tag.id}`">
                                <q-item class="searchItem" clickable v-ripple @click.stop="onClickSearchItem(index)">
                                    <q-item-section avatar>
                                        <q-icon color="grey" name="fas fa-hashtag" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label> {{ `${tag.tag}` }} </q-item-label>
<!--                                        <q-item-label overline>게임 145,000 </q-item-label>-->
                                    </q-item-section>
                                </q-item>
                            </router-link>
                            <div v-else>
                                <q-item class="searchItem">
                                    <q-item-section>
                                        <q-item-label style="user-select: none"> {{$t('searchGame.notResultLabel')}} </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>
                        </template>
                    </q-list>
                </div>
            </div>
        </div>
<!--        <div class="clear"></div>-->
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {consoleLog} from "src/scripts/consoleLog";

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
        // consoleLog.log(tagData);
        this.$gtag && this.$gtag.event('search_tag', {
            tag: tagData.tag,
        })
        this.onBlur();
    }

    async onSearch() {

        const search = this.$refs.input as HTMLInputElement;
        const value = search.value;

        if( value === '' ) {
            this.tags = [];
            return;
        }

        this.timer = 0;

        const result = await this.$api.hashtags( value );
        // consoleLog.log( result );

        if( result.tags?.length  ) {
            this.tags = result.tags;
        }
        else {
            this.tags = [];
            Vue.set( this.tags, 0, {
                id : 0,
                tag : '',
            } );
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
        width: 27%;
        display: inline-block;
        
      

        .box {
            width: 100%;
            max-width: 480px;
            height: 30px;
            flex-wrap: nowrap;
            //max-width: 250px;

            color: #737373;
            flex-direction: column;

            .searchForm {
                //border: 1px solid #737373;
                //width: 480px;
                border-radius: 24px;
                background-color: #fff;
                overflow: hidden;
                flex-wrap: nowrap;
            }

            .icon {
                font-size: 18px;
                width: 38px;
            }

            .inputArea {
                width: calc(100% - 44px);
                //width: 100%;

                input {
                    //color: white;
                    color: #913200;
                    height: 40px;
                    border: none;
                    //background-color: transparent;
                    width: 100%;
                    outline: none;
                    font-size: 16px
                }
            }




            //@media (min-width: $breakpoint-xs) {
            //    max-width: 250px;
            //}
        }
        //.clear {
        //    clear: both;
        //}

        .popup {
            //text-align: left;
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
