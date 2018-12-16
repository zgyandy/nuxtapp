<template>
  <div class="hotInfo">
    <listTitle :listTitle="listTitle"></listTitle>
    <ul class="infoList">
      <li v-for="(item, key) in hotInfo" :key="key">
        <div class="num" :class="{orange1: key + 1 == 1, orange2: key + 1 == 2, orange3: key + 1 ==3, grayBg: key + 1 > 3}">{{key + 1}}</div>
        <a :href="$store.state.domain + '/' + item.secondLetter  + '/' + item.secondLetter + '-' + item.no + '/'">
          <div class="cont">
            <p class="explain">{{item.title}}</p>
            <dl class="dis-flex-bt">
              <dt>
                <img class="clock" src="../../assets/img/clock.png" alt="">
                <span>{{item.publishTime | dateLong}}</span>
              </dt>
              <dd>
                <img class="eye" src="../../assets/img/eyes.png" alt="">
                <span>{{item.readNum}}</span>
              </dd>
            </dl>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import listTitle from '../../components/common/listTitle'
export default {
  props: ['hotInfo'],
  data () {
    return {
      listTitle: {
        title: '热门资讯'
      }
    }
  },
  components: {
    listTitle
  }
}
</script>

<style scoped lang="less">
  .hotInfo {
    background: #fff;
    ul {
      padding: 0 .2rem;
      li {
        height: 1.84 - .6rem;
        padding: .3rem 0;
        border-bottom: 1px dashed #dadada;
        display: flex;
        display: -webkit-flex;
        .num {
          width: 0.44rem;
          height: 0.44rem;
          border-radius: 50%;
          color: #fff;
          line-height: .44rem;
          text-align: center;
          font-size: 0.26rem;
          margin-right: .4rem;
        }
        .orange1 {
          background-color: #ff6000;
        }
        .orange2 {
          background-color: #ff8a00;
        }
        .orange3 {
          background-color: #ffba00;
        }
        .grayBg {
          background-color: #bababa;
        }
        .cont {
          width: 7.1 - .4 - .44rem;
          .explain {
            height: .8rem;
            overflow: hidden;
            font-size: 0.28rem;
            color: #000;
            line-height: .4rem;
            margin-bottom: .2rem;
          }
          dl {
            font-size: 0.22rem;
            line-height: .3rem;
            .clock {
              width: 0.22rem;
              height: 0.22rem;
              margin-right: .1rem;
              vertical-align: middle;
            }
            .eye {
              width: 0.29rem;
              height: 0.2rem;
              margin-right: .1rem;
            }
          }
        }
      }
    }
  }
</style>
