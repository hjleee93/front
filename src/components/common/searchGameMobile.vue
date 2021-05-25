<template>
    <div class="searchRoot q-ml-md">
        <div class="box flex justify-center">
            <q-icon
                class="q-ml-sm q-mr-sm"
                name="fa fa-search"
                @mousedown="clickSearch"
            ></q-icon>
            <!-- <template v-if="searchOpen"> -->

            <div
                class="inputArea"
                :style="searchOpen ? 'opacity: 1;' : 'opacity: 0;'"
            >
                <input
                    ref="input"
                    v-model="search"
                    :placeholder="$t('searchGame.desktop.inputLabel')"
                    type="search"
                    @keyup="onChanged"
                    @blur="handleBlur"
                />
                <div
                    class="popup"
                    v-if="this.tags && this.tags.length && this.isFocus"
                >
                    <div class="searchListBox">
                        <div class="fade" @click="onBlur"></div>
                        <q-list dark>
                            <template v-for="(tag, index) in tags">
                                <router-link
                                    v-if="tag.id"
                                    :to="`/searchresult/${tag.id}`"
                                >
                                    <q-item
                                        class="searchItem"
                                        clickable
                                        v-ripple
                                        @click.stop="onClickSearchItem(index)"
                                    >
                                        <q-item-section avatar>
                                            <q-icon
                                                color="grey"
                                                name="fas fa-hashtag"
                                            />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>
                                                {{ `${tag.tag}` }}
                                            </q-item-label>
                                            <!--                                        <q-item-label overline>게임 145,000 </q-item-label>-->
                                        </q-item-section>
                                    </q-item>
                                </router-link>
                                <div v-else>
                                    <q-item class="searchItem">
                                        <q-item-section>
                                            <q-item-label
                                                style="user-select: none"
                                            >
                                                {{
                                                    $t(
                                                        "searchGame.notResultLabel"
                                                    )
                                                }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </div>
                            </template>
                        </q-list>
                    </div>
                </div>
            </div>
            <!-- </template> -->
        </div>
        <!--        <div class="clear"></div>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { consoleLog } from "src/scripts/consoleLog";

@Component
export default class SearchGame extends Vue {
    private search: string = "";
    private timer: number = 0;

    private tags: any[] = [];
    private isFocus: boolean = true;

    private searchOpen: boolean = false;
    mounted() {
        this.$q.iconSet.expansionItem.icon = "";
    }

    onChanged() {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(this.onSearch, 500);

        (this.$refs.input as HTMLInputElement).addEventListener(
            "focus",
            this.onFocus
        );
    }

    onFocus() {
        this.isFocus = true;
    }

    onBlur() {
        this.isFocus = false;
    }

    beforeDestroy() {
        (this.$refs.input as HTMLInputElement).removeEventListener(
            "focus",
            this.onFocus
        );
    }

    onClickSearchItem(index: number) {
        const tagData = this.tags[index];
        // consoleLog.log(tagData);
        this.$gtag &&
            this.$gtag.event("search_tag", {
                tag: tagData.tag,
            });
        this.onBlur();
    }

    async onSearch() {
        const search = this.$refs.input as HTMLInputElement;
        const value = search.value;

        if (value === "") {
            this.tags = [];
            return;
        }

        this.timer = 0;

        const result = await this.$api.hashtags(value);
        // consoleLog.log( result );

        if (result.tags?.length) {
            this.tags = result.tags;
        } else {
            this.tags = [];
            Vue.set(this.tags, 0, {
                id: 0,
                tag: "",
            });
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

    //search bar
    handleBlur() {
        console.log("blur~", this.searchOpen);
        // (this.$refs.input as HTMLElement).blur();
        if (this.searchOpen) {
            this.searchOpen = false;
            this.$store.commit("searchBarOpen", false);
        }
    }
    clickSearch(e: Event) {
        console.log("click");
        this.searchOpen = !this.searchOpen;
        this.search = "";
        this.tags = [];
        // this.handleBlur();

        if (this.searchOpen === false) {
            this.$store.commit("searchBarOpen", false);
        } else {
            this.$store.commit("searchBarOpen", true);
        }
        this.$nextTick(() => {
            (this.$refs.input as HTMLElement).focus();
        });
         e.preventDefault();
    }
}
</script>
<style lang="scss" scoped>
@import "../../css/quasar.variables";

.searchRoot {
    .box {
        width: 100%;
        max-width: 480px;
        height: 30px;
        flex-wrap: nowrap;
        //max-width: 250px;

        color: #fff;
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
            transition: all 0.5s;
            width: 100%;
            position: absolute;
            top: 50px;
            left: 0;
            input {
                padding: 8px 16px;
                background-color: #1d1d1d;
                color: #fff;
                height: 48px;
                border: none;
                width: 100%;
                outline: none;
                font-size: 16px;
            }
            input::placeholder {
                color: #ededed;
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

        .fade {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0);
            left: 0;
            top: 0;
        }

        .searchListBox {
            position: absolute;

            width: 100%;
            background-color: #1d1d1d;

            z-index: 100;

            a {
                text-decoration: none;
            }
        }
    }
}
</style>
