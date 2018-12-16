<template>
  <div class="videoBox">
    <div class="outBox">
      <!-- 播放器 -->
      <div class="youkuIdBox" @click.stop="">
        <div id="youkuId" v-if="videoPause" ref="youkuIdRef"></div>
      </div>
      <!-- 蒙层 -->
      <dl class="cover" v-show="timeOut">
        <dt class="title">{{title}}</dt>
        <dd class="unLogin" v-show="!isLogin">
          <p><a :href="$store.state.domain + '/user/'">已是海同会员，请登录</a></p>
          <p><a :href="$store.state.domain + '/user/register/'">不是海同会员，请注册</a></p>
        </dd>
      </dl>
      <!-- 视频信息 -->
      <dl class="videoMsg dis-flex-bt">
        <dd>
          <img src="../../assets/img/play.png" alt="">
          <span class="grayColor">{{videoMsg.viewCount}}</span>
          <img class="msgIcon" src="../../assets/img/bigmsg.png" alt="">
          <span class="grayColor">{{videoMsg.commentNum}}</span>
        </dd>
        <dd>
          <img class="clock" src="../../assets/img/clo.png" alt="">
          <span class="grayColor">{{videoMsg.formatDuration}}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
// XMzgzNzE0MzA4NA==  01db692a170336cc
export default {
  props: {
    isVip: {
      default: false
    },
    isLogin: {
      default: false
    },
    username: {
      default: ''
    },
    mobile: {
      default: ''
    },
    youkuVideoId: {
      default: ''
    }
  },
  data () {
    return {
      url: '',
      vipVideo: false,
      videoMsg: {},
      player: new Object(),
      time: 0,
      timer: () => {},
      timeOut: false,
      videoPause: true,
      title: '海同职坐标会员专享，观看视频请登录'
    }
  },
  mounted () {
    // if (this.$store.state.)
  },
  methods: {
    // getTime () {
    //   return this.player.currentTime()
    // },
    // timeFn () {
    //   this.timer = setInterval(() => {
    //     this.time = this.getTime()
    //   }, 5000)
    // },
    showPlayer (youkuId, rangeDataId, isLogin, isVip) {
      var _this = this
      _this.player = new YKU.Player('youkuId', {
        titleStyle:"{color: red}",
        styleid: '0',
        client_id: '01db692a170336cc',
        vid: youkuId,
        newPlayer: true,
        events:{
          onPlayerReady: function(){},
          onPlayEnd: function(){ /*your code*/ },
          onPlayStart: function(){}
        }
      })
      console.log(isLogin, rangeDataId, isVip)
      // 登录付费视频 不是vip
      if (!isVip && isLogin && rangeDataId >= 16) {
        this.timeOut = true
        this.title = '海同职坐标VIP会员专享，请注册为VIP会员'
        this.$store.commit('grateVip', true)
      }else if (!isLogin && rangeDataId > 14) {
        this.timeOut = true
      }
    }
  }
  // watch: {
  //   // time: function (newTime, oldTime) {
  //   //   // 已登录不是vip 看付费视频
  //   //   if (this.isLogin && !this.isVip && this.vipVideo) {
  //   //     console.log(this.isLogin, this.vipVideo, this.isVip, this.videoPause)
  //   //     // this.timeOut = true
  //   //     this.$store.commit('grateVip', true)
  //   //     this.videoPause = false
  //   //     // 视频暂停
  //   //     this.player.pauseVideo ()
  //   //     clearInterval (this.timer)
  //   //     setTimeout (() => {
  //   //       this.videoPause = true
  //   //     }, 300)
  //   //     return
  //   //   }
  //   //   // 未登录 会员、付费视频
  //   //   if (newTime > 300 && this.vipVideo || oldTime > 300 && this.vipVideo) {
  //   //     console.log(newTime, this.vipVideo, oldTime)
  //   //     this.timeOut = true
  //   //     // 视频暂停
  //   //     this.player.pauseVideo ()
  //   //     clearInterval (this.timer)
  //   //     this.videoPause = false
  //   //     setTimeout (() => {
  //   //       this.videoPause = true
  //   //     }, 300)

  //   //   }
  //   // },
  //   player: function (newData, oldData) {
  //     if (!this.isVip && this.vipVideo) {
  //       // 如果是vip不进行计时
  //       this.timeFn ()
  //     }
  //   },
  //   isVip: function (newData, oldData) {
  //     if (!newData) {
  //       this.title = '海同职坐标VIP会员专享，请注册为VIP会员'
  //     }
  //   }
  // }
}
</script>

<style lang="less" sciped>
  .videoBox {
    width: 7.5rem;
    height: 4.6rem;
    position: fixed;
    left: 50%;
    top: .99rem;
    margin-left: -3.75rem;
    z-index: 99;
    .outBox {
      width: 7.5rem;
      height: 4.6rem;
      position: relative;
      .videoMsg {
        height: .96rem;
        padding: 0 .2rem;
        background: #fff;
        .msgIcon {
          margin-left: .6rem;
        }
        .clock {
          width: .3rem;
        }
        img {
          width: .36rem;
          margin-right: .1rem;
        }
      }
    }
    .youkuIdBox {
      width: 7.5rem;
      height: 4.6rem;
      background: #fff;
    }
    #youkuId {
      width: 7.5rem;
      height: 4.6rem;
      background: rgba(0, 0, 0, 0.6);
    }
    .cover {
      width: 7.5rem;
      height: 3.6rem;
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      left: 0;
      top: 0;
      color: #fff;
      text-align: center;
      font-size: .28rem;
      padding-top: 1rem;
      z-index: 980;
      #payCodeBox {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        background: #fff;
      }
      // display: none;
      dt {
        padding-bottom: .4rem;
      }
      p {
        width: 4.2rem;
        height: 0.64rem;
        line-height: .64rem;
        border-radius: 0.32rem;
        margin: 0 auto;
        a {
          color: inherit;
        }
      }
      dd.unLogin {
        p:first-child {
          margin-bottom: .24rem;
          background-color: #e10030;
          color: #fff;
        }
        p:last-child {
          border: solid 0.02rem #e10030;
          color:  #e10030;
        }
      }
    }
  }
</style>
