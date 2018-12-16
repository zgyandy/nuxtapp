<template>

  <dl class="title dis-flex-bt">
    <dt>{{listTitle.title}}</dt>
    <dd v-if="listTitle.arr">
      <a :href="item.url" v-for="(item, key) in listTitle.arr" :key="key" class="gray">{{item.msg}}</a>
    </dd>
  </dl>

</template>

<script>
export default {
  props: {
    listTitle: {
      default: () => {
        return {
          title: '标题',
          arr: []
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    height: .96rem;
    background: #fff;
    width: 7.1rem;
    margin: 0 auto;
    font-size: .28rem;
    border-bottom: 1px solid #dadada;
    overflow: hidden;
    dt {
      height: .9rem;
      -moz-box-shadow:0px 0.1rem 0px #e10030;
      -webkit-box-shadow:0px 0.1rem 0px #e10030;
      box-shadow:0px 0.1rem 0px #e10030;
      font-size: .36rem;
      line-height: .9rem;
    }
    dd {
      flex: 1;
      -webkit-box-flex: 1;
      background: #fff;
      text-align: right;
      a:first-child {
        &::after {
          content: "|";
          color: #999;
          margin:0 .08rem;
        }
      }
    }
  }
</style>
