import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import {get, post} from './config/base'
import Gray from './componentjs/gray.js'
import { Swipe, SwipeItem , Lazyload, Loadmore, InfiniteScroll} from 'mint-ui'

import VueJsonp from 'vue-jsonp'
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
// require styles
import 'swiper/dist/css/swiper.css'
if (process.env.NODE_ENV === 'development') {
  // require('./mock.js')
}
// 引过滤器
import  filters from './filters/index'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.component(Loadmore.name, Loadmore)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(Lazyload)
Vue.use(Gray)
Vue.use(InfiniteScroll)
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(VueJsonp)

require('./assets/iconfont/iconfont.css')
require ('./assets/css/common.css')
require ('./config/rem.js')
// 动态修改title
// router.beforeEach((to, from, next) => {
//   sessionStorage.setItem('currentPath', to.path)
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
