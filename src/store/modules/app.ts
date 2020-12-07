export default {
    state: {
        navTab: '',
        accountPopupMobile : false,
        ajaxBar : false,
        homeUrl : process.env.VUE_APP_ZEMPIE_URL,
        studioUrl : process.env.VUE_APP_STUDIO_URL,
        supportUrl : process.env.VUE_APP_SERVICE_CENTER_URL,
        launcherUrl : process.env.VUE_APP_LAUNCHER_URL,
    },
    getters: {
        navTab(state: any) {
            return state.navTab;
        },
        accountPopupMobile(state: any) {
            return state.accountPopupMobile;
        },
        ajaxBar(state) {
            return state.ajaxBar;
        },
        homeUrl(state) {
            return state.homeUrl;
        },
        studioUrl(state) {
            return state.studioUrl;
        },
        supportUrl(state) {
            return state.supportUrl;
        },
        launcherUrl(state) {
            return state.supportUrl;
        },

    },

    mutations: {
        navTab(state: any, payload: boolean) {
            state.navTab = payload;
        },
        accountPopupMobile(state: any, payload: boolean) {
            state.accountPopupMobile = payload;
        },
        ajaxBar( state, payload ) {
            state.ajaxBar = payload;
        },
    },
    actions: {}
}

