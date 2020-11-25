<template>
    <div style="position: relative">
        <iframe class="tosBox" src="http://gtest.fromthered.com/lhs/zempieTos/dark/tos/">
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
