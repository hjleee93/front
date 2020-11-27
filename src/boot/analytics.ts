import Vue from 'vue';
import router from './../router/routes';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics,{
    id: 'G-0F9TV2H9X5', // 콘솔에서 본인의 키를 확인하세요!
    router // 원활한 트래킹을 위해 router를 꼭 바인드 해 주어야 합니다!
})
