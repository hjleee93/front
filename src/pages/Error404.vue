<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
          존재하지 않는 페이지<!--한국어-->
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="black"
        unelevated
        to="/"
        label="홈으로 이동"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {
    mounted() {
        document.title = this.$i18n.t('pageError404Title');
    }
}
</script>
