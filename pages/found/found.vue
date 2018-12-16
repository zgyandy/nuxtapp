<template>

  <div class="found">
    <!-- 轮播 -->
    <div class="banner">
      <Banner :banner="banner"></Banner>
    </div>
    <!-- 链接列表 -->
    <linkList></linkList>
    <!-- 职坐标快报 -->
    <bulletin :bulletin='bulletin'></bulletin>
    <!-- 灰色间隔 -->
    <Gray></Gray>
    <!-- 加油站 -->
    <CheerStation :cheer="cheer"></CheerStation>
    <!-- 灰色间隔 -->
    <Gray></Gray>
    <!-- 视频讲堂 -->
    <Leature :lecture="lectureArr"></Leature>
    <!-- 灰色间隔 -->
    <Gray></Gray>
    <!-- 文章列表 -->
    <mt-loadmore :bottomMethod="loadBottom" :bottomAllLoaded="allLoaded" ref="loadmore" bottomPullText="上拉加载" :maxDistance="maxDistance">
    <listTitle :listTitle="listTitle" ></listTitle>
    <Article ref="Article" :adPass="adPass" :articles="articles"></Article>
    <loadMore :title="loadTitle"></loadMore>
    </mt-loadmore>

  </div>

</template>

<script>
import Banner from '../../components/banner/banner'
import linkList from '../../components/common/linkList'
import bulletin from '../../components/common/bulletin'
import CheerStation from '../../components/cheerstation/cheer'
import Leature from '../../components/lecture/lecture'
import Article from '../../components/article/article'
import loadMore from '../../components/common/loadMore'
import listTitle from '../../components/common/listTitle'

export default {
  metaInfo: {
    title: 'IT职业教育培训_IT培训中心_IT在线教育-职坐标', // set a title
    meta: [
      {                 // set meta
      name: 'keyWords',
      content: 'IT教育,IT培训,职业教育,IT在线教育,职坐标'
    },{
      name: 'Description',
      content: '职业坐标,汇聚了一大批国内外IT技术领域的资深师资力量,为您提供人工智能、物联网、大数据、Java全栈和WEB前端开发等IT职业教育培训,推出了参加海同高端IT培训100%推荐就业的服务承诺。'
    }
    ]
  },
  data() {
    return {
      banner: [],
      bulletin: [],
      cheer: [],
      lectureArr: [],
      adPass: [],
      articles: [],
      listTitle: {
        title: 'IT知识',
        arr: [
          {
            msg: '名师',
            url: this.$store.state.domain + '/blog/'
          },
          {
            msg: '热点',
            url: this.$store.state.domain + '/news/'
          }
        ]
      },
      allLoaded: true,
      newsPage: 1,
      swBl: true,
      loadTitle: '上拉加载更多',
      maxDistance: 100,
      pages: 0,
      windowHeight: 0
    }
  },
  beforeCreate () {
    this.$post('/api/video/indexAdvertiement').then((res) => {
      if (res.data.code == 200) {
        this.banner = res.data.data.carousel
        this.cheer = res.data.data.focus
        this.adPass = res.data.data.pass
      }
    }).catch((err) => {
      throw err
    })
    this.$post('/api/video/indexVideo').then((res) => {
      if (res.data.code == 200) {
        this.lectureArr = res.data.data
      }
    }).catch((err) => {
      throw err
    })
    this.$get("/api/video/indexExpress").then(res => {
      this.bulletin = res.data.data
    }).catch(err => {
      throw err
    })
  },
  mounted () {
    // 咨询列表
    this.getNews ()
    this.windowScroll ()
  },
  methods: {
    loadBottom () {
      if (this.swBl) {
        this.newsPage += 1
        this.getNews(this.newsPage)
        this.swBl = false
      }
    },
    getNews (page) {
      this.$forceUpdate()
      this.$get('/api/video/news/', {page: page ?  page : this.newsPage} ).then((res) => {
        this.allLoaded = true
        if (res.data.code == 200) {
          this.swBl = true
          this.pages = res.data.data.pages
          if (page) {
            this.articles = res.data.data.dataList.concat(this.articles)
            this.windowScroll ()
            if(page === res.data.data.pages) {
              this.allLoaded = true
              this.loadTitle = '加载完成'
            }
            this.$refs.loadmore.onBottomLoaded()
          }else {
            this.articles = res.data.data.dataList
          }
        }
      }).catch((err) => {
        throw err
        this.allLoaded = true
      })
    },
    windowScroll () {
      var _this = this
      window.onscroll = function () {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight
        //滚动条到底部的条件
        if(scrollTop + windowHeight >= (scrollHeight - 10) && _this.pages !== _this.newsPage){
          _this.allLoaded = false
        }else {
          _this.allLoaded = true
        }
      }
    }
  },
  components: {
    Banner, linkList, bulletin, CheerStation, Leature, Article, loadMore, listTitle
  }
}
</script>

<style lang="less">
  .found {
    overflow-y: scroll;
    .bannerBox {
      height: 2.14rem;
      width: 7.5rem;
      padding-top: .3rem;
      position: relative;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .banner {
      height: 3.46rem;
      width: 7.5rem;
      overflow: hidden;
      .mint-swipe-item {
        height: 3.46rem;
      }
      img {
        height: 3.46rem;
        width: 7.5rem;
      }
    }
  }
</style>
