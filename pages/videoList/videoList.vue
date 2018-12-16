<template>

    <div class="videoPlay">
      <dropNav ref="dropNav" @getData="getData" :difficultyArr="difficultyArr" :subjectArr="subjectArr" :dropArr="dropArr"></dropNav>
      <mt-loadmore :maxDistance="maxDistance" :bottomMethod="loadBottom" :bottomAllLoaded="allLoaded" ref="loadmore" bottomPullText="上拉加载" :bottomDistance="bottomDistance">
        <Bulletin :bulletin="bulletin"></Bulletin>
        <videoList :videoList="queryVideoList"></videoList>
        <loadMore :total="allList > total" :title="title"></loadMore>
      </mt-loadmore>
    </div>

</template>

<script>
import dropNav from '../../components/dropNav/dropNav'
import Bulletin from '../../components/common/bulletin'
import videoList from '../../components/videoList/videoList'
import loadMore from '../../components/common/loadMore'
export default {
  name: 'async',
  metaInfo () {
    return {
      title: this.metaTitle, // set a title
      meta: [
        {                 // set meta
          name: 'keyWords',
          content: this.keyWords
        },{
          name: 'Description',
          content: this.Description
        }
      ]
    }
  },
  data () {
    return {
      dropArr:['全部分类', '全部类别', '综合排序'],
      bulletin: {title: '人工智能物联网课程升级啦！特惠抢购中！', url: 'http://www.haitongjiaoyu.com/sem/wulianwang/mwulianwang1/'},
      queryVideoList: [],
      start: 1,
      subject: 0,
      difficulty: this.$route.params.difficulty || 0,
      sot: 0,
      difficultyArr: [],
      subjectArr: [],
      total: 0,
      allList: 0,
      allLoaded: true,
      title: '上拉加载',
      bottomDistance: 80,
      loading: false,
      pages: 0,
      maxDistance: 100,
      allPages: 0,
      metaTitle: `IT课程视频_IT学习视频_IT教学视频-职坐标`,
      Description: `职坐标讲堂,汇聚了海量的IT课程视频、IT学习视频和IT教学视频,为莘莘学子提供优质的学习资源。`,
      keyWords: `IT课程视频,IT学习视频,IT教学视频,职坐标`,
    }
  },
  beforeCreate () {
  },
  mounted () {
    // this.getData (this.subject, this.difficulty, this.sot)
    var _this = this
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop + windowHeight >= (scrollHeight - 10) && _this.start !== _this.allPages){
        _this.allLoaded = false
      }else {
        _this.allLoaded = true
      }
    }
  },
  methods: {
    getData (subject,difficulty,sot, start) {
      this.$get("/api/video/total/", {limit: 10, start: start ? start : this.start, subject: subject, difficulty: difficulty, sort: sot}).then(res => {
        this.allLoaded = true
        if (res.data.code == 200) {
          this.difficultyArr = res.data.data.difficulty
          this.subjectArr = res.data.data.subject
          if (start) {
            this.queryVideoList = res.data.data.queryVideoList.dataList.concat(this.queryVideoList)
          }else {
            this.queryVideoList = res.data.data.queryVideoList.dataList
          }
          this.$refs.loadmore.onBottomLoaded()
          this.total = res.data.data.queryVideoList.total
          this.allList += 10

          this.subject = subject
          this.difficulty = difficulty
          this.sot = sot
          this.allPages = res.data.data.queryVideoList.pages
          if (this.total == 0) {
            this.title = '没有查到该类视频'
          }else if (this.total <= 10 || this.start === res.data.data.queryVideoList.pages) {
            this.title = '加载完成'
            this.allLoaded = true
          }
          this.loading = false
          this.metaTitle = res.data.data.title
          this.keyWords = res.data.data.keywords
          this.Description = res.data.data.description          
        }
      }).catch(err => {
        throw err
        this.allLoaded = true
      })
    },
    loadBottom () {
      this.start += 1
      if (this.loading) {
        return false
      }
      this.loading = true
      this.getData (this.subject, this.difficulty, this.sot, this.start)
    }
  },
  watch: {
    $route: function (to, from) {
      this.$refs.dropNav.sliceUrl ()
    }
  },
  components: {
    dropNav, Bulletin, videoList, loadMore
  }
}
</script>

<style lang="less" scoped>
  .videoPlay {
    background-color: #eeeeee;
    min-height: 100%;
    overflow-y: scroll;
  }
  .loadMore {
    height: .88rem;
    text-align: center;
  }
</style>
