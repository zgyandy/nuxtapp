<template>
  <ul class="linkList dis-flex-wrap">
    <li>
      <a href="http://www.ncgrwh.com.cn/sem/qianrushi/mqianrushi1/">
        <img src="../../assets/img/link01.png" alt>
        <div>物联网</div>
      </a>
    </li>
    <li>
      <a href="http://www.haitongjiaoyu.com/sem/wulianwang/mwulianwang1/">
        <img src="../../assets/img/link02.png" alt>
        <div>人工智能</div>
      </a>
    </li>
    <li>
      <a href="http://www.focuskid.cn/sem/dashuju/mdashuju1">
        <img src="../../assets/img/link03.png" alt>
        <div>大数据</div>
      </a>
    </li>
    <li>
      <a href="http://www.focuskid.cn/sem/shujufenxi/mshujufenxi1/">
        <img src="../../assets/img/link04.png" alt>
        <div>数据分析</div>
      </a>
    </li>
    <li>
      <a href="http://www.ncgrwh.com.cn/sem/java/mjava2">
        <img src="../../assets/img/link05.png" alt>
        <div>Java</div>
      </a>
    </li>
    <li>
      <a href="http://www.ncgrwh.com.cn//sem/h5/mh51/">
        <img src="../../assets/img/link06.png" alt>
        <div>WEB前端</div>
      </a>
    </li>
    <li>
      <a :href="$store.state.domain + '/video/'">
        <img src="../../assets/img/link07.png" alt>
        <div>讲堂</div>
      </a>
    </li>
    <li>
      <a href="http://m.zhizuobiao.com/knowledge/">
        <img src="../../assets/img/link08.png" alt>
        <div>知识库</div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less">
.linkList {
  height: 4.25 - 0.8rem;
  width: 7.5 - 0.8rem;
  padding: 0.4rem;
  background: #fff;
  li {
    width: 1.13rem;
    height: 1.54rem;
    margin-right: 0.4rem;
    text-align: center;
    img {
      width: 1.13rem;
      height: 1.12rem;
      display: block;
    }
    a {
      color: #000;
      div {
        font-size: 0.26rem;
        margin-top: 0.17rem;
      }
    }
  }
  li:nth-child(4n + 4) {
    margin-right: 0;
  }
}
</style>
