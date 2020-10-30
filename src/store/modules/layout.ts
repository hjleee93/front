export default {
    state: {
        leftDrawerOpen: false,
        headerBgTransparent: false,
        scrollPos: 0,
        scrollPrePos: 0,
        scrollMovePos: 0,
        scrollHeight: 0,
    },
    getters: {
        leftDrawerOpen(state: any) {
            return state.leftDrawerOpen;
        },
        headerBgTransparent(state: any) {
            return state.headerBgTransparent;
        },
        scrollPos(state: any) {
            return state.scrollPos;
        },
        scrollPrePos(state: any) {
            return state.scrollPrePos;
        },
        scrollMovePos(state: any) {
            return state.scrollMovePos;
        },
        scrollHeight(state: any) {
            return state.scrollHeight;
        },
    },

    mutations: {
        leftDrawerOpen(state: any, payload: boolean) {
            state.leftDrawerOpen = payload;
        },
        headerBgTransparent(state: any, payload: boolean) {
            state.headerBgTransparent = payload;
        },
        scrollPos(state: any, payload: number) {
            state.scrollPos = payload;
        },
        scrollPrePos(state: any, payload: number) {
            state.scrollPrePos = payload;
        },
        scrollMovePos(state: any, payload: number) {
            state.scrollMovePos = payload;
        },
        scrollHeight(state: any, payload: number) {
            state.scrollHeight = payload;
        },
    },
    actions: {}
}

