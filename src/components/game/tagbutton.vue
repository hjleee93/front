<template>
    <div v-if="$q.platform.is.desktop" class="tag-container-desktop">
        <div class="text-h5 text-bold q-mb-md">TAGS</div>
        <template v-for="i in tags">
            <q-btn class="game-tag-desktop q-mb-md" :key="i.idx">
                <q-img class="tag-icon-desktop" src="/img/game_tag_icon.png" />
                <span class="tag-name-desktop">#{{ i }}</span>
                <span class="tag-count-desktop"> 10 </span>
            </q-btn>
        </template>
    </div>
    <div v-else>
        <div class="tag-container-mobile">
            <template v-for="i in tags">
                <q-btn class="game-tag-mobile q-mr-md q-mt-md" :key="i.idx">
                    <q-img
                        class="tag-icon-desktop"
                        src="/img/game_tag_icon.png"
                    />
                    <span class="tag-name-mobile">#{{ i }}</span>
                </q-btn>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class tagbutton extends Vue {
    tags: string[] = [
        "arcade",
        "puzzle",
        "solo",
        "diffeeeeeeeeeeeeeeeeeeicult",
        "easy",
    ];
}
</script>
<style scoped>
.tag-container-desktop {
    flex: 0.5;
    align-items: flex-start;
    margin-top: 426px;
}

.tag-icon-desktop {
    width: 25px;
}

.tag-icon-mobile {
    width: 20px;
}
.game-tag-desktop {
    width: 70%;
    background-color: aliceblue;
    color: black;
    border-radius: 35px;
}
.game-tag-mobile {
    background-color: aliceblue;
    color: black;
    border-radius: 35px;
}

.tag-name-desktop {
    flex: 2;
}
</style>
