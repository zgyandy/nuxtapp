<template>
  <div class="footBox">
    <div class="footBar">
      <ul>
        <li>
          <router-link :to="{name: 'found'}">
            <img v-show="pathName == 'found'" src="../../assets/img/found1.png" alt="">
            <img v-show="pathName !== 'found'" src="../../assets/img/found.png" alt="">
            <p :class="{redColor : pathName == 'found'}">发现</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'forum'}">
            <img v-show="pathName === 'forum'" src="../../assets/img/video1.png" alt="">
            <img v-show="pathName !== 'forum'" src="../../assets/img/video.png" alt="">
            <p :class="{redColor : pathName == 'forum'}">讲堂</p>
          </router-link>
        </li>
        <li>
          <a :href="$store.state.domain + '/knowledge/'">
            <img src="../../assets/img/knowledge.png" alt="">
            <p>知识</p>
          </a>
        </li>
        <li>
          <a :href="$store.state.domain + '/my/'">
            <img src="../../assets/img/my.png" alt="">
            <p>我的</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pathName']
};
</script>

<style scoped lang="less">
.footBox {
  width: 7.5rem;
  height: 0.98rem;
  .footBar {
    width: 7.5rem;
    height: 0.98rem;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    background: #fff;
    border-top: 1px solid  #dadada;
    z-index: 90;
    ul {
      height: .98rem;
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      li {
        width: .6rem;
        font-size: .2rem;
        line-height: .4rem;
        a {
          color: #000;
        }
      }
      li:first-child {
        img {
          width: .49rem;
          height: .36rem;
        }
      }
      li:nth-child(2) {
        img {
          width: 0.39rem;
          height: 0.39rem;
        }
      }
      li:nth-child(3) {
        img {
          width: 0.36rem;
          height: 0.38rem;
        }
      }
      li:last-child {
        img {
          width: 0.4rem;
          height: 0.38rem;
        }
      }
    }
  }
}
</style>
