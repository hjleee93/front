<template>
    <div class="row">
        <div class="col-sm-2 col-xs-12" :class="labelStyle">
            {{ label }}
        </div>
        <div class="row col-sm-10 col-xs-12">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ContentItem extends Vue {
    @Prop() private label : string;
    @Prop() private labelStyle : string;
}
</script>
<style lang="scss" scoped>

</style>
