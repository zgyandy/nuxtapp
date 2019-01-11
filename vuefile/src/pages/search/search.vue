<template>

  <div class="search">
    <div class="searchInp">
      <dl class="dis-flex searchSort">
        <dd :class="condition == key ? 'active' : ''" v-for="(item, key) in searchSort" :key="key" @click.stop="condition = key">{{item}}</dd>
      </dl>
      <div class="inpBox dis-flex-bt">
        <input type="text" maxlength="20" v-model="key" placeholder="输入您想查找的内容">
        <div class="btn" @click="search(condition)">查找</div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <!-- 文章数量 -->
    <div class="total" v-show="articleBl && condition == 0">
      <p v-if="articleNum > 0" class="top">共为您找到<span class="redColor">{{articleNum}}</span>个结果</p>
      <div v-else class="noResult">
        <p class="top">很抱歉，没有找到与<span class="redColor">{{errorInp1}}</span>相关的内容。</p>
        <dl class="tip">
          <dt>温馨提示：</dt>
          <dd>*请检查您的输入是否正确</dd>
          <dd>*如果您发现网站发布的相关内容未显示，请在线联系我们。</dd>
          <dd>*如有任何意见或建议，请及时<a href="tel:400-636-0069">反馈给我们</a></dd>
        </dl>
      </div>
    </div>
    <Article :articles='articleArr' v-show="articleArr && condition == 0"></Article>
    <!-- 点击加载 -->
    <p class="loadBtn" v-show="articlePage*10 <= articleNum && articleBl && condition == 0" @click.stop="loadMore(0)">{{title}}</p>
    <!-- 视频数量 -->
    <div class="total" v-show="videoBl && condition == 1">
      <p v-if="videoNum > 0" class="top">共为您找到<span class="redColor">{{videoNum}}</span>个结果</p>
      <div v-else class="noResult">
        <p class="top">很抱歉，没有找到与<span class="redColor">{{errorInp2}}</span>相关的内容。</p>
        <dl class="tip">
          <dt>温馨提示：</dt>
          <dd>*请检查您的输入是否正确</dd>
          <dd>*如果您发现网站发布的相关内容未显示，请在线联系我们。</dd>
          <dd>*如有任何意见或建议，请及时<a href="tel:400-636-0069">反馈给我们</a></dd>
        </dl>
      </div>
    </div>
    <videoList :videoList="videoArr" v-if="videoArr && condition == 1"></videoList>
    <!-- 点击加载 -->
    <p class="loadBtn" v-show="videoPage*10 <= videoNum && videoBl && condition == 1" @click.stop="loadMore(1)">{{title}}</p>
    <!-- 热门频道 -->
    <hotChannel></hotChannel>
    <Gray></Gray>
    <!-- 热门资讯 -->
    <hotInfo :hotInfo="hotInfo"></hotInfo>
  </div>

</template>

<script>
import hotChannel from '../../components/hotChannel/hotChannel'
import hotInfo from '../../components/hotInfo/hotInfo'
import Article from '../../components/article/article'
import videoList from '../../components/videoList/videoList'
export default {
  metaInfo: {
    title: 'IT培训课程查找_IT学习资料查找-职坐标', // set a title
    meta: [
      {                 // set meta
        name: 'keyWords',
        content: 'IT培训课程,IT学习资料,职坐标'
      },{
        name: 'Description',
        content: '职坐标讲堂,汇聚了海量的IT培训课程和IT学习资料,供莘莘学子根据自己的需求挑选。'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: 'http://static.zhizuobiao.com/favicon.ico?v=201803060001'
      }
    ]
  },
  data () {
    return {
      condition: 0,
      key: '',
      searchSort: ['文章', '视频'],
      articleArr: [],
      videoArr: [],
      start: 1,
      hotInfo: [],
      articleNum: 0,
      videoNum: 0,
      articlePage: 1,
      videoPage: 1,
      errorInp1: '',
      errorInp2: '',
      articleBl: false,
      videoBl: false,
      title: '点击加载更多'
    }
  },
  beforeCreate () {
    this.$get(this.$store.state.domain + '/api/video/newsList').then(res => {
      if (res.data.code == 200) {
        this.hotInfo = res.data.data.dataList
      }
    }).catch(err => {
      throw err
    })
  },
  methods: {
    search (n, num) {
      this.$get(this.$store.state.domain + '/api/video/search?',{condition: n, key: this.key, start: num ? num : this.start, limit: 10}).then((res) => {
        if (n == 1) {
          // 视屏搜索
          if (num) {
            this.videoArr = this.videoArr.concat(res.data.data.dataList)
          }else {
            this.videoArr = res.data.data.dataList
          }
          this.videoNum = res.data.data.total
          this.videoBl = true
          this.errorInp2 = this.key
        } else {
          // 文章搜索
          if (num) {
            this.articleArr = this.articleArr.concat(res.data.data.dataList)
          }else {
            this.articleArr = res.data.data.dataList
          }
          this.articleNum = res.data.data.total
          this.articleBl = true
          this.errorInp1 = this.key
        }
      }).catch(res => {
        throw res
      })
    },
    loadMore (n) {
      if (n == 1) {
        this.videoPage += 1
        this.search(n, this.videoPage)
      }else {
        this.articlePage += 1
        this.search(n, this.articlePage)
      }
    }
  },
  components: {
    hotChannel, hotInfo, Article, videoList
  },
}
</script>

<style lang="less" scoped>
  .search {
    .searchInp {
      padding: .3rem .2rem;
      background: #eee;
      .searchSort {
        height: .45rem;
        line-height: .45rem;
        text-align: center;
        font-size: .28rem;
        margin-bottom: .2rem;
        border-bottom: 1px solid #dadada;
        .active {
          color: #e10030;
          box-shadow: 0 .04rem 0 #e10030;
        }
        dd {
          height: .45rem;
          width: .8rem;
          text-align: center;
        }
        dd:first-child {
          margin-right: 1rem;
        }
        // dd {
        //   height: 0.78rem;
        //   width: 1.7rem;
        //   background: gray;
        //   border-radius: .1rem;
        //   color: #fff;
        // }
      }
      .inpBox {
        line-height: .78rem;
        font-size: .28rem;
        input {
          width: 5.2rem;
          height: 0.78rem;
          text-indent: 1em;
          font-size: .28rem;
        }
        input:-webkit-input-placeholder {
          line-height: .78rem;
        }
        .btn {
          width: 1.7rem;
          height: 0.78rem;
          background-color: #e10030;
          border-radius: 0.1rem;
          color: #fff;
          text-align: center;
        }
      }
    }
    .total {
      background: #fff;
      .top {
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        border-bottom: 1px solid #eee;
        overflow: hidden;
      }
      .tip {
        font-size: .26rem;
        padding: 0 .2rem;
        dt {
          height: .6rem;
          line-height: .6rem;
        }
        dd {
          height: .6rem;
          padding-left: .2rem;
          a {
            color: blue;
          }
        }
      }
    }
    .loadBtn {
      height: .8rem;
      text-align: center;
      line-height: .8rem;
      font-size: .3rem;
      border-bottom: 1px solid #eee;
    }
  }
</style>
