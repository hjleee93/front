import Vue from 'vue';
import {LoginState} from "src/store/modules/user";

export default {
    state: {
        games : [],

        isOfficialPage : true,
        crtOriginGames : [],
        searchGames : [],

        loadedGames : false,
    },
    getters: {
        loadedGames : (state : any) => {
            return state.loadedGames;
        },

        games : ( state : any ) => {
            return state.games;
        },

        officialGames : ( state : any ) =>{
            return state.games.filter( game => game.official );
        },

        noneOfficialGames : ( state : any ) =>{
            return state.games.filter( game => !game.official );
        },

        gameByTitle : ( state : any ) => (title : string) => {
            return state.games.find( (game:any) => game.title === title );
        },

        gameByPathname : ( state : any ) => (pathname : string) => {
            return state.games.find( (game:any) => game.pathname === pathname );
        },

        crtOriginGames : ( state : any ) => {
            return state.crtOriginGames;
        },
        searchGames : ( state : any ) => {
            return state.searchGames;
        },
        isOfficialPage : ( state : any ) => {
            return state.isOfficialPage;
        },
    },

    mutations: {
        games : ( state : any, payload : any ) => {
            state.games = payload;
        },
        loadedGames : ( state : any, payload : any ) => {
            state.loadedGames = payload;
        },
        crtOriginGames :  ( state : any, payload : any ) => {
            state.crtOriginGames = payload;
        },
        searchGames :  ( state : any, payload : any ) => {
            state.searchGames = payload;
        },
        isOfficialPage :  ( state : any, payload : any ) => {
            state.isOfficialPage = payload;
        },
    },
    actions: {
        loadedGames : async (context : any) => {
            if ( !context.state.loadedGames ) {
                const result = await Vue.$api.games();

                if( !result || result.error ) {
                    result && result.error && console.error( result.error );
                    context.commit('games', []);
                    context.commit( 'loadedGames', true );
                    return [];
                }

                let { games } = result;
                games = games.sort( ( a : any, b : any ) =>  a.game_id < b.game_id ? 1 : -1 );
                context.commit('games', games);
                context.commit( 'loadedGames', true );
                return games
            }
            return context.state.games;
        },

        loadingGame : async (context : any) => {
            return new Promise((resolve, reject) => {
                function wait() {
                    if ( !context.state.loadedGames ) {
                        setTimeout(wait, 500);
                    } else {
                        return resolve(context.getters.loginState);
                    }
                }
                wait();
            })
        }
    }
}

