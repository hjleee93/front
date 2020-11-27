import firebase from 'firebase/app';
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";
import Cookie from "src/scripts/cookie";
import Vue from "vue";

const cookieName = process.env.VUE_APP_COOKIE_NAME;

class Login {

    static async autoLogin() {
        if( _store.getters.loginState === LoginState.none ) {
            const currentUser = firebase.auth().currentUser;
            if ( currentUser ) {
                console.log(currentUser);

                const idToken = await currentUser.getIdToken(true);

                _store.commit('idToken', idToken);
                console.log(idToken);

                const cookie = Cookie.read( cookieName );
                if( cookie && cookie === currentUser.uid ) {
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
                else if( cookie ) {
                    //쿠키는 있지만 기존 사용자랑 다른 상태
                    await firebase.auth().signOut();
                }
                else {
                    await Login.logout();
                }
            }
            else {
                const cookie = Cookie.read(cookieName);
                if( cookie ) {
                    const result = await Vue.$api.session();
                    console.log(result);
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { customToken } = result;
                        _store.commit('loginState', LoginState.customToken );
                        await firebase.auth().signInWithCustomToken( customToken );
                    }
                }
                else {
                    await Login.logout();
                }
            }
        }
        else if( _store.getters.loginState === LoginState.customToken ) {
            const currentUser = firebase.auth().currentUser;
            const idToken = await currentUser.getIdToken(true);
            _store.commit('idToken', idToken);
            console.log(idToken);
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
    }

    static async login() {
        _store.commit('loginState', LoginState.login );
        Cookie.write( cookieName, _store.getters.user.uid, 30, process.env.VUE_APP_COOKIE_DOMAIN );
    }

    static async logout() {
        await firebase.auth().signOut();
        await _store.dispatch('logout');
        Cookie.delete( cookieName, process.env.VUE_APP_COOKIE_DOMAIN );
    }

}

export default Login;
