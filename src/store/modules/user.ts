import firebase from "firebase";

enum LoginState {
    none,//초기화중
    logout,
    login_noAuth,
    login,
    no_user
}

export default {
    state: {
        loginState: LoginState.none,
        idToken: undefined,
        developer: null,
        user: null,
    },
    getters: {
        loginState(state: any) {
            return state.loginState;
        },

        isLoginNoAuth(state: any) {
            return state.loginState === LoginState.login_noAuth;
        },

        isNoUser(state: any) {
            return state.loginState === LoginState.no_user;
        },

        isLogin(state: any) {
            return state.loginState === LoginState.login;
        },

        idToken(state: any) {
            return state.idToken;
        },

        developer(state: any) {
            return state.developer;
        },

        user(state: any) {
            return state.user;
        }
    },

    mutations: {
        loginState(state: any, payload: any) {
            state.loginState = payload;
        },

        isLogin(state: any, payload: any) {
            state.isLogin = payload;
        },

        idToken(state: any, payload: any) {
            state.idToken = payload;
        },

        developer(state: any, payload: any) {
            state.developer = payload;
        },
        user(state: any, payload: any) {
            state.user = payload;
        },
    },

    //dispatch
    actions: {
        async loginState(context: any) {
            return new Promise((resolve, reject) => {
                function wait() {
                    if (context.state.loginState === LoginState.none) {
                        setTimeout(wait, 500);
                    } else {
                        return resolve(context.getters.loginState);
                    }
                }

                wait();
            })
        },
        async logout(context: any) {
            await firebase.auth().signOut();
            context.commit('user', null);
            context.commit('idToken', null);
            context.commit('developer', null);
            context.commit('loginState', LoginState.logout);
        }
    }
}


export {LoginState};
