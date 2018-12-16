<template>
  <div class="root">
    <navBar></navBar>
    <nuxt/>
  </div>
</template>
<script>
import navBar from '../components/common/navBar'
export default {
  components: {
    navBar
  }
}
</script>

<style lang="less" scoped>
.root {
  background: #fff;
}
</style>
