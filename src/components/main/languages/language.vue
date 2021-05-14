<template>
    <span
        class="q-ml-md language"
        @click="activeLang(lang)"
        :class="{ active: isActive }"
        >{{ lang }}</span
    >
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Language extends Vue {
    @Prop() lang: string;
    @Prop() value: string;
    private isActive: boolean = false;

    activeLang(lang:string) {
        
        this.$i18n.locale = this.value;
        console.log(this.value, lang)
    }
    mounted() {
        
    }
}
</script>