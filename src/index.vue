<template>
  <div id="app">
    <router-view />
    <div class="jdd">加载图</div>
  </div>
</template>


<script>
export default {
  mounted() {
    let jdd = document.getElementsByClassName("jdd")[0];

    this.$router.beforeEach((to, from, next) => {
      // 每次切换页面时，调用进度条
      // NProgress.start();
      jdd.style.display = "block";
      // console.log(jdd);
      // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
      //  NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量
      console.log(1);
      setTimeout(() => {
        next();
      }, 3000);
    });
    //当路由进入后：关闭进度条
    this.$router.afterEach(() => {
      // 在即将进入新的页面组件前，关闭掉进度条
      // NProgress.done()
      jdd.style.display = "none";
    });
  },
};
</script>
<style lang="scss" scoped>
.jdd {
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 0;
  left: 0;
  line-height: 100vh;
  text-align: center;
  display: none;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}

</style>
