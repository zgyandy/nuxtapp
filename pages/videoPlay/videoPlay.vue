<template>

  <div class="videoPlay">
    <!-- 播放盒子 -->
    <videoBox ref="videoBox" :youkuVideoId="youkuVideoId" :isLogin="isLogin" :isVip="isVip" :username="username" :mobile="mobile"></videoBox>
    <!-- 视频介绍 -->
    <div class="videoExplain">
      <h3 class="title">视频介绍</h3>
      <p class="videoMsg grayColor" v-show="showMsg">{{videoMsg.description}}</p>
      <div class="packBtn" :class="{redColor: showMsg}" @click="showMsg = !showMsg">
        <span>{{showMsg ? '收起' : '展开'}}</span>
        <span v-if="!showMsg" class="iconfont icon-xia"></span>
        <span v-else class="iconfont icon-shang"></span>
      </div>
    </div>
    <Gray></Gray>
    <!-- 讲师 -->
    <dl class="lecturer dis-flex-bt">
      <dt @click="showDialogs">
          <img :src="teacher.id * 1 == -1 ? 'http://static.deviotek.com/images/video/iotek.png' : teacher.photo" alt="头像">
          <div class="msg">
            <h4 class="name">{{teacher.id * 1 == -1 ? '职坐标' : teacher.name}}</h4>
            <p class="grayColor">{{pagedResult.total}}个视频</p>
          </div>
      </dt>
      <dd class="callBtn" v-show="teacher.id * 1 !== -1">
        <a @click="showDialog">
          <img src="../../assets/img/minmsg.png" alt="">
          <span>联系他</span>
        </a>
      </dd>
    </dl>
    <Gray></Gray>
    <!-- list -->
    <ul class="videoList">
      <li class="dis-flex-bt" v-for="(item, key) in pagedResultArr" :key="key">
        <a :href="'/video/play-' + item.id + '.htm'" class="dis-flex-bt">
          <div class="msg">
          <p class="explain">{{item.title}}</p>
          <div class="grayColor">
            <span class="name">{{item.teacherName}}</span>
            <img src="../../assets/img/play.png" alt="">
            <span>&nbsp;{{item.viewCount}}</span>
          </div>
        </div>
        <div class="imgBox">
          <img :src="$store.state.imgBaseUrl + item.picture" alt="">
          <div class="videotime">{{item.formatDuration}}</div>
        </div>
        </a>
      </li>
    </ul>
    <!-- 展开更多 -->
    <div v-show="pagedPage < pagedResultPages" @click.stop="teacherVideo" class="loadMore grayColor">展开更多<span class="iconfont icon-xia"></span></div>
    <Gray></Gray>
    <!-- 评论列表 -->
    <ul class="commentsList">
      <li v-for="(item, key) in commentList" :key="key">
        <div class="img">
          <img :src="$store.state.imgBaseUrl + item.commentatorAvatar" alt="">
        </div> 
        <dl class="msg">
          <dt class="dis-flex-bt">
            <div>{{item.commentatorName}}</div>
            <div class="grayColor">{{item.createTime | dateLong}}</div>
          </dt>
          <dd>{{item.content}}</dd>
        </dl>
      </li>
    </ul>
    <div class="commentInp">
      <!-- 输入框 -->
      <div class="inpBox">
        <div>
          <input @click.stop="commentClick" readonly maxlength="20" type="text" placeholder="说说你的看法....">
        </div>
        <div>
          <img class="msgIcon" src="../../assets/img/msg.png" alt="">
          <span class="msgTotal" v-show="videoMsg.commentNum > 0">{{videoMsg.commentNum}}</span>
          <a href="tel:400-636-0069">
            <img class="phoneIcon" src="../../assets/img/phone.png" alt="">
          </a>
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="coverBoxGray" :class="{zindex: textareaBox}" @click.self="textareaBox = false">
      <div class="textareaBox" @click.stop="">
        <div class="close" @click.self="textareaBox = false">
          <img src="../../assets/img/close.png" alt="">
        </div>
        <textarea v-model="comment" maxlength="50" name="" placeholder="说说你的看法" rows="" cols="" id="comment"></textarea>
        <div class="btn" @click.stop="sendComment">发送</div>
      </div>
    </div>
    <upVip ref="upVip" :username="username" :mobile="mobile"></upVip>
    <div class="hide overflowHide" v-show="dialog" @touchmove.prevent>
      <div class="planning">
        <div class="planer">
          <p class="clickHide" @click="close"></p>
          <p class="planText" >名师答疑</p>
          <p class="planLin"></p>
          <p class="planRes">验证手机，获取资深老师免费答疑解惑</p>
          <ul class="planPosion">
            <li class="planFili">选择关注课程：</li>
            <li @click="select('人工智能物联网')" :class="cards=='人工智能物联网'?'listtive':'list'">人工智能物联网</li>
            <li class="as" @click="select('大数据开发/分析')" :class="cards=='大数据开发/分析'?'listtive':'list'">大数据开发/分析</li>
            <li @click="select('人工智能Python')" :class="cards=='人工智能Python'?'listtive':'list'">人工智能Python</li>
            <li @click="select('Java全栈开发')" :class="cards=='Java全栈开发'?'listtive':'list'">Java全栈开发</li>
            <li @click="select('WEB前端')" :class="cards=='WEB前端'?'listtive':'list'">WEB前端+H5</li>
          </ul>
          <input type="text" value="1" style="display: none;">
          <div class="planInpuOne">
            <p class="plred" v-show="dialoger">请输入正确的手机号码!</p>
            <p class="plgreen" v-show="dialogar">验证码发送成功，请注意查看手机！</p>
            <p class="classer" v-show="dialodsr">请选择课程！</p>
            <p class="dismer" v-show="dialogper">请输入正确的验证码！</p>
            <p class="disfile" v-show="disfile">获取失败，请重试！</p>
            <p class="disfila" v-show="disfila">验证码错误，请重新输入</p>
            <p class="disloding" v-show="dislod">请稍后，我们即将与您联系！</p>
            <input type="text" maxlength="11" placeholder="请输入手机号码" v-model="mobiles">
          </div>
          <div class="planInpuTwo">
            <input type="text" maxlength="6" v-model="smsCode" placeholder="请输入验证码">
            <a href="javascript:;" v-show="sendAuthCode" @click="getCode">获取验证码</a>
            <a href="javascript:;" v-show="!sendAuthCode">{{ authTime }}秒后重新发送</a>
          </div>
          <a class="clickSubmit" href="javascript:;" @click="creatOrder">提交</a>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import videoBox from '../../components/videoBox/videoBox'
import upVip from '../../components/upVip/upVip'
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
      player: '',
      showMsg: true,
      videoMsg: {},
      lecture: {},
      start: 1,
      pagedResult: {},
      pagedResultArr:[],
      pagedResultPages: 0,
      pagedPage: 1,
      teacher: {},
      page: 1,
      commentList: [],
      textareaBox: false,
      comment: '',
      currentTime: 0,
      isVip: false,
      isLogin: false,
      mobile: '',
      userId: '',
      userphoto: '',
      username: '',
      youkuVideoId: '',
      dialog:false,
      dialoger:false,
      dialogar:false,
      dialodsr:false,
      dialogper:false,
      disfile:false,
      disfila:false,
      dislod:false,
      authTime:0,
      cards:null,
      mobiles:null,
      smsCode:'',
      sendAuthCode:true,
      metaTitle: '',
      keyWords: '',
      Description: ''
    }
  },
  beforeCreate () {
    // 检测是否登录
    this.$get('/api/queryLoginUser').then(res => {
      if (res.data.code === 911) {
        this.isLogin = false
        this.getVideo ()
      }else if (res.data.code == 200) {
        this.isLogin = true
        this.checkVip (res.data.data.id, res.data.data.mobile)
        this.mobile = res.data.data.mobile
        this.userid = parseInt(res.data.data.id)
        this.userphoto = res.data.data.photo
        this.username = res.data.data.username
      }
    }).catch(err => {
      throw err
    })
  },
  mounted () {
    // 老师信息
    this.teacherMsg ()
    // 评论信息
    this.commentFn (1)
  },
  methods: {
    getVideo () {
      // 视频信息
      this.$get("/api/play/video",{videoId: this.$route.params.id}).then(res => {
        if (res.data.code === 200) {
          this.videoMsg = res.data.data
          this.$store.commit('navTitle', res.data.data.title)

          this.metaTitle = res.data.data.title
          this.Description = res.data.data.description
          this.keyWords = res.data.data.keywords

          this.$refs.videoBox.videoMsg = res.data.data
          this.youkuVideoId = res.data.data.youkuVideoId
          this.$refs.videoBox.showPlayer (res.data.data.youkuVideoId, res.data.data.rangeDataId, this.isLogin, this.isVip)
          // if (this.isLogin) { 
          //   // 是否为付费视频
          //   this.$refs.videoBox.vipVideo = parseInt(this.videoMsg.rangeDataId) === 16 ? true : false
          // }else {
          //   // 未登录判断是否为免费视频
          //   this.$refs.videoBox.vipVideo = parseInt(this.videoMsg.rangeDataId) > 14 ? true : false
          // }
        }
      }).catch((err) => {
        throw err
      })
    },
      //获取验证码
      showDialog(){
          this.dialog=true;
      },
      close(){
          this.dialog=false
      },
      select(cartype){
          this.cards = cartype;
      },
      getCode() {
          const phone = /^1(3|4|7|5|6|8|9)\d{9}$/;
          if(phone.test(this.mobiles)){
              //数据装库，准备传入
              let data = {
                  mobile:this.mobiles,
                  callback:'jsonp'
              };
              //此处为数据请求，将验证码所需电话传入
              var _this = this;
              this.$jsonp(_this.$store.state.forumCode+'/sendMessages/sendMobileCode',data).then(json=>{
                  this.sendAuthCode = false;
                  this.authTime = 60;
                  let authTimer = setInterval(()=>{
                      this.authTime--;
                      if(this.authTime<=0){
                          this.sendAuthCode = true;
                          clearInterval(authTimer);
                      }
                  },1000);
                  this.dialogar=true;
                  const me = this;
                  const interval = window.setInterval(function(){
                      me.dialogar=false;
                      window.clearInterval(interval);
                  },2000)
              }).catch((err=>{
                  alert("失败");
                  //此处有疑问
                  this.disfile = true;
                  const me = this;
                  const interval = window.setInterval(function(){
                      me.disfile=false;
                      window.clearInterval(interval);
                  },2000)
              }))
          }else{
              this.dialoger=true;
              const me = this;
              const interval = window.setInterval(function(){
                  me.dialoger=false;
                  window.clearInterval(interval);
              },2000)
          }
      },
      creatOrder() {
          const phone = /^1(3|4|7|5|6|8|9)\d{9}$/;
          if(!this.cards){
              this.dialodsr = true;
              const me = this;
              const interval = window.setInterval(function(){
                  me.dialodsr=false;
                  window.clearInterval(interval);
              },2000)
          }else if(!phone.test(this.mobiles)){
              this.dialoger=true;
              const me = this;
              const interval = window.setInterval(function(){
                  me.dialoger=false;
                  window.clearInterval(interval);
              },2000)
          }else if(!this.smsCode){
              this.dialogper=true;
              const me = this;
              const interval = window.setInterval(function(){
                  me.dialogper=false;
                  window.clearInterval(interval);
              },2000)
          }else{
              let mobileCode = {
                  mobile:this.mobiles,
                  mobileCode:this.smsCode,
                  callback:'jsonp',
              };
              // 成功了再次执行提交表单
              //进行验证码验证,如果验证码正确
              var _this = this;
              this.$jsonp(_this.$store.state.forumCode+'/sendMessages/validMobileCode',mobileCode).then(json=>{
                  console.log(json.code);
                  if(json.code==2){
                      this.disfila = true;
                      const me = this;
                      const interval = window.setInterval(function(){
                          me.disfila=false;
                          window.clearInterval(interval);
                      },2000)
                  }else{
                      //验证成功之后，再提交
                      let dataOrder = {
                          mobile:this.mobiles,//电话
                          source:2,
                          username:'同学',
                          channelId:0,
                          attentionType:this.attenType,
                          attentionCourse:this.cards,//课程
                          code:this.smsCode,
                      };
                      //此处直接执行表单提交
                      this.$post('/api/user/save',dataOrder).then(res=>{
                          this.dislod = true;
                          const loca = this;
                          const interval = window.setInterval(function () {
                              loca.dialog = false;
                              loca.dislod = false;
                              loca.mobile = null;
                              loca.smsCode = null;
                              window.clearInterval(interval);
                          },1000)
                      }).catch((err)=>{
                          //未提交成功
                          console.log("失败");
                          throw err
                      });

                  }
              }).catch((err)=>{
                  //否则验证码错误
                  this.disfila = true;
                  const me = this;
                  const interval = window.setInterval(function(){
                      me.disfila=false;
                      window.clearInterval(interval);
                  },2000)
              })
          }
      },
    teacherMsg (n) {
      this.$get('/api/play/teacher', {videoId: this.$route.params.id, start: n ? n : this.pagedPage}).then(res => {
        if (res.data.code === 200) {
          this.pagedResult = res.data.data.pagedResult
          this.teacher = res.data.data.teacher
            this.pagedResultPages = res.data.data.pagedResult.pages
          if (n) {
            this.pagedResultArr = res.data.data.pagedResult.dataList.concat(this.pagedResultArr)
          }else {
            this.pagedResultArr = res.data.data.pagedResult.dataList
          }
        }
      })
    },
    commentFn (n) {
      this.$get('/api/play/comments',{videoId: this.$route.params.id, page: n}).then(res => {
        if (res.data.code === 200) {
          this.commentList = res.data.data.dataList
        }
      }).catch(err => {
        throw err
      })
    },
    sendComment () {
      if (this.isLogin) {
        // 评论
        if (this.comment) {
          console.log(this.userId)
          this.$post('/api/play/saveComment', {videoId: this.$route.params.id, content: this.comment, 
            createUser: this.userId, commentatorName: this.username, commentatorAvatar: this.userphoto}).then(res => {
              if(res.data.code === 200) {
                // 重新获取评论
                this.commentFn (1)
                this.comment = ''
                this.textareaBox = false
              }
          }).catch(err => {
            throw err
            this.textareaBox = false
          })
        }
      }
    },
    checkVip (id, mobile) {
      var _this = this
      jQuery.ajax({
        url: _this.$store.state.vipUrl + '?userId=' + id + '&mobile='+ mobile,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "callback",
        success: function (res) {
          _this.isVip = res
          _this.getVideo ()
        },
        error: function (error) {
            throw error
        }
      })
    },
    commentClick () {
        if (this.isLogin) {
          this.textareaBox = true
        }else {
          location.assign(this.$store.state.domain + '/user/') 
        }
    },
    teacherVideo () {
      this.pagedPage += 1
      this.teacherMsg (this.pagedPage)
    },
    toPlay (id) {
      // this.$router.push({name: 'videoPlay', params: {id: id}})
    },
    showDialogs(){
        if (~this.teacher.id){
            location.assign('this.$store.state.domain + \'/blog/teacher\' + teacher.no + \'/\'')
        }
    }
  },
  beforeDestroy () {
    this.$store.commit('navTitle', '职坐标')
  },
  components: {
    videoBox, upVip
  }
}
</script>

<style lang="less" scoped>
  .videoPlay {
    position: relative;
    padding-top: 4.6 + .96rem;
    .videoExplain {
      padding: 0 .2rem;
      border-top: 1px solid #dadada;
      .title {
        height: .93rem;
        line-height: .93rem;
        font-size: 0.36rem;
      }
      .videoMsg {
        font-size: 0.28rem;
        line-height: .42rem;
      }
      .packBtn {
        height: .7rem;
        line-height: .7rem;
        text-align: right;
        font-size: .28rem;
        .iconfont {
          font-size: .28rem;
        }
        span:first-child {
          margin-right: .1rem;
        }
      }
    }
    .lecturer {
      height: 1.5rem;
      padding:0 .2rem;
      font-size: 0.28rem;
      dt {
        display: flex;
        display: -webkit-flex;
        a{
          display: flex;
          display: -webkit-flex;
        }
        img {
          display: block;
          width: 1.24rem;
          height: 1.24rem;
          border-radius: 50%;
          margin-right: .3rem;
        }
        .msg {
          h4 {
            font-size: .36rem;
            line-height: .6rem;
          }
          p {
            font-size: .3rem;
          }
        }
      }
      .callBtn {
        width: 1.8rem;
        height: 0.78rem;
        background-color: #e10030;
        border-radius: 0.1rem;
        text-align: center;
        line-height: .78rem;
        color: #fff;
        a {
          color: inherit;
        }
        img {
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          margin-right: .1rem;

        }
      }
    }
    .videoList {
      padding: 0 .2rem;
      li {
        height: 1.72rem;
        padding: .3rem 0;
        border-bottom: dashed 1px #dadada;
        a {
          color: #333;
        }
        .msg {
          width: 4.5rem;
          .explain {
            height: .8rem;
            line-height: .4rem;
            font-size: 0.3rem;
            overflow: hidden;
            padding-bottom: .2rem;
          }
          .grayColor {
            height: .3rem;
            line-height: .3rem;
            img {
              width: 0.37rem;
              height: 0.28rem;
              margin-left: .9rem;
            }
          }
        }
        .imgBox {
            width: 2.3rem;
            height: 1.72rem;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .videotime {
              height: 0.4rem;
              background-color: rgba(0, 0, 0, 0.7);
              border-radius: 0.1rem;
              opacity: 0.7;
              position: absolute;
              bottom: 0;
              right: 0;
              padding: 0 .2rem;
              line-height: .4rem;
              color: #fff;
              font-size: 0.24rem;
            }
        }
      }
    }
    .loadMore {
      height: .87rem;
      line-height: .87rem;
      text-align: center;
      font-size: 0.28rem;
      .iconfont {
        margin-left: .1rem;
        font-size: .28rem;
      }
    }
    .commentsList {
      padding: 0 .2rem;
      padding-bottom: 1.28rem;
      li {
        padding: .3rem 0;
        overflow: hidden;
        border-bottom: dashed 1px #dadada;
        .img {
          width: 1.04rem;
          height: 1.04rem;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .msg {
          width: 5.75rem;
          float: right;
          dt {
            height: .32rem;
            line-height: .32rem;
            font-size: .3rem;
            margin-bottom: .3rem;
            .grayColor {
              font-size: .26rem;
            }
          }
          dd {
            font-size: .26rem;
            line-height: .4rem;
          }
        }
      }
    }
    .commentInp {
      height: .98 - .1rem;
      width: 7.1rem;
      padding: .1rem .2rem 0;
      border-top: solid 1px #dadada;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      -o-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      background: #fff;
      .inpBox {
        overflow: hidden;
        &>div:first-child {
          float: left;
          input {
            width: 4.76rem;
            height: 0.78rem;
            background-color: #ffffff;
            border-radius: 0.39rem;
            border: solid 0.02rem #e4e4e4;
            text-indent: .25rem;
            font-size: 0.28rem;
          }
        }
        &>div:last-child {
          float: right;
          padding-top: .17rem;
          position: relative;
          .msgIcon {
            width: 0.54rem;
            height: 0.48rem;
            margin-right: .4rem;
          }
          .phoneIcon {
            width: 0.46rem;
	          height: 0.46rem;
          }
        }
        .msgTotal {
          position: absolute;
          padding: 0 .1rem;
          height: 0.25rem;
          left: .3rem;
          top: 0.12rem;
          background-color: #d80629;
          border-radius: 0.13rem;
          line-height: .25rem;
          color: #fff;
          font-size: .18rem;
        }
      }
    }
    .coverBoxGray {
      height: 100%;
      width: 7.5rem;
      position: fixed;
      bottom: 0;
      left: 50%;
      margin-left: -3.75rem;
      background: rgba(0, 0, 0, 0.7);
      z-index: -1;
      opacity: 0;
      .textareaBox {
        width: 7.1rem;
        padding: 0 .2rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        .close {
          height: .4rem;
          width: 100%;
          overflow: hidden;
          padding: .1rem 0;
          img {
            float: right;
            width: .4rem;
            height: .4rem;
          }
        }
        textarea {
          height: 1.2rem;
          width: 100%;
          border: solid 0.02rem #e4e4e4;
          resize: none;
          font-size: .28rem;
        }
        .btn {
          width: 1.7rem;
          height: 0.78rem;
          background-color: #e10030;
          border-radius: 0.1rem;
          color: #fff;
          text-align: center;
          line-height: .78rem;
          font-size: .3rem;
          margin-top: .2rem;
          float: right;
        }
      }
    }
    div.zindex {
      z-index: 999;
      opacity: 1;
    }
  }

  .overflowHide{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:100;
  }
  .hide{
    width: 7.5rem;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    .planning{
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.7);
      width: 7.5rem;
      height: 100%;
      right: 0;
      .planer{
        width: 7.5rem;
        height: 8.32rem;
        background: #ffffff;
        position: fixed;
        top: 1.5rem;
        .clickHide{
          width: 0.35rem;
          height: 0.35rem;
          margin-left: 6.9rem;
          margin-top: 0.2rem;
          background: url("../../assets/img/x.png") no-repeat center;
          z-index: 3;
          position: relative;
        }
        .planText{
          color: #000000;
          font-size: 0.36rem;
          text-align: center;
          margin-top: -0.2rem;
          z-index: 2;
        }
        .planLin{
          width: 7.5rem;
          height: 0.01rem;
          background: #dadada;
          margin-top: 0.33rem;
        }
        .planRes{
          color: #ff6000;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.17rem;
        }
        .planPosion{
          width: 6.7rem;
          height: 1.6rem;
          margin: 0 auto;
          margin-top: 0.57rem;
          li{
            box-sizing:border-box;
            width: 2.1rem;
            height: 0.7rem;
            background-color: #eeeeee;
            border-radius: 0.1rem;
            color: #333333;
            font-size: 0.26rem;
            line-height: 0.64rem;
            float: left;
            text-align: center;
            cursor: pointer;
            word-break:keep-all;
          }
          .planFili{
            color: #000000;
            font-size: 0.3rem;
            float: left;
            line-height: 0.66rem;
            background: #ffffff;
          }
          li:nth-child(2),li:nth-child(3),li:nth-child(5),li:nth-child(6){
            margin-left: 0.2rem;
          }
          li:nth-child(6),li:nth-child(4),li:nth-child(5){
            margin-top: 0.1rem;
          }
          .listtive{
            box-sizing:border-box;
            width: 2.1rem;
            height: 0.7rem;
            border-radius: 0.1rem;
            border: solid 0.02rem #e10030;
            color: #e10030;
            background: #ffffff;
            word-break:keep-all;
          }
        }
        .planInpuOne{
          height: 0.74rem;
          width: 6.7rem;
          margin:0 auto;
          margin-top:0.6rem ;
          position: relative;
          input{
            height: 0.7rem;
            width: 6.63rem;
            border: solid 0.03rem #e4e4e4;
            color: #000000;
            font-size: 0.28rem;
            text-indent: 0.3rem;
          }
          .plred{
            font-size: 0.24rem;
            color: #e10030;
            text-align: center;
            position: absolute;
            top: 0.8rem;
          }
          .plgreen{
            font-size: 0.24rem;
            color: green;
            text-align: center;
            position: absolute;
            left: 27%;
            top: -0.5rem;
          }
          .disloding{
            font-size: 0.24rem;
            color: green;
            text-align: center;
            position: absolute;
            left: 27%;
            top: -0.5rem;
          }
          .classer{
            font-size: 0.24rem;
            color: #e10030;
            text-align: center;
            position: absolute;
            left: 40%;
            top: -0.5rem;
          }
          .dismer{
            font-size: 0.24rem;
            color: #e10030;
            text-align: center;
            position: absolute;
            top: 1.9rem;
          }
          .disfile{
            font-size: 0.24rem;
            color: #e10030;
            text-align: center;
            position: absolute;
            top: 1.9rem;
          }
          .disfila{
            font-size: 0.24rem;
            color: #e10030;
            text-align: center;
            position: absolute;
            top: 1.9rem;
          }

        }
        .planInpuTwo{
          height: 0.74rem;
          width: 6.8rem;
          margin-left: 0.4rem;
          margin-top: 0.42rem;
          box-sizing: border-box;
          input{
            width:4.39rem;
            height: 0.7rem;
            color: #000000;
            font-size: 0.28rem;
            text-indent: 0.3rem;
            border: 0.03rem solid #e4e4e4;
            display: inline-block;
            box-sizing: border-box;
          }
          a{
            width: 2.01rem;
            height: 0.78rem;
            background-color: #ff6000;
            color: #ffffff;
            font-size: 0.24rem;
            line-height: 0.78rem;
            display: inline-block;
            text-align: center;
            margin-left: 0.22rem;
            box-sizing: border-box;
          }
          p{
            font-size: 0.2rem;
            color: #ff6035;
          }
          .plgreen{
            font-size: 0.2rem;
            color: green;
          }
        }
        a.clickSubmit{
          display: block;
          width: 6.7rem;
          height: 0.95rem;
          background-color: #e10030;
          color: #ffffff;
          line-height: 0.95rem;
          text-align: center;
          margin:0 auto;
          margin-top: 0.46rem;
        }
      }
    }
  }
</style>
