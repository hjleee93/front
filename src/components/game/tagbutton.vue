<template>
    <div class="tag-container">
        <div class="text-h5 text-bold q-mb-md">TAGS</div>
        <template v-for="i in tags">
            <q-btn class="game-tag q-mb-md" :key="i.idx">
                <q-img class="tag-icon" src="/img/game_tag_icon.png" />
                <span class="tag-name">#{{ i }}</span>
                <span class="tag-count"> 10 </span>
            </q-btn>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class tagbutton extends Vue {
    tags: string[] = ["arcade", "puzzle", "solo"];
}
</script>
<style scoped>
.tag-container {
    flex: 0.5;
    align-items: flex-start;
    margin-top: 426px;
}
.tag-icon {
    width: 25px;
}
.game-tag {
    width: 70%;
    background-color: aliceblue;
    color: black;
    border-radius: 35px;
}
.tag-name {
    flex: 2;
   
}

</style>
