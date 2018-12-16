<template>
    <div class="boutique">
        <div class="boutiquebvieo">
            <p class="boutinqueVbioe">Web前端</p>
            <p class="boutinqueVlose">入门简单易就业，前景无限高薪资</p>
            <a href="javascript:;" class="boutinquevlosm" @click.stop="addMore(numType)">更多>></a>
        </div>
        <div class="boutiqueVbstore">
            <ul class="boutiqueVbstoreUl">
                <li class="boutblist" v-if="dataAll.type=1" v-for="(item,index) in dataai"  :key="index" @click.stop="toPlay(item.id)">
                    <img class="boutblistimg" v-lazy="$store.state.imgBaseUrl+item.picture" alt="">
                    <div class="boutbtime">
                        <p class="boubtimeLe">{{ item.rangeName }}</p>
                        <p class="boubtimeri">{{ item.duration }}</p>
                    </div>
                    <p class="boutbtitle">{{ item.videoAlias }}</p>
                    <div class="boutbauth">
                        <p class="boutbauer">{{ item.teacherName }}</p>
                        <p class="boutbNum">{{ item.viewCount }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        props:['boutVideo'],
        data(){
            return {
                boutique:[],
                dataAll: [],
                datas: [],
                ind: 4,
                datasImg:[],
                dataAi:[],
                dataai:[],
                dataTypes:[],
                numType:null
            }
        },
        beforeCreate(){
        },
        mounted(){
            this.$post('/api/video/lectureHallVideo').then(res =>{
                this.dataAll = res.data.data;
                const dataType = this.dataAll;
                for (let i=0;i<dataType.length;i++){
                    if(dataType[i].type===5){
                        this.datas.push(dataType[i]);
                    }
                }
                for (let _i = 0;_i<this.datas.length;_i++){
                    this.dataai = this.datas.slice(0,4);
                    // console.log(this.dataai);
                }
                this.dataTypes.push(this.dataai[1]);
                this.numType = this.dataTypes[0].type;
            }).catch((err)=>{
                throw err
            });
        },
        methods: {
            addMore(type){
                this.$router.push({name:'videoList',params:{state: '-b' + 6}})
            },
            toPlay (id) {
                this.$router.push({name: 'videoPlay', params: {id: id}})
            }
        }
    }
</script>
<style lang="less" scoped>
    .boutique{
        margin: 0 auto;
        height: 9.14rem;
        margin-top: 0.02rem;
        .boutiquebvieo{
            width: 7.1rem;
            margin: 0 auto;
            height: 0.8rem;
            border-bottom: 0.01rem solid #dadada;
            .boutinqueVbioe{
                display: inline-block;
                color: #000000;
                font-size: 0.36rem;
                border-bottom: 0.04rem solid #e10030;
                padding-bottom: 0.2rem;
                padding-top: 0.1rem;
                float: left;
            }
            .boutinqueVlose{
                display:block;
                color: #999999;
                font-size: 0.26rem;
                margin-left: 0.2rem;
                float: left;
                margin-top: 0.2rem;
            }
            .boutinquevlosm{
                color: #999999;
                font-size: 0.28rem;
                display: block;
                float: right;
                margin-right: 0.1rem;
                margin-top: 0.15rem;
            }
        }
    }
    .boutiqueVbstore{
        width: 7.5rem;
        height: 8.35rem;
        background: #eeeeee;
        ul{
            width: 7.5rem;
            padding-top: 0.1rem;
            li{
                width: 3.45rem;
                height: 3.84rem;
                background-color: #ffffff;
                float: left;
                position: relative;
                cursor: pointer;
                margin-left: 0.2rem;
                margin-top: 0.2rem;
                img{
                    width: 3.45rem;
                    height: 2.14rem;
                }
                .boutbtime{
                    width: 3.45rem;
                    height: 0.4rem;
                    background:rgba(0,0,0,0.3);
                    position: absolute;
                    top: 1.75rem;
                    p{
                        color: #ffffff;
                        font-size: 0.2rem;
                        line-height: 0.4rem;
                    }
                    .boubtimeLe{
                        float: left;
                        margin-left: 0.12rem;
                    }
                    .boubtimeri{
                        float: right;
                        margin-right: 0.12rem;
                    }
                }
                .boutbtitle{
                    width: 3rem;
                    height: 0.76rem;
                    color: #333333;
                    font-size: 0.28rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -moz-box-orient: vertical;
                    -ms-box-orient: vertical;
                    -o-box-orient: vertical;
                    -webkit-line-clamp:2;
                    -moz-line-clamp:2;
                    -ms-line-clamp:2;
                    -o-line-clamp:2;
                    overflow: hidden;
                    text-align: left;
                    margin-left: 0.2rem;
                    line-height: 0.41rem;
                    margin-top: 0.08rem;
                }
                .boutbauth{
                    width: 3.07rem;
                    margin: 0 auto;
                    margin-top: 0.2rem;
                    p{
                        color: #999999;
                        font-size: 0.22rem;
                    }
                    .boutbauer{
                        float: left;
                    }
                    .boutbNum{
                        height: 0.24rem;
                        width: 0.8rem;
                        background: url("../../assets/img/boutbsta01.png") no-repeat left;
                        background-size: 37%;
                        float: right;
                        text-align: right;
                        line-height: 0.24rem;
                    }
                }

            }
        }
    }
</style>