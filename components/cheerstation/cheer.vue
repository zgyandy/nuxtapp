<template>
  <div class="cheerStation">
    <h4 class="title">
      <img src="../../assets/img/comeon.png" alt="加油">
      <span>职场加油站  薪资翻一番</span>
    </h4>
    <ul class="cheerList">
      <li v-for="(item, key) in cheer" v-show="key < 5" :key="key"><a :href="item.url"><img :src="item.photo" alt=""></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['cheer']
}
</script>

<style lang="less" scoped>
  .cheerStation {
    width: 7.1rem;
    margin: 0 auto;
    padding-bottom: .4rem;
    .title {
      height: .95rem;
      line-height: .95rem;
      text-align: center;
        font-size: 0.36rem;
        font-weight: normal;
        border-bottom: 1px solid  #dadada;
      img {
        width: 0.38rem;
        height: 0.4rem;
        vertical-align: middle;
        margin-right: .1rem;
      }
    }
    .cheerList {
      overflow: hidden;
      margin: 0 auto;
      li {
        height: 1.89rem;
        width: 3.52rem;
        float: left;
        border-bottom: 2px solid #dadada;
        overflow: hidden;
        img {
          width: 3.52rem;
          height: 100%;
        }
      }
      li:first-child {
        height: 3.79rem;
        border-right: 1px solid #dadada;
      }
      li:nth-child(4) {
        border-right: 1px solid #dadada;
      }
    }
  }
</style>
