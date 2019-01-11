<template>
  <div class="upVip" v-show="$store.state.grateVip" @click.stop="hideTip">
    <div class="content" @click.stop="">
      <div class="title">
        <span>升级VIP会员</span>
        <div class="closeIcon" @click.stop="hideTip">
          <img src="../../assets/img/close.png" alt="">
        </div>
      </div>
      <p class="tipTitle">升级职坐标VIP会员观看完整视频，限时活动价199元</p>
      <!-- vip特权 -->
      <div class="vipBox">
        <h4>
          <img src="../../assets/img/vipicon.png" alt="">
          <span>升级VIP会员尊享特权</span>
        </h4>
        <ul class="dis-flex-wrap">
          <li>海量课程内容任意观看</li>
          <li>报名付费培训时优先推荐就业</li>
          <li>尊贵身份标识</li>
          <li>名师一对一在线答疑</li>
        </ul>
      </div>
      <p class="upBtn">
        <a :href="$store.state.protalVip + '/payment/payActivity?userName=' + username +'&mobile=' + mobile">一键升级</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mobile', 'username'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    hideTip () {
      this.$store.commit('grateVip', false)
    }
  }
}
</script>

<style scoped lang="less">
  .upVip {
    width: 7.5rem;
    position: fixed;
    height: 100%;
    width: 100%;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    background: rgba(0, 0, 0, 0.5);
    z-index: 990;
    .content {
      width: 7.49rem;
      height: 6.75rem;
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      background: #fff;
      .title {
        height: 1.16rem;
        text-align: center;
        width: 7.5rem;
        border-bottom: 1px solid  #dadada;
        font-size: 0.36rem;
        line-height: 1.16rem;
        position: relative;
        .closeIcon {
          width: 0.35rem;
          height: 0.35rem;
          position: absolute;
          top: .25rem;
          right: .2rem;
          overflow: hidden;
          img {
            width: 100%;
            display: block;
          }
        }
      }
      .tipTitle {
        height: 1.04rem;
        color: #ff6000;
        font-size: 0.24rem;
        text-align: center;
        line-height: .6rem;
      }
      .vipBox {
        width: 6.7rem;
        height: 2.4rem;
        border-radius: 0.05rem;
        border: solid 0.02rem #e3b255;
        margin: 0 auto;
        h4 {
          height: 1.18rem;
          line-height: 1.18rem;
          text-align: center;
          font-size: 0.32rem;
          color: #e3b255;
          font-weight: normal;
          img {
            width: 0.59rem;
            height: 0.32rem;
            vertical-align: middle;
            margin-right: .1rem;
          }
        }
        ul {
          padding: 0 .2rem;
          font-size: 0.24rem;
          line-height: .48rem;
          li::before {
            content: url('../../assets/img/row.png');
            margin-right: 2px;
            vertical-align: middle;
            width: 0.18rem;
	          height: 0.18rem;
          }
          li:last-child {
            width: 3.28rem;
          }
        }
      }
      .upBtn {
        width: 6.7rem;
        height: 0.95rem;
        background-color: #e10030;
        margin: 0 auto;
        margin-top: .6rem;
        line-height: .95rem;
        text-align: center;
        font-size: 0.34rem;
        a {
          width: 100%;
          color: #fff;
        }
      }
    }
  }
</style>
