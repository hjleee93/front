import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: () => import('layouts/mainLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/home.vue')
            },
            {
                name: 'challenge',
                path: '/challenge',
                component: () => import('pages/challenge.vue')
            },
            {
                name: 'profile',
                path: '/profile',
                component: () => import('pages/profile.vue')
            },
            {
                name: 'channel',
                path: '/channel/:uid',
                component: () => import('pages/channel.vue')
            },
            {
                name: 'channelEditing',
                path: '/channel/:uid/editing',
                component: () => import('pages/channelEdit.vue')
            },
            {
                name : 'leave',
                path : '/leave',
                component: () => import( 'pages/leave.vue' ),
            },
        ]
    },
    {
        name : 'play',
        path : '/play/:pathname',
        component: () => import( 'pages/play.vue' ),
        props : true
    },
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
        name : 'loginEmail',
        path : '/joinEmail',
        component: () => import( 'pages/joinEmail.vue' ),
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
