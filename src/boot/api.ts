import Vue, {PluginObject} from 'vue';
import firebase from 'firebase';
import {boot} from "quasar/wrappers";
import store, {_store} from './../store'


declare module 'vue/types/vue' {
    interface Vue {
        $api: Api;
    }
    interface VueConstructor {
        $api: Api;
    }
}


class Api {
    async request( promise : Promise<any>, errorCallback : Function | null = null, retryCount : number = 0 ) : Promise<any> {
        try {
            const result = await promise;
            return result.data;
        }
        catch (error) {
            if ( error.response.data === 'Unauthorized' ) {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    _store.$store.commit('idToken', idToken);
                    if ( retryCount < 3 ) {
                        return await this.request(promise, errorCallback, ++retryCount);
                    }
                    else {
                        //3번 초과
                        errorCallback && errorCallback(error);
                        throw new Error(error);
                    }
                }
                else {
                    //로그인 안됨.
                    errorCallback && errorCallback(error);
                    throw new Error(error)
                    // return error;
                }
            }
            // throw error;
            return error.response.data;
        }
    }


    //GAME
    async games() {
        const response = await this.request( Vue.$axios.get('/games') );
        return response.result || response;
    }


    //USER
    async session() {
        const response = await this.request( Vue.$axios.get(`/user/verify-session`, {
            withCredentials : true,
        }) );
        return response.result || response;
    }

    async user() {
        const response = await this.request( Vue.$axios.get(`/user/info`, {
            withCredentials : true,
        }) );
        return response.result || response;
    }

    async verifyEmail() {
        const response = await this.request( Vue.$axios.post(`/user/verify-email`) );
        return response.result || response;
    }

    async channel(channel_id) {
        const response = await this.request( Vue.$axios.get(`/channel/${channel_id}`) );
        return response.result || response;
    }

    async verifyChannelId(channel_id) {
        const response = await this.request( Vue.$axios.post(`/user/verify-channel`, {
            channel_id
        }) );
        return response.result || response;
    }

    async signUp(name : string) {
        const response = await this.request( Vue.$axios.post(`/user/sign-up`, {
            name,
        }) );
        return response.result || response;
    }
    async updateUser( name : string, state_msg : string, file : File, channel_id : string ) {
        const formData = new FormData();
        if( name ) { formData.append( 'name', name ); }
        if( state_msg ) { formData.append( 'state_msg', state_msg ); }
        if( file ) { formData.append( 'file', file ); }
        if( channel_id ) { formData.append( 'channel_id', channel_id ); }


        const response = await this.request( Vue.$axios.post(`/user/update/info`, formData) );
        return response.result || response;
    }

    async updateBanner( file : File ) {
        const formData = new FormData();
        if( file ) { formData.append( 'file', file ); }

        const response = await this.request( Vue.$axios.post(`/user/update/banner`, formData) );
        return response.result || response;
    }

    async leave( text : string, num : string = '0' ) {
        const response = await this.request( Vue.$axios.post(`/user/leave-zempie`, {
            num,
            text,
        }) );
        return response.result || response;
    }
}

const _api = new Api();

export default boot(({ Vue }) => {

    Vue.$api = _api;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Vue.prototype.$api = _api;
});
