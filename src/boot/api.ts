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

    async request( method : string, url : string, data : any, withCredentials : boolean = false, errorCallback : Function | null = null, retryCount : number = 0 ): Promise<any> {
        try {
            // @ts-ignore
            const result = await Vue.$axios({
                method : method,
                url,
                data,
                withCredentials
            }  );
            return result.data;
        }
        catch (error) {
            if ( error && error.response && error.response.data && error.response.data.error && error.response.data.error.message === 'Unauthorized' ) {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    _store.commit('idToken', idToken);
                    if ( retryCount < 3 ) {
                        return await this.request(method, url, data, withCredentials, errorCallback, ++retryCount );
                    }
                    else {
                        //3번 초과
                        errorCallback && errorCallback(error);
                        // throw new Error(error);
                    }
                }
                else {
                    //로그인 안됨.
                    errorCallback && errorCallback(error);
                    // throw new Error(error)
                    // return error;
                }
            }
            // console.log(error, error.message);
            // throw error;
            //error && error.response && error.response.data || error

            const result = error && error.response && error.response.data || {
                    error : error.message || error,
                };
            return result;
        }
    }


    // async request( promise : Promise<any>, errorCallback : Function | null = null, retryCount : number = 0 ) : Promise<any> {
    //     try {
    //         const result = await promise;
    //         return result.data;
    //     }
    //     catch (error) {
    //         console.log(error);
    //         if ( error.response.data && error.response.data.error === 'Unauthorized' ) {
    //             const currentUser = firebase.auth().currentUser;
    //             if (currentUser) {
    //                 const idToken = await currentUser.getIdToken(true);
    //                 _store.commit('idToken', idToken);
    //                 if ( retryCount < 3 ) {
    //                     console.log(1234);
    //                     return await this.request(promise, errorCallback, ++retryCount);
    //                 }
    //                 else {
    //                     //3번 초과
    //                     errorCallback && errorCallback(error);
    //                     throw new Error(error);
    //                 }
    //             }
    //             else {
    //                 //로그인 안됨.
    //                 errorCallback && errorCallback(error);
    //                 throw new Error(error)
    //                 // return error;
    //             }
    //         }
    //         // throw error;
    //         return error.response.data;
    //     }
    // }


    //GAME
    async games(limit : number = 100, offset : number = 0, category : number = undefined, sort : string = undefined, dir : string = undefined ) {

        let url = `/games?limit=${limit}&offset=${offset}`;
        if( category !== undefined ) {
            url += `&category=${category}`;
        }
        if( sort !== undefined ) {
            url += `&sort=${sort}`;
        }
        if( dir !== undefined ) {
            url += `&dir=${dir}`;
        }

        const response = await this.request( 'get', url, {
            limit,
            offset,
            category,
            sort,
            dir,
        }, false );
        return response.result || response;
    }

    async game(pathname : string) {
        const response = await this.request( 'get', `/game/${pathname}`, undefined, false );
        return response.result || response;
    }

    async searchGame( tag ) {
        const response = await this.request( 'get', `/games/s/${tag}`, undefined, false );
        return response.result || response;
    }

    async featured() {
        const response = await this.request( 'get', `/featured`, undefined, false );
        return response.result || response;
    }

    async hashtags( tag ) {
        const response = await this.request( 'get', `/games/hashtags/${tag}`, undefined, false );
        return response.result || response;
    }

    async tagged( id ) {
        const response = await this.request( 'get', `/games/tagged/${id}`, undefined, false );
        return response.result || response;
    }

    //USER
    async session() {
        const response = await this.request( 'get', '/user/verify-session', undefined, true );
        return response.result || response;
    }

    async user() {
        const response = await this.request( 'get', '/user/info', undefined, true );
        return response.result || response;
    }

    async verifyEmail() {
        const response = await this.request( 'post', '/user/verify-email', undefined, false );
        return response.result || response;
    }

    async channel(channel_id) {
        const response = await this.request( 'get', `/channel/${channel_id}`, undefined, false );
        return response.result || response;
    }

    async verifyChannelId(channel_id) {

        const response = await this.request( 'post', `/user/verify-channel`, {
            channel_id
        }, false );

        // const response = await this.request( Vue.$axios.post(`/user/verify-channel`, {
        //     channel_id
        // }) );
        return response.result || response;
    }

    async signUp(name : string) {

        const response = await this.request( 'post', `/user/sign-up`, {
            name
        }, true );

        return response.result || response;
    }

    async signOut() {
        const response = await this.request( 'post', `/user/sign-out`, undefined, true );
        return response.result || response;
    }

    async updateUser( name : string, state_msg : string, file : File, channel_id : string, description : string ) {
        const formData = new FormData();
        if( name ) { formData.append( 'name', name ); }
        if( state_msg ) { formData.append( 'state_msg', state_msg ); }
        if( file ) { formData.append( 'file', file ); }
        if( channel_id ) { formData.append( 'channel_id', channel_id ); }
        if( description ) { formData.append( 'description', description ); }

        const response = await this.request( 'post', `/user/update/info`, formData, false );
        return response.result || response;
    }

    async updateBanner( file : File ) {
        const formData = new FormData();
        if( file ) { formData.append( 'file', file ); }

        const response = await this.request( 'post', `/user/update/banner`, formData, false );
        return response.result || response;
    }

    async leave( text : string, num : string = '0' ) {

        const response = await this.request( 'post', `/user/leave-zempie`, {
            num,
            text,
        }, false );

        return response.result || response;
    }

    // MAIL

    async mails() {
        const response = await this.request('get', '/user/mails', undefined, false);
        return response.result || response;
    }

    async readMail( mail_id : number ) {
        const response = await this.request('get', `/user/mail/${mail_id}`, undefined, false);
        return response.result || response;
    }

    async deleteMail( mail_id : number ) {
        const response = await this.request('post', '/user/mail/d', { mail_id }, false);
        return response.result || response;
    }

    async testBadWord( word : string ) {
        const response = await this.request('post', '/user/filter/bad-word', { word }, false);
        return response.result || response;
    }

    async reportGame( target_id : number, reason_num : number[], reason : string, file : File | null = null ) {
        const formData = new FormData();
        formData.append( 'target_id', target_id.toString() );
        formData.append( 'reason_num', reason_num.toString() );
        formData.append( 'reason', reason );
        if( file ) { formData.append( 'file', file ); }
        const response = await this.request('post', '/report/game', formData, false);
        return response.result ||response;
    }
}

const _api = new Api();

export default boot(({ Vue }) => {

    Vue.$api = _api;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Vue.prototype.$api = _api;
});
