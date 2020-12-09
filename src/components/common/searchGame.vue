<template>
    <div class="searchRoot q-py-md">
        <div class="box float-right">
            <q-icon class="icon q-mr-sm" name="fa fa-search"></q-icon>
            <input v-model="search" placeholder='검색' type="search" @keyup="onChanged">
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

    onChanged() {
        if(this.timer) {
            window.clearTimeout( this.timer );
        }
        this.timer = window.setTimeout( this.onSearch, 500 );
    }

    async onSearch() {

        this.timer = 0;

        if( this.search === '' || this.search[0] === '#' ) {
            this.$store.commit('isSearchGame', false );
        }
        else {
            const result = await this.$api.searchGame( this.search );

            if( !result || result.error ) {

            }
            else {
                const { games } = result;
                const arr = [];
                const isOfficial = this.$store.getters.isOfficialPage;
                for( let i = 0; i < games.length; i++ ) {
                    if( games[i].official === isOfficial ) {
                        arr.push( games[i] );
                    }
                }
                this.$store.commit('searchGames', arr);
            }
            this.$store.commit('isSearchGame', true );
        }
    }

}
</script>
<style lang="scss" scoped>
@import "../../css/quasar.variables";

    .searchRoot {
        width: 100%;
        .box {
            width: 100%;
            //max-width: 250px;
            padding: 0 10px;

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
    }

</style>
