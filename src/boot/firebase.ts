import firebase from 'firebase/app';
import 'firebase/auth'
import {app} from './../App.vue';
import {LoginState} from "src/store/modules/user";


let firebaseConfig = {
    apiKey: 'AIzaSyB1CgghEsLYQpzuNxhSbPldQ2H-uN2z7AM',
    authDomain: 'zemini.firebaseapp.com',
    databaseURL: 'https://zemini.firebaseio.com',
    projectId: 'zemini',
    storageBucket: 'zemini.appspot.com',
    messagingSenderId: '382409597816',
    appId: '1:382409597816:web:8e5682e47f05d169221e8d'
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged( onAuthStateChanged );


async function onAuthStateChanged() {
    const currentUser = firebase.auth().currentUser;
    if ( currentUser ) {
        const idToken = await currentUser.getIdToken(true);
        app.$store.commit('user', {});
        app.$store.commit('idToken', idToken);

        //todo : 젬파이서버에 로그인 요청후 처리..
        app.$store.commit('loginState', LoginState.login );
    }
    else {
        app.$store.commit('loginState', LoginState.logout );
    }
}

//await firebase.auth().signOut();
