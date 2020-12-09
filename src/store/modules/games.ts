import Vue from 'vue';
import {LoginState} from "src/store/modules/user";


enum GameLoadState {
    none,       //로드전
    loading,    //로드중
    loaded,     //로드완료
    complete,   //모든게임 로드완료
}

export {
    GameLoadState,
}

export default {
    state: {

        limit : 10,

        officialGames : [],
        noneOfficialGames : [],

        crtOriginGames : [],
        searchGames : [],
        isSearchGame : false,

        isOfficialPage : true,
        officialLoadState : GameLoadState.none,
        noneOfficialLoadState : GameLoadState.none,
    },
    getters: {
        // loadedGames : (state : any) => {
        //     return state.loadedGames;
        // },

        // games : ( state : any ) => {
        //     return state.games;
        // },

        officialGames : ( state : any ) =>{
            return state.officialGames;
        },

        noneOfficialGames : ( state : any ) =>{
            return state.noneOfficialGames;
        },

        officialLoadState : ( state : any ) =>{
            return state.officialLoadState;
        },

        noneOfficialLoadState : ( state : any ) =>{
            return state.noneOfficialLoadState;
        },

        gameByTitle : ( state : any ) => (title : string) => {
            let game = state.officialGames.find( (game:any) => game.title === title );
            if( !game ) {
                game = state.noneOfficialGames.find( (game:any) => game.title === title );
            }

            return game;
        },

        gameByPathname : ( state : any ) => (pathname : string) => {
            let game = state.officialGames.find( (game:any) => game.pathname === pathname );
            if( !game ) {
                game = state.noneOfficialGames.find( (game:any) => game.pathname === pathname );
            }

            return game;
        },

        isSearchGame : ( state : any ) => {
            return state.isSearchGame;
        },
        searchGames : ( state : any ) => {
            return state.searchGames;
        },
        isOfficialPage : ( state : any ) => {
            return state.isOfficialPage;
        },
    },

    mutations: {
        // games : ( state : any, payload : any ) => {
        //     state.games = payload;
        // },
        // loadedGames : ( state : any, payload : any ) => {
        //     state.loadedGames = payload;
        // },

        officialGames : ( state : any, payload : any ) => {
            state.officialGames = payload;
        },
        noneOfficialGames : ( state : any, payload : any ) => {
            state.noneOfficialGames = payload;
        },
        officialLoadState : ( state : any, payload : any ) => {
            state.officialLoadState = payload;
        },
        noneOfficialLoadState : ( state : any, payload : any ) => {
            state.noneOfficialLoadState = payload;
        },

        isSearchGame : ( state : any, payload : any ) => {
            state.isSearchGame = payload;
        },
        searchGames :  ( state : any, payload : any ) => {
            state.searchGames = payload;
        },
        isOfficialPage :  ( state : any, payload : any ) => {
            state.isOfficialPage = payload;
        },
    },
    actions: {
        loadGames : async (context : any, official : number = 1) => {

            const gameKey = official === 1 ? 'officialGames' : 'noneOfficialGames';
            const stateKey = official === 1 ? 'officialLoadState' : 'noneOfficialLoadState';

            if ( context.state[stateKey] === GameLoadState.none ||
                context.state[stateKey] === GameLoadState.loaded) {

                const limit = context.state.limit;
                const offset = context.state[gameKey].length;
                context.commit( stateKey, GameLoadState.loading );

                const result = await Vue.$api.games(limit, offset, official);
                if( !result || result.error ) {
                    result && result.error && console.error( result.error );
                    context.commit(gameKey, []);
                    context.commit( stateKey, GameLoadState.complete );
                    return [];
                }

                let { games } = result;
                let arr = context.state[gameKey].slice();
                arr = arr.concat( games );

                context.commit(gameKey, arr);
                console.log(gameKey, arr);

                if( games.length < limit ) {
                    context.commit( stateKey, GameLoadState.complete );
                }
                else {
                    context.commit( stateKey, GameLoadState.loaded );
                }

                return arr;
            }
            else if( context.state[stateKey] === GameLoadState.loading ) {
                await function () {
                    return new Promise((resolve, reject) => {
                        function wait() {
                            if ( context.state[stateKey] === GameLoadState.loading ) {
                                setTimeout(wait, 500);
                            } else {
                                return resolve();
                            }
                        }
                        wait();
                    })
                }
            }
            return context.state[gameKey];
        },

        // loadingGame : async (context : any) => {
        //     return new Promise((resolve, reject) => {
        //         function wait() {
        //             if ( !context.state.loadedGames ) {
        //                 setTimeout(wait, 500);
        //             } else {
        //                 return resolve(context.getters.loginState);
        //             }
        //         }
        //         wait();
        //     })
        // }
    }
}

