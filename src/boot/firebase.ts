import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth'
import {LoginState} from "src/store/modules/user";
import {_store} from "src/store";
import Login from "src/scripts/login";


const firebaseConfig = {
    apiKey: "AIzaSyAXt32ipLLoSlyijdCKAMSpapooo7wbTTE",
    authDomain: "zempie.firebaseapp.com",
    databaseURL: "https://zempie.firebaseio.com",
    projectId: "zempie",
    storageBucket: "zempie.appspot.com",
    messagingSenderId: "235654438895",
    appId: "1:235654438895:web:03bb6a5b89826f37c9601a",
    measurementId: "G-Z3JMFZBKM3"
};

const dev_firebaseConfig = {
    apiKey: "AIzaSyAE2WeLg2L9n2niQMysGbXzACLNIXd5msE",
    authDomain: "zempie-dev.firebaseapp.com",
    projectId: "zempie-dev",
    storageBucket: "zempie-dev.appspot.com",
    messagingSenderId: "797641160577",
    appId: "1:797641160577:web:3c10f8e96f7827d2645a80",
    measurementId: "G-NFY628EX60"
};

firebase.initializeApp(process.env.VUE_APP_FIRESTORE_CONFIG === 'development' ? dev_firebaseConfig : firebaseConfig);
firebase.auth().onAuthStateChanged( Login.autoLogin );


// async function onAuthStateChanged() {
//
//     if( _store.getters.loginState === LoginState.none ) {
//         //자동 로그인일때만 실행.
//
//         const currentUser = firebase.auth().currentUser;
//         if ( currentUser ) {
//
//             console.log( currentUser );
//
//             const idToken = await currentUser.getIdToken(true);
//             _store.commit('idToken', idToken);
//
//             if( _store.getters.loginState === LoginState.none ) {
//                 const result = await Vue.$api.user();
//
//                 if( !result || result.error /*&& zempieUser.error === '잘 못 된 유저 아이디입니다'*/ ) {
//                     await _store.dispatch('logout');
//                 }
//                 else {
//                     const { user } = result;
//                     _store.commit('user', user);
//                     _store.commit('loginState', LoginState.login );
//                 }
//             }
//         }
//         else {
//             await _store.dispatch('logout');
//             // _store.commit('loginState', LoginState.logout );
//         }
//     }
// }

//await firebase.auth().signOut();
