<template>
    <div class="forum">
        <div class="formBanner">
            <mt-swipe :auto="4000" :show-indicators="false" :continuous="true">
                <mt-swipe-item v-for="(items,index) in dataImgs" v-if="items.picture" :key="index">
                    <a :href="items.url ? items.url : 'javascript:;'">
                        <img :src="$store.state.imgBaseUrl+items.picture" alt="">
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="forumNav">
            <ul class="forumUl clearfix">
                <li class="forumList" v-for="(item,index) in dataList" :key="index" @click="showDialog(index)" @touchmove.prevent>
                    <div class="forumImg"><img :src="item.listImg" alt=""></div>
                    <p class="forum">{{ item.text }}</p>
                </li>
            </ul>
            <!--弹框-->
            <div class="bulletin">
                <bulletin :bulletin="bulletin"></bulletin>
            </div>
            <p class="formBgm"></p>
        </div>
        <!--精品视频-->
        <boutique-video></boutique-video>
        <!--人工智能-->
        <AiVideo></AiVideo>
        <!--大数据-->
        <big-video></big-video>
        <!--JAVA全栈-->
        <java-video></java-video>
        <!--Web前端-->
        <web-video></web-video>
        <div class="hide overflowHide" v-show="dialog">
            <div class="planning" @click="clickHide">
                <div class="planer" @click.stop="stopClick" v-for="(item,index) in dataList" :key="index" v-show="item.boxShow">
                    <p class="clickHide" @click="close"></p>
                    <p class="planText" >{{ item.title }}</p>
                    <p class="planLin"></p>
                    <p class="planRes">{{ item.meage }}</p>
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
                        <input type="text" maxlength="11" placeholder="请输入手机号码" v-model="mobile">
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
import BoutiqueVideo from '../../components/moreVideo/boutiqueVideo'
import AiVideo from '../../components/aiVideo/aiVideo'
import BigVideo from '../../components/bigdataVideo/bigdataVideo'
import JavaVideo from '../../components/JAVAVideo/javaVideo'
import WebVideo from '../../components/webVideo/webVideo'
import bulletin from '../../components/common/bulletin'
import img1 from '../../assets/img/mainer1.png'
import img2 from '../../assets/img/mainer2.png'
import img3 from '../../assets/img/mainer3.png'
import img4 from '../../assets/img/mainer4.png'
export default {
    metaInfo: {
        title: 'IT职业教育培训_IT培训中心_IT在线教育-职坐标', // set a title
        meta: [
            {// set meta
                name: 'keyWords',
                content: 'IT课程视频,教学授课视频,活动视频回顾,职坐标'
            },{
                name: 'Description',
                content: '职坐标讲堂,汇聚了海量的海同IT课程视频、名师教学授课视频和行业活动视频回顾,为莘莘学子提供优质的学习资源。'
            }
        ],
        link: [
            {
                rel: 'shortcut icon',
                href: 'http://static.zhizuobiao.com/favicon.ico?v=201803060001'
            }
        ]
    },
    data(){
        return {
            dataList:[
                {
                    id:1,
                    listImg:img1,
                    text:'免费试学',
                    title:'预约职坐标免费试学课程服务',
                    meage:'验证手机，即可预约',
                    boxShow: true
                },
                {
                    id:2,
                    listImg:img2,
                    text:'资料索取',
                    title:'索取IT前沿技术资料',
                    meage:'验证手机，获得IT独家培训资料合集下载地址',
                    boxShow: false
                },
                {
                    id:3,
                    listImg:img3,
                    text:'名师答疑',
                    title:'名师答疑解惑析',
                    meage:'验证手机，获取资深老师免费答疑解惑',
                    boxShow: false
                },
                {
                    id:4,
                    listImg:img4,
                    text:'职业规划',
                    title:'职业规划高薪秘籍分析',
                    meage:'验证手机，资深职业规划师指点就业迷津',
                    boxShow: false
                },

            ],
            dialog:false,
            dialoger:false,
            dialogar:false,
            dialodsr:false,
            dialogper:false,
            disfile:false,
            disfila:false,
            dislod:false,
            banners:[],
            cards:'人工智能物联网',
            mobile:null,
            smsCode:'',
            sendAuthCode:true,
            authTime:0,
            innerTexts:'',
            dataImgs:[],
            dataImg:[],
            attentionType:'',
            attenType:'',
            bulletin:{
                title: "人工智能物联网课程升级啦！特惠抢购中！",
                url:'http://www.haitongjiaoyu.com/sem/wulianwang/mwulianwang1/',
            }
        }
    },
    components:{
         BoutiqueVideo, AiVideo, BigVideo,JavaVideo,WebVideo,bulletin
    },

    methods:{
        showDialog(index){

            this.dialog=true;
            for(let val of this.dataList){
                val.boxShow = false;
            }
            this.dataList[index].boxShow = true;
            this.attentionType = this.dataList[index].text;
            if(this.attentionType==="免费试学"){
                this.attenType=15;
            }else if(this.attentionType==="资料索取"){
                this.attenType=1;
            }else if(this.attentionType==="名师答疑"){
                this.attenType=13;
            }else if (this.attentionType==="职业规划") {
                this.attenType=14;
            }
        },
        close(){
            this.dialog=false
        },
        select(cartype){
            this.cards = cartype;
        },
        //获取验证码
        getCode() {
            const phone = /^1(3|4|7|5|6|8|9)\d{9}$/;
           if(phone.test(this.mobile)){
               //数据装库，准备传入
               let data = {
                   mobile:this.mobile,
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
            }else if(!phone.test(this.mobile)){
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
                for (let c=0;c<this.dataList.length;c++){
                    const text = this.dataList.text;
                }
                let mobileCode = {
                    mobile:this.mobile,
                    mobileCode:this.smsCode,
                    callback:'jsonp',
                };
                // 成功了再次执行提交表单
                //进行验证码验证,如果验证码正确
                var _this = this;
                this.$jsonp(_this.$store.state.forumCode+'/sendMessages/validMobileCode',mobileCode).then(json=>{
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
                            mobile:this.mobile,//电话
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
        clickHide(e){
            this.dialog=false;
            e.stopPropagation();
        },
        stopClick(){},
    },
    mounted(){
        this.$post(this.$store.state.domain + '/api/video/lectureHallByAdvertising').then(res =>{
            this.dataImgs = res.data.data;
        }).catch((err)=>{
            throw err;
        });
    }
}

</script>
<style lang="less" scoped>
    .forum{
        position: relative;
        .formBanner{
            margin: 0 auto;
            width: 7.5rem;
            height: 3.46rem;
            a{
                width: 7.5rem;
                height: 3.46rem;
                position: absolute;
                img{
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
            }
            div>div{
                cursor: pointer;
            }
        }
    }
    img{
        width: 100%;
    }
    .forumNav{
        height: 3.16rem;
        .forumUl{
            width: 6.72rem;
            margin: 0 auto;
            height: 2rem;
            margin-top: 0.35rem;
            li:not(:first-child){
                margin-left: 0.7rem;
            }
            .forumList{
                width: 1.13rem;
                height: 1.58rem;
                float: left;
                div{
                    display: block;
                    width: 1.13rem;
                    height: 1.13rem;
                }
                p{
                    color: #000000;
                    font-size: .26rem;
                    height: 0;
                    text-align: center;
                    padding-top: 0.12rem;
                }
            }
        }
        .formBgm{
            width: 7.5rem;
            height: 0.2rem;
            background: #eeeeee;
            margin-top: 0.1rem;
        }
        .bulletin{
            border-top: 0.01rem solid #dadada;
            height: 0.71rem;
            .bulletinRed{
                height: 0.6rem;
                width: 1.48rem;
                font-size: 0.28rem;
                font-weight: bold;
                color: #e10030;
                border-right: 0.01rem solid #dadada;
                float: left;
                text-indent: 0.2rem;
                line-height: 0.6rem;
                margin-top: 0.1rem;
                box-sizing:border-box;
            }
            .bulletinRer{
                box-sizing:border-box;
                float: left;
                font-size: 0.26rem;
                color: #999999;
                text-indent: 0.2rem;
                margin-top: 0.22rem;
                width: 5.35rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
        }
    }
    .clearfix:after{
        display: block;
        content: ".";
        height: 0;
        line-height: 0;
        visibility: hidden;
        clear: both;
    }
    .clearfix{
        zoom:1;
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
                height: 5.1rem;
                background: #ffffff;
                position: fixed;
                bottom: 0;
                z-index: 102;
                .clickHide{
                    width: 0.35rem;
                    height: 0.35rem;
                    margin-left: 7rem;
                    margin-top: 0.05rem;
                    background: url("../../assets/img/x.png") no-repeat center;
                    background-size: 100%;
                    z-index: 3;
                    position: relative;
                }
                .planText{
                    color: #000000;
                    font-size: 0.32rem;
                    text-align: center;
                    margin-top: -0.2rem;
                    z-index: 2;
                }
                .planLin{
                    width: 7.5rem;
                    height: 0.01rem;
                    background: #dadada;
                    margin-top: 0.13rem;
                }
                .planRes{
                    color: #ff6000;
                    font-size: 0.2rem;
                    text-align: center;
                    margin-top: 0.09rem;
                }
                .planPosion{
                    width: 6.7rem;
                    height: 1.6rem;
                    margin: 0 auto;
                    margin-top: 0.27rem;
                    li{
                        box-sizing:border-box;
                        width: 2.1rem;
                        height: 0.44rem;
                        background-color: #eeeeee;
                        border-radius: 0.1rem;
                        color: #333333;
                        font-size: 0.24rem;
                        line-height: 0.44rem;
                        float: left;
                        text-align: center;
                        cursor: pointer;
                        word-break:keep-all;
                    }
                    .planFili{
                        color: #000000;
                        font-size: 0.28rem;
                        float: left;
                        line-height: 0.44rem;
                        background: #ffffff;
                    }
                    li:nth-child(2),li:nth-child(3),li:nth-child(5),li:nth-child(6){
                        margin-left: 0.2rem;
                    }
                    li:nth-child(6),li:nth-child(4),li:nth-child(5){
                        margin-top: 0.16rem;
                    }
                    .listtive{
                        box-sizing:border-box;
                        width: 2.1rem;
                        height: 0.44rem;
                        border-radius: 0.1rem;
                        border: solid 0.02rem #e10030;
                        color: #e10030;
                        background: #ffffff;
                        word-break:keep-all;
                    }
                }
                .planInpuOne{
                    height: 0.5rem;
                    width: 6.7rem;
                    margin:0 auto;
                    position: relative;
                    margin-top: -0.23rem;
                    input{
                        width: 6.7rem;
                        height: 0.5rem;
                        background-color: #ffffff;
                        border: solid 0.02rem #dddddd;
                        color: #000000;
                        font-size: 0.24rem;
                        text-indent: 0.3rem;
                    }
                    input::-webkit-input-placeholder{
                        color: #999999;
                    }
                    .plred{
                        font-size: 0.2rem;
                        color: #e10030;
                        text-align: center;
                        position: absolute;
                        top: 0.15rem;
                        right: 0.1rem;
                    }
                    .plgreen{
                        font-size: 0.2rem;
                        color: green;
                        text-align: center;
                        position: absolute;
                        left: 27%;
                        top: -0.32rem;
                    }
                    .disloding{
                        font-size: 0.2rem;
                        color: green;
                        text-align: center;
                        position: absolute;
                        left: 27%;
                        top: -0.32rem;
                    }
                    .classer{
                        font-size: 0.2rem;
                        color: #e10030;
                        text-align: center;
                        position: absolute;
                        left: 40%;
                        top: -0.32rem;
                    }
                    .dismer{
                        font-size: 0.2rem;
                        color: #e10030;
                        text-align: center;
                        position: absolute;
                        top: 0.83rem;
                        left: 2.3rem;
                    }
                    .disfile{
                        font-size: 0.2rem;
                        color: #e10030;
                        text-align: center;
                        position: absolute;
                        top: 0.83rem;
                        left: 2.3rem;
                    }
                    .disfila{
                        font-size: 0.2rem;
                        color: #e10030;
                        text-align: center;
                        position: absolute;
                        top: 0.83rem;
                        left: 2rem;
                    }

                }
                .planInpuTwo{
                    height: 0.5rem;
                    width: 6.8rem;
                    margin-left: 0.4rem;
                    margin-top: 0.15rem;
                    box-sizing: border-box;
                    input{
                        width:4.39rem;
                        height: 0.5rem;
                        color: #000000;
                        font-size: 0.24rem;
                        text-indent: 0.3rem;
                        border: 0.02rem solid #e4e4e4;
                        display: inline-block;
                        box-sizing: border-box;
                    }
                    input::-webkit-input-placeholder{
                        color: #999999;
                    }
                    a{
                        width: 2.01rem;
                        height: 0.5rem;
                        background-color: #ff6000;
                        color: #ffffff;
                        font-size: 0.26rem;
                        line-height: 0.5rem;
                        display: inline-block;
                        text-align: center;
                        margin-left: 0.22rem;
                        box-sizing: border-box;
                        margin-top: 0.05rem;
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
                    height: 0.8rem;
                    background-color: #e10030;
                    color: #ffffff;
                    line-height: 0.8rem;
                    text-align: center;
                    margin:0 auto;
                    margin-top: 0.3rem;
                }
            }
        }
    }
    .overStorllHide{
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .overStorllAuto{
        overflow-x: auto;
        overflow-y: auto;
    }
</style>