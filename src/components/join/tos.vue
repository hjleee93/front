<template>
    <div style="position: relative">
        <iframe class="tosBox" src="https://zempie-rsc.s3.ap-northeast-2.amazonaws.com/static/tos/dark/tos/index.html">
        </iframe>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class Tos extends Vue {


}
</script>

<style scoped lang="scss">

.tosBox {
    width: 100%;
    height: 150px;
    border: 1px solid #272727;
}


</style>
