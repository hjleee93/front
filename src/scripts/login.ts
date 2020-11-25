import firebase from 'firebase/app';
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";
import Cookie from "src/scripts/cookie";
import Vue from "vue";

const cookieName = 'ZempieCookie';

class Login {

    static async autoLogin() {
        if( _store.getters.loginState === LoginState.none ) {
            const currentUser = firebase.auth().currentUser;
            if ( currentUser ) {
                const idToken = await currentUser.getIdToken(true);
                _store.commit('idToken', idToken);
                console.log(idToken);

                const cookie = Cookie.read( cookieName );
                if( cookie ) {
                    const result = await Vue.$api.user();
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { user } = result;
                        _store.commit('user', user);
                        await Login.login();
                    }
                }
                else {
                    await Login.logout();
                }
            }
            else {
                await Login.logout();
            }
        }
    }

    static async login() {
        _store.commit('loginState', LoginState.login );
        Cookie.write( cookieName, 'true', 30, process.env.VUE_APP_COOKIE_DOMAIN );
    }

    static async logout() {
        await firebase.auth().signOut();
        await _store.dispatch('logout');
        Cookie.delete( cookieName );
    }

}

export default Login;
