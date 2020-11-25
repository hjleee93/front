export default {
    state: {
        navTab: '',
        accountPopupMobile : false,
        ajaxBar : false,
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

