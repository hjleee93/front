export default {
    state: {
        fromRouterName : '',
        navTab: '',
        accountPopupMobile : false,
        mailPopupMobile : false,
        ajaxBar : false,
        homeUrl : process.env.VUE_APP_ZEMPIE_URL,
        studioUrl : process.env.VUE_APP_STUDIO_URL,
        supportUrl : process.env.VUE_APP_SERVICE_CENTER_URL,
        launcherUrl : process.env.VUE_APP_LAUNCHER_URL,
        tosUrl : process.env.VUE_APP_TOS_URL,
        policyUrl : process.env.VUE_APP_POLICY_URL,
        developerWiki : process.env.VUE_APP_DEVELOPER_WIKI_URL,
        instaURL:process.env.VUE_APP_INSTA_URL,
        inquiryMail:process.env.VUE_APP_INQUIRY_EMAIL,
    },
    getters: {
        navTab(state: any) {
            return state.navTab;
        },
        accountPopupMobile(state: any) {
            return state.accountPopupMobile;
        },
        mailPopupMobile(state: any) {
            return state.mailPopupMobile;
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
        tosUrl(state) {
            return state.tosUrl;
        },
        policyUrl(state) {
            return state.policyUrl;
        },
        fromRouterName(state) {
            return state.fromRouterName;
        },
        developerWiki(state) {
            return state.developerWiki;
        },
        instaUrl(state){
            return state.instaURL;
        },
        inquiryMail(state){
            return state.inquiryMail;
        }
    },

    mutations: {
        navTab(state: any, payload: boolean) {
            state.navTab = payload;
        },
        accountPopupMobile(state: any, payload: boolean) {
            state.accountPopupMobile = payload;
        },
        mailPopupMobile(state: any, payload: boolean) {
            state.mailPopupMobile = payload;
        },
        ajaxBar( state, payload ) {
            state.ajaxBar = payload;
        },
        fromRouterName( state, payload ) {
            state.fromRouterName = payload;
        },
    },
    actions: {}
}

