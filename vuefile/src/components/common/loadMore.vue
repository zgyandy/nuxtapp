<template>
  <div class="loadMore">
    <p class="grayColor">
      <span>{{title}}&nbsp;&nbsp;<span class="iconfont icon-xia"></span></span>
      </p>
  </div>
</template>

<script>
export default {
  props: {
    total: false,
    title: {
      default: '上拉加载更多'
    }
  }
}
</script>

<style scoped>
  .loadMore {
    height: .86rem;
    text-align: center;
    font-size: .28rem;
    line-height: .86rem;
  }
</style>
