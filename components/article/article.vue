<template>

  <div class="article">
    <div class="bannerBox" v-if="adPass ? adPass.length > 0 : adPass">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, key) in adPass" :key="key">
          <a :href="item.url"><img style="width: 3.45rem; height: 2.14rem;" :src="item.photo" alt=""></a>
        </swiper-slide>
      </swiper>
    </div>
    <ul class="articleList">
      <li v-for="(item, key) in articles" :key="key">
        <a :href="$store.state.domain + '/' + item.secondLetter + '/' + item.secondLetter + '-' + item.no + '/'">
          <div class="imgBox">
            <img v-lazy="item.photo" alt="">
          </div>
          <div class="msg">
            <p class="explain">{{item.title}}</p>
            <div class="dis-flex-bt">
              <p><span>{{item.firstChannelName}}&nbsp;</span><span>{{  item.publishTime | date}}</span></p>
              <div class="dis-flex-bt">
                <img src="../../assets/img/eyes.png" alt="">
                <span>{{item.readNum}}</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: ['articles', 'adPass'],
  data () {
    return {
      timer: () =>{},
      time: 3000,
      rem: sessionStorage.getItem('rem'),
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        slidesPerView: 2,
        spaceBetween: 0.2 * sessionStorage.getItem('rem'),
        centeredSlides: false,
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerGroup: 1
      }
    }
  },
  mounted () {
    this.timer = setInterval (() => {

    }, this.time)
  },
  methods: {
  },
  components: {
   swiperSlide, swiper
  }
}
</script>

<style lang="less" scoped>
  .article {
    .bannerBox {
      height: 2.14rem;
      width: 7.1rem;
      margin: 0 auto;
      padding-top: .3rem;
      position: relative;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .articleList {
      padding: 0 .2rem;
      li {
        height: 1.72rem;
        padding: .3rem 0;
        border-bottom: 1px dashed #a0a0a0;
        font-size: .28rem;
        overflow: hidden;
        a {
          width: 100%;
        }
        .imgBox {
          width: 2.3rem;
          height: 1.72rem;
          float: left;
          img {
            width: 100%;
          }
        }    
        .msg {
          width: 4.51rem;
          float: right;
          .explain {
            height: 1.15 - .2rem;
            margin-bottom: .2rem;
            overflow: hidden;
            line-height: .45rem;
            font-size: .3rem;
            padding-top: .1rem;
            color: #000;
          }
          img {
            width: 0.34rem;
            height: 0.25rem;
            margin-right: .1rem;
          }
        }
      }
    }
  }
</style>
