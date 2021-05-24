<template >
    <modal
        @close="close"
        :close="$t('layoutHeader.modal.close')"
        src="img/sprinting.gif"
    >
        <template v-slot:header>
            <p class="header">{{ $t("layoutHeader.modal.header") }}</p>
            <p class="header-desc">{{ $t("layoutHeader.modal.headerDesc") }}</p>
        </template>
        <template v-slot:body>
            <q-btn
                class="modal-body-btn"
                color="black"
                text-color="white"
                :label="$t('layoutHeader.modal.label')"
                @click="goDevSignUP()"
            />
        </template>
    </modal>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Modal from "src/layouts/modal.vue";
@Component({
    components: { Modal },
})
export default class entryModal extends Vue {
    private modal: boolean = false;

    //개발 스튜디오 알람 모달

    close() {
        this.$emit("close");
    }
}
</script>

<style scoped>
.header {
    color: #181818;
    font-weight: bold;
    font-size: 3rem;
}
.header-desc {
    color: #181818;
    font-size: 1rem;
}
.modal-body-btn {
    margin-top: 20px;
    border-radius: 40px;
    padding: 0 20px 0 20px;
    height: 60px;
    font-size: 17px;
    font-weight: bold;
}
</style>
