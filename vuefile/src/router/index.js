import Vue from 'vue'
import Router  from 'vue-router'
Vue.use(Router)
const router =  new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'found',
      component: resolve => require(['@/pages/found/found.vue'], resolve),
      meta: {
        title: 'IT职业教育培训_IT培训中心_IT在线教育-职坐标'
      }
    }, 
    {
      path: `/find/`,
      name: 'search',
      component: resolve => require(['@/pages/search/search.vue'], resolve),
      meta: {
        title: 'IT培训课程查找_IT学习资料查找-职坐标'
      }
    },
    {
      path: `/video/total:state?/`,
      name: 'videoList',
      component: resolve => require(['@/pages/videoList/videoList.vue'], resolve),
      meta: {
        title: 'IT课程视频_IT学习视频_IT教学视频-职坐标'
      }
    },
    {
      path: `/video/play-:id?/`,
      name: 'videoPlay',
      component: resolve => require(['@/pages/videoPlay/videoPlay.vue'], resolve)
    },
    {
      path: '/video/',
      name: 'forum',
      component: resolve => require(['@/pages/forum/forum.vue'], resolve),
      meta: {
        title: 'IT课程视频_教学授课视频_活动视频回顾-职坐标'
      }
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to,from)
//   // ${//to and from are Route Object,next() must be called to resolve the hook}
  
// })
export default router