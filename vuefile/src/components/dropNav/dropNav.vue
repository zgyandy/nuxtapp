<template>
  <div class="dropNav">
    <dl class="title">
      <dd :class="ind === (key + 1) ? 'active' : ''" v-for="(item, key) in dropArr" :key="key" @click.stop="ind = key + 1">
        <span>{{item}}</span>
        <span>&nbsp;</span>
        <span v-if="ind === key" class="iconfont icon-shang"></span>
        <span v-else class="iconfont icon-xia"></span>
      </dd>
    </dl>
    <!--  v-show="listArr.length > 1" -->
    <div class="listBox" @click.self="ind = 0" v-show="ind > 0">
      <ul class="list" v-show="ind === 1" @click.stop="">
        <li  :class="{ active: subject == 0}" @click.stop="search('subject', 0)">
          <span>全部</span>
        </li>
        <li v-for="(item, key) in subjectArr" :class="{ active: subject == item.dataCode}" :key="key" @click.stop="search('subject', item.dataCode)">
          <span>{{item.name}}</span>
        </li>
      </ul>
      <ul class="list" v-show="ind === 2">
        <li  :class="{ active: difficulty == 0}"  @click.stop="search('difficulty', 0)">
          <span>全部</span>
        </li>
        <li v-for="(item, key) in difficultyArr" v-show="item.name != '其它'" :class="{ active: difficulty == item.dataCode}" :key="key" @click.stop="search('difficulty', item.dataCode)">
          <span>{{item.name}}</span>
        </li>
      </ul>
      <ul class="list" v-show="ind === 3">
        <li v-for="(item, key) in sortArr" :class="{active : sot == key }" :key="key" @click.stop="search('sot', key)">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dropArr', 'difficultyArr', 'subjectArr'],
  data () {
    return {
      listArr: [],
      ind: 0,
      start: 1,
      subject: 0,
      difficulty: 0,
      sot: 0,
      sortArr: [{title: '综合', id: 0}, {title: '人气', id: 1},{title: '最新', id: 2}]
    }
  },
  mounted () {
    // console.log(this.$route.params.subject, this.$route.params.difficulty)
    this.sliceUrl ()
  },
  methods: {
    search (state, code) {
      this.ind = 0
      if (state === 'subject') {
        this.subject = code
      }else if (state === 'difficulty') {
        this.difficulty = code
      }else if (state === 'sot') {
        this.sot = code
      }
      // this.$router.push({name: 'videoList', params: {
      //   state: (this.subject > 0 ? '-a' + this.subject : '') + (this.difficulty > 0 ? '-b' + this.difficulty: '') + (this.sot > 0 ? '-c' + this.sot : '')
      // }})
      location.assign(`/video/total${(this.subject > 0 ? '-a' + this.subject : '') + (this.difficulty > 0 ? '-b' + this.difficulty: '') + (this.sot > 0 ? '-c' + this.sot : '')}/`)
      // 请求接口
      this.$emit('getData', this.subject, this.difficulty, this.sot)
    },
    sliceUrl () {
      if (this.$route.params.state) {
        var arr = this.$route.params.state.split('-')
        for (var i = 0; i < arr.length; i++) {
          if(arr[i] != '') {
            if (arr[i].indexOf('a') != -1) {
              this.subject  = arr[i].slice(1)
            }else if (arr[i].indexOf('b') != -1) {
              this.difficulty  = arr[i].slice(1)
            }else if (arr[i].indexOf("c") != -1) {
              this.sot  = arr[i].slice(1)              
            }
          }
        }
      }
      this.$emit('getData', this.subject, this.difficulty, this.sot)
    }
  }
}
</script>

<style lang="less" scoped>
  .dropNav {
    width: 7.5rem;
    height: 0.96rem;
    position: relative;
    .title {
      height: 0.96rem;
      border-top: 1px solid  #dadada;
      border-bottom: 1px solid  #dadada;
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      overflow: hidden;
      text-align: center;
      z-index: 909;
      font-size: .3rem;
      dd {
        flex: 1;
        line-height: .96rem;
        border-right: 1px solid  #dadada;
      }
      dd.active {
        color: #e10030;
      }
      .iconfont {
        font-size: .4em;
      }
    }
    .listBox {
      position: fixed;
      width: 7.5rem;
      height: 100%;
      left: 50%;
      top: 2rem;
      background: rgba(0, 0, 0, .5);
      transform: translate(-50%, 0);
      -o-transform:  translate(-50%, 0);
      -webkit-transform:  translate(-50%, 0);
      z-index: 90;
      .list {
        padding: .3rem .2rem .1rem;
        width: 7.1rem;
        top: 0rem;
        background: #fff;
        left: 0;
        min-height: 2rem;
        // display: flex;
        // display: -webkit-flex;
        // flex-wrap: wrap;
        // -ms-flex-wrap: wrap;
        // justify-content: space-between;
        li {
          height: .75rem;
          width: 1.4rem;
          float: left;
          margin-right: .19rem;
          height: 0.75rem;
          padding: 0 .1rem;
          background-color: #ffffff;
          border-radius: 0.1rem;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-size: .26rem;
          margin-bottom: .2rem;
          background-color: #eeeeee;
          text-align: center;
        }
        li:nth-child(4n + 4) {
          margin-right: 0;
        }
        li.active {
          box-shadow: 0 .02rem 0 #e10030,.02rem 0 0 #e10030, -.02rem 0 0 #e10030, 0 -.02rem 0 #e10030;
          background: none;
          color: #e10030;
        }
      }
    }
  }
</style>

