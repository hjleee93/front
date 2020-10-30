import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
  }
}

const config = {
  baseURL: process.env.VUE_APP_BASE_API || process.env.baseURL || process.env.apiUrl || '',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {

    // if (store.getters.token) {
    //   cfg.headers.authorization = `Bearer ${store.getters.token}`;
    // }

    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  },
);

_axios.interceptors.response.use(
  (res) => {

    // if ( res.data.result ) {
    //   res.data = res.data.result;
    // }
    // else if ( res.data.data ) {
    //   res.data = res.data.data;
    // }

    return res;
  },
  (err) => {
    // Do something with response error
    return Promise.reject(err);
  },
);

export default boot(({ Vue }) => {

  Vue.$axios = _axios;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = _axios;
});
