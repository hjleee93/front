import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: () => import('layouts/mainLayout.vue'),
        // redirect: '/home',
        children: [
            {
                name: 'home',
                path: '/',
                component: () => import('pages/home.vue'),
            },
            {
                name: 'oldHome',
                path: '/home',
                redirect: '/',
            },
            {
                name: 'official',
                path: '/official',
                component: () => import('pages/official.vue')
            },
            {
                name: 'challenge',
                path: '/challenge',
                component: () => import('pages/challenge.vue')
            },
            {
                name: 'affiliate',
                path: '/affiliate',
                component: () => import('pages/affiliate.vue')
            },
            {
                name: 'searchResult',
                path: '/searchresult/:tagId',
                component: () => import('pages/searchResult.vue'),
                props : true,
            },
            {
                name: 'profile',
                path: '/profile',
                component: () => import('pages/profile.vue')
            },
            {
                name: 'channel',
                path: '/channel/:channelId',
                component: () => import('pages/channel.vue'),
                props : true,
            },
            {
                name: 'channelEditing',
                path: '/channel/:channelId/editing',
                component: () => import('pages/channelEdit.vue')
            },
            {
                name : 'leave',
                path : '/leave',
                component: () => import( 'pages/leave.vue' ),
            },
            {
                name : 'playlist',
                path : '/playlist',
                component: () => import( 'pages/playlist.vue' ),
            },
        ]
    },
    {
        name : 'redirect',
        path : '/redirect*',
        component: () => import( 'pages/redirect.vue' ),
    },
    {
        name : 'play',
        path : '/play/:pathname',
        component: () => import( 'pages/play.vue' ),
        props : true
    },
    // {
    //     name : 'loginRedirect',
    //     path : '/login/:redirect',
    //     component: () => import( 'pages/login.vue' ),
    //     props : true,
    // },
    {
        name : 'login',
        path : '/login',
        component: () => import( 'pages/login.vue' ),
    },
    {
        name : 'join',
        path : '/join',
        component: () => import( 'pages/join.vue' ),
    },
    {
        name : 'joinEmail',
        path : '/joinEmail',
        component: () => import( 'pages/joinEmail.vue' ),
    },
    {
        name : 'joinEmailContinue',
        path : '/joinEmailContinue',
        component: () => import( 'pages/joinEmailContinue.vue' ),
    },
    {
        name : 'resetPassword',
        path : '/resetPassword',
        component: () => import( 'pages/resetPassword.vue' ),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
];

export default routes;
