import Vue from 'vue';

export default {
    state: {

        limit : 20,
        mails : [],
    },
    getters: {
        mails : ( state : any ) => {
            return state.mails;
        },
    },

    mutations: {
        mails :  ( state : any, payload : any ) => {
            state.mails = payload;
        },
    },
    actions: {
        loadMails : async (context: any) => {
            const result = await Vue.$api.mails();
            if( !result || result.error ) {
                result && result.error && console.error( result.error );
                context.commit('mails', []);
                return [];
            }
            let { mails } = result;
            context.commit('mails', mails);
            return mails;
        }
    }
}

