<template>
  <div id="app">
    <div class="cont">
      <kinesis-container>
        Here, you can put
        <kinesis-element :strength="10"> whatever </kinesis-element>
        <kinesis-element :strength="20"> content! </kinesis-element>
      </kinesis-container>
    </div>
    <button @click="tiao">跳转</button>
    <div
    class="wave"
      v-wave="{
        color: 'radial-gradient(closest-side, #fff, #00f, #fff)',
        initialOpacity: 0.5,
        duration: 2,
        easing: 'ease-in',
      }"
    >
      Click me!
    </div>
    <video id="video" controls muted loop width='300' autoplay webkit-playsinline="true" src='http://www.w3school.com.cn/example/html5/mov_bbb.mp4'></video>
  </div>
</template>

<script>
import { KinesisContainer, KinesisElement } from "vue-kinesis";
import VideoToCanvas from"./video1.js"
export default {
  name: "App",
  components: {
    KinesisContainer,
    KinesisElement,
    VideoToCanvas
  },
  data() {
    return {};
  },
  methods: {
    tiao() {
      this.$router.push("/tt");
    },
  },
  mounted(){
    let video = document.getElementById('video');
    let VideoToCanvas1 =  new VideoToCanvas(video);
    VideoToCanvas1.play()
    console.log(VideoToCanvas,VideoToCanvas1);
  }
};
</script>
<style lang="scss" scoped>
.cont {
  width: 500px;
  margin: 0 auto;
  div {
    text-align: center;
  }
}
.wave{
    width: 100px;
    height: 100px;
    // border: 1px solid;
    border-radius: 10px;
    margin: 0 auto;
    line-height: 100px;
    text-align: center;
    background: #ccc;
}
</style>