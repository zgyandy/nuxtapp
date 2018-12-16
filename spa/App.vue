<template>

  <div id="app">
    <navBar :pathName="pathName" v-if="$store.state.navBl"></navBar>
      <transition
				name="fadeIn"
				mode="out-in"
        >
        <router-view/>
		</transition>
    <footBar :pathName="pathName" v-if="$store.state.footBl"></footBar>
  </div>

</template>

<script>
import navBar from './components/common/navBar'
import footBar from './components/common/footBar'
export default {
  name: 'app',
  data () {
    return {
      pathName: ''
    }
  },
  mounted () {
    this.$store.commit('domain','//' + location.host)
    if (location.host.indexOf('test') != -1) {
      this.$store.commit('vipUrl', 'http://portal.testiotek.com/payment/checkVip')
      this.$store.commit('forumCode','http://portal.testiotek.com')
      this.$store.commit('protalVip', 'http://portal.testiotek.com')
    }else if (location.host.indexOf('anaiotek') != -1) {
      this.$store.commit('vipUrl', 'http://www.anaiotek.com/payment/checkVip')
      this.$store.commit('forumCode','http://192.168.8.219:8002')
      this.$store.commit('protalVip', 'http://www.anaiotek.com')
    }else if (location.host.indexOf('zhizuobiao') != -1) {
      this.$store.commit('vipUrl', 'http://www.zhizuobiao.com/payment/checkVip')
      this.$store.commit('forumCode','http://www.zhizuobiao.com')
      this.$store.commit('protalVip', 'http://www.zhizuobiao.com')
    }
  },
  watch: {
    $route: function (to, from) {
      this.pathName = to.name
      // 滚动到顶部
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      if (/^videoList|search|videoPlay/.test(to.name)){
        this.$store.commit('footBl', false)
      }else {
        this.$store.commit('footBl', true)
      }
      if (to.name !== 'videoPlay') {
        this.$store.commit('navTitle', '职坐标')
      }
    }
  },
  components: {
    navBar, footBar
  }
}
</script>

<style lang="less">
  #app {
    width: 7.5rem;
    min-height: 100%;
    margin: 0 auto;
    background: #fff;
    .fadeIn-enter-active {
      transition: opacity 0.4s;
    }
    .fadeIn-enter {
      opacity: 0;
    }
  }
</style>
