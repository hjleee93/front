import { boot } from 'quasar/wrappers';

import { languages } from '../../translation_tool/languages'
import Vue from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

const messages = Object.assign(languages)
Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale:navigator.language.split('-')[0],
  fallbackLocale: "en-us",
  messages
  
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
});
