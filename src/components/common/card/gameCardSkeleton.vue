<template>
    <q-card flat class="card">
        <q-skeleton square class="image" />

        <div class="flex">
            <q-skeleton type="QAvatar" class="q-mt-md logo" />

            <div class="q-ml-sm q-mt-sm text">
                <q-skeleton type="text" class="text-subtitle1" />
                <q-skeleton type="text" width="50%" class="text-caption" />
                <q-skeleton type="text" width="50%" class="text-caption" />
            </div>
        </div>

    </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({})
export default class GameCard extends Vue {

}
</script>
<style scoped lang="scss">
.card {
    max-width: 300px;
    background-color: transparent;
    padding: 10px;

    .image {
        width:100%; height:0; padding-top:61.8%;
        border-radius: 6px;
    }

    .logo {
        width: 32px;
        height: 32px;
    }

    .text {
        width: calc(100% - 60px);
    }
}
</style>
