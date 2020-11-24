<template>
    <div class="card" @click="$router.push( `/play/${data.pathname}` )">

        <q-img :src=data.url_thumb alt="">
        </q-img>

        <div class="detail text-left q-mt-sm">
            <img class="developerLogo" :src="data.user.picture">

            <div class="text">
                <strong
                    class="ellipsis block">
                    {{data.title}}
                </strong>
                <span
                    class="ellipsis block">
                        {{data.user.name}}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class GameCard extends Vue {
    @Prop() private data : any;
    //     {
    //     thumb : 'https://s3.ap-northeast-2.amazonaws.com/zeminiplay.com/games/imgs/4owsAkv8S.png',
    //     title : 'Shark Frenzy',
    //     developer : {
    //         name : 'fromTheRed',
    //         thumb : 'https://zemini.s3.ap-northeast-2.amazonaws.com/companies/FTR_Symbol.png',
    //     },
    // };

    mounted() {
        console.log(this.data);
    }
}
</script>
<style scoped lang="scss">
@import "../../../css/quasar.variables";

.card {
    cursor: pointer;
    padding: 10px;
    @media (max-width: $breakpoint-xs) {
        padding: 2px;
    }

    @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
        padding: 5px;
    }

    .detail {
        .developerLogo {
            width: 40px;
            height: 40px;



        }

        .text {
            width: calc(100% - 40px);
            display: inline-block;
            //margin-left: 10px
        }
    }


}
</style>
