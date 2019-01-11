<template>

  <div class="lecture">
    <dl class="title dis-flex-bt">
      <dt>视频讲堂</dt>
      <dd>
        <a :href="$store.state.domain + '/video/total-a1/'" class="gray">微课</a>
        <span class="line"></span>
        <a :href="$store.state.domain + '/video/total-a2/'" class="gray">公开课</a>
      </dd>
    </dl>
    <ul class="leatureList dis-flex-wrap">
      <li v-for="(item, key) in lecture" :key="key" @click.stop="toPlay(item.id)" v-show="key < 6">
          <div class="imgBox">
            <img :src="item.picture" alt="">
            <div class="dis-flex-bt">
              <p>{{item.rangeDataName}}</p>
              <p>{{item.formatDuration}}</p>
            </div>
          </div>
          <p class="explain">{{item.title}}</p>
          <dl class="videoMsg dis-flex-bt grayColor">
            <dt>{{item.teacherName}}</dt>
            <dd>
              <img class="playIcon" src="../../assets/img/play.png" alt="">
              <span>{{item.viewCount}}</span>
            </dd>
          </dl>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: ['lecture'],
  methods: {
    toPlay (id) {
      location.assign('/video/play-' + id + '.htm/')
    }
  }
}
</script>

<style lang="less" scoped>
  .lecture {
    width: 7.5rem;
    background: #eee;
    .title {
      height: .96rem;
      background: #fff;
      padding: 0 .2rem;
      font-size: .28rem;
      dt {
        height: .9rem;
        box-shadow: 0 .04rem #e10030;
        font-size: .36rem;
        line-height: .9rem;
      }
      .line {
        height: .3rem;
        &::after {
          content: "|";
          color: #999;
          margin:0 .08rem;
        }
      }
    }
    .leatureList {
      padding: 0 .2rem;
      padding-top: .3rem;
      overflow: hidden;
      min-height: 3.84rem;
      li {
        width: 3.45rem;
        height: 3.84rem;
        background-color: #ffffff;
        margin-bottom: .2rem;
        .imgBox {
          width: 3.45rem;
          height: 2.14rem;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
          }
          .dis-flex-bt {
            width: 3.05rem;
            height: 0.4rem;
            background-color: rgba(0, 0, 0, .5);
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0 .2rem;
            color: #fff;
          }
        }
        .explain {
          height: .77rem;
          overflow: hidden;
          padding: .2rem .2rem 0;
          font-size: .28rem;
          margin-bottom: .2rem;
        }
        .videoMsg {
          height: .25rem;
          padding: 0 .2rem;
          .playIcon{
            width: 0.32rem;
            height: 0.24rem;
            vertical-align: middle;
            margin-right: .1rem;
          }
        }
      }
    }
  }
</style>
