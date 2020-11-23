export default {
    state: {
        navTab: '',
        accountPopupMobile : false,
    },
    getters: {
        navTab(state: any) {
            return state.navTab;
        },
        accountPopupMobile(state: any) {
            return state.accountPopupMobile;
        },
    },

    mutations: {
        navTab(state: any, payload: boolean) {
            state.navTab = payload;
        },
        accountPopupMobile(state: any, payload: boolean) {
            state.accountPopupMobile = payload;
        },
    },
    actions: {}
}

