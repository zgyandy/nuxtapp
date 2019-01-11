<template>
  <div class="cheerStation">
    <h4 class="title">
      <img src="../../assets/img/comeon.png" alt="加油">
      <span>职场加油站  薪资翻一番</span>
    </h4>
    <!-- <ul class="cheerList">
      <li v-for="(item, key) in cheer" v-show="key < 5" :key="key"><a :href="item.url"><img :src="item.photo" alt=""></a></li>
    </ul> -->
    <table cellspacing="0" v-show="cheer">
      <tr class="first">
        <td width="50%" rowspan="2">
          <a :href="cheer[0].url"><img :src="cheer[0].photo" alt=""></a>
        </td>
        <td width="50%"><a :href="cheer[1].url"><img :src="cheer[1].photo" alt=""></a></td>
      </tr>
      <tr>
        <td><a :href="cheer[2].url"><img :src="cheer[2].photo" alt=""></a></td>
      </tr>
      <tr class="first">
        <td width="50%"><a :href="cheer[3].url"><img :src="cheer[3].photo" alt=""></a></td>
        <td><a :href="cheer[4].url"><img :src="cheer[4].photo" alt=""></a></td>
      </tr>
    </table>
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
    table {
      width: 100%;
      a {
        width: 100%;
        height: 100%;
      }
    }
    table td{
      height: 1.89rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    tr.first {
      td:first-child {
        border-right: 1px solid #dadada;
      }
    }
    td {
      border-bottom: 1px solid #dadada;
    }
  }
</style>
