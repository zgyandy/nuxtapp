<template>
    <mt-swipe :auto="time">
      <mt-swipe-item v-for="(item, key) in banner" v-if="item['position'] *1 == 10" :key="key">
        <a :href="item.url ? item.url : 'javascript:;'">
          <img :src="item.photo" :alt="item.title">
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  props: {
    time: {
      default: 4000,
      type: Number
    },
    banner: {
      defautl: () => new Array()
    }
  }
}
</script>

<style>
  .mint-swipe-indicators {
    bottom: .23rem;
  }
</style>
