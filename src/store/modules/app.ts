export default {
    state: {
        navTab: '',
    },
    getters: {
        navTab(state: any) {
            return state.navTab;
        },
    },

    mutations: {
        navTab(state: any, payload: boolean) {
            state.navTab = payload;
        },
    },
    actions: {}
}

