<template>
  <div class="navBar">
    <div class="fixedBox">
      <div class="dis-flex-bt">
        <div class="navLeft item">
          <!-- 返回按钮 -->
          <div @click="goBack" class="goBack"  v-show="pathName === 'search' || pathName === 'videoPlay' ||  pathName === 'forum'">
            <img src="http://static.zhizuobiao.com/mobile/css/images/m-ht-back.png" alt="">
          </div>
          <!-- logo -->
          <div class="logo" v-show="pathName === 'found'">
            <router-link :to="{name: 'found'}">
              <img src="../../assets/img/minilogo.png" alt="">
            </router-link>
          </div>
          <!-- 面包屑 -->
          <dl v-show="pathName === 'videoList'" class="dis-flex crumbsList">
            <dd>
              <router-link :to="{name: 'found'}">首页</router-link>
            </dd>
            <dd>
              <router-link :to="{name: 'forum'}">讲堂</router-link>
            </dd>
            <dd>视频</dd>
          </dl>
        </div>
        <div class="navMiddle item threePoint" v-show="pathName !== 'videoList'">{{$store.state.navTitle}}</div>
        <div class="navRight item">
          <span v-show="pathName == 'forum' || pathName == 'videoList'">
            <a :href="$store.state.domain + '/my/'">
              <img class="myicon" src="../../assets/img/my.png" alt="">
            </a>
              <span>&nbsp;&nbsp;</span>
            <span class="menuImg" @click.stop="menuBl = !menuBl">
              <img class="menuicon" src="../../assets/img/menu.png" alt="">
            </span>
          </span>

          <router-link :to="{name: 'search'}" v-show="pathName === 'found'">
            <img class="searchIcon" src="../../assets/img/search.png" alt="">
          </router-link>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 导航 -->
    <div class="menuBox" v-show="menuBl" @click.stop="menuBl = !menuBl">
      <ul class="menuList dis-flex-wrap" @click.stop="">
         <li>
           <router-link :to="{name: 'found'}">讲堂首页</router-link>
         </li>
         <li>
           <router-link :to="{name: 'videoList'}">视频讲堂</router-link>
         </li>
          <li>
           <a href="http://m.zhizuobiao.com/blog/">名师指导</a>
         </li>
          <li>
           <a href="http://m.zhizuobiao.com/knowledge/">IT知识库</a>
         </li>
          <li>
           <a href="http://m.zhizuobiao.com/news/">资讯动态</a>
         </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '职坐标'
    },
    pathName: {
      default: ''
    },
  },
  data () {
    return {
      menuBl: false
    }
  },
  methods: {
    goBack () {
      history.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  .navBar {
    width: 7.5rem;
    font-size: .36rem;
    overflow: hidden;
    .item {
      min-width: .45rem;
      min-height: .45rem;
    }
    .fixedBox {
      height: .99rem;
      width: 7.5rem;
      position: fixed;
      background: #fff;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      overflow: hidden;
      z-index: 99;
      .dis-flex-bt {
        height: .9rem;
        width: 7.1rem;
        padding: 0 0.2rem;
        margin: 0 auto;
        margin-top: .09rem;
        // -moz-box-shadow:0px -0.1rem 0px #e10030;
        // -webkit-box-shadow:0px -0.1rem 0px #e10030;
        // box-shadow:0px -0.1rem 0px #e10030;
      }
      .navLeft {
        .goBack {
          height: .45rem;
          width: .45rem;
          img {
            width: .45rem;
          }
        }
        .logo {
          height: .45rem;
          width: .68rem;
          img {
            width: .68rem;
          }
        }
        .crumbsList {
          font-size: .26rem;
          line-height: .9rem;
          dd {
            background:  url('../../assets/img/menuarrow.png') no-repeat right;
            padding-right: .3rem;
            padding-left: .1rem;
          }
          dd:first-child {
            padding-left: 0;
          }
        }
      }
      .navMiddle {
        flex: 1;
        padding: 0 .1rem;
        text-align: center;
      }
      .navRight {
        .searchIcon {
          width: 0.45rem;
          height: 0.45rem;
        }
        .myicon {
          width: 0.42rem;
        	height: 0.46rem;
        }
        .menuImg {
          display: inline-block;
        }
        .menuicon {
          width: 0.44rem;
          height: 0.35rem;
        }
      }
    }
    .line {
      height: .99rem;
    }
    .menuBox {
      position: fixed;
      height: 100%;
      width: 7.5rem;
      top: .99rem;
      left: 50%;
      transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      z-index: 92;
      background: rgba(0,0,0,.6);
      .menuList {
        border-top: 1px solid #000;
        padding: 0 .2rem;
        background: #fff;
        height: 1.6rem;
        padding-bottom: .1rem;
        li {
          height: .6rem;
          min-width: 1.5rem;
          font-size: .26rem;
          line-height: .6rem;
          background: #eee;
          border-radius: .2rem;
          text-align: center;
          margin-top: .1rem;
        }
      }
    }
  }
</style>
