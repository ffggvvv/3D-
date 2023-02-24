<template>
  <div class="overall">
    <ul id="box1">
      <!-- <li v-for="i in 4" :key="i" :style="{ 'background': 'url('+ require('../static/image/'+i+'.png')+')'}"></li> -->
      <li
        class="hrt"
        v-for="(i, index) in 8"
        :key="index"
        :style="{
          backgroundImage:
            'url(' + require('../static/image/' + i + '.png') + ')'
        }"
        @click="activeLi(index)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aLi: null,
      x: -10,
      y: 0,
      disX: 0,
      disY: 0,
      autoTimer: null,
      autowrFlag: false,
      timer1: null,
      timer2: null
    };
  },
  mounted() {
    let that = this;
    this.init();
    document.onmouseup = function() {
      document.onmousemove = null;
      // document.onmouseup = null;
      // document.onmousedown = null
      //自动旋转加锁，防止每次抬起鼠标重复挂载延时器
      if (that.autowrFlag) {
        that.autowr();
        that.autowrFlag = false;
      }

      return false;
    };
  },
  destroyed() {
    clearInterval(this.autoTimer);
    clearTimeout(this.timer1, this.timer2);
  },
  methods: {
    init() {
      let that = this;
      let oUl = document.querySelector("#box1");
      this.aLi = oUl.children;
      let N = oUl.children.length;
      let oLi = document.getElementsByClassName("hrt");
      for (let i = 0; i < N; i++) {
        //这里加封闭空间是因为for循坏里加定时器，定时器的i值不能用
        (function(oLi, i) {
          //加定时器是因为在for循环里给每个li加延时效果不管用
          that.timer1 = setTimeout(() => {
            //给每个li加旋转角度
            oLi[i].style.WebkitTransform =
              "rotateY(" + (360 / N) * i + "deg) translateZ(400px)";
            //加过渡时间和延时时间从而加载的时候会出现发牌效果
            oLi[i].style.WebkitTransition =
              "1s all ease " + (N - i) * 200 + "ms";
          }, 0);
        })(oLi, i);
      }

      this.autowr();
    },

    //自动旋转
    autowr() {
      this.timer2 = setTimeout(() => {
        let N = document.querySelector("#box1").children.length;
        let oLi = document.getElementsByClassName("hrt");
        this.autoTimer = setInterval(() => {
          this.y += 1;

          for (let t = 0; t < N; t++) {
            oLi[t].style.WebkitTransform =
              "rotateY(" + (this.y + (360 / N) * t) + "deg) translateZ(400px)";
            oLi[t].style.WebkitTransition = "100ms all linear " + 0 + "ms";
          }
        }, 100);
      }, 3000);
    },

    //选中展示在最前面
    activeLi(index) {
      clearInterval(this.autoTimer);
      clearTimeout(this.timer2);
      let N = document.querySelector("#box1").children.length;
      let nowY = this.y + (360 / N) * index;
      nowY = nowY % 360
      if (nowY > 180) {
        this.y = this.y + 360 - nowY;
      } else {
        nowY = Math.abs(nowY) > 180 ? 360 - Math.abs(nowY) : nowY ;
        this.y = this.y - nowY;
      }
      // this.y = nowY
      for (let i = 0; i < N; i++) {
        this.aLi[i].style.WebkitTransform =
          "rotateY(" + (this.y + (360 / N) * i) + "deg) translateZ(400px)";
        this.aLi[i].style.WebkitTransition = "1000ms all linear " + 0 + "ms";
      }
      this.autowr();
    },
    hrtChange(ev) {
      // 拖拽转动
      clearInterval(this.autoTimer);
      this.autowrFlag = true;
      let that = this;
      let N = document.querySelector("#box1").children.length;
      let oEvent = ev || event;
      that.disX = oEvent.clientX;
      that.disY = oEvent.clientY;
      let nowY = that.y;
      let nowX = that.x;
      document.onmousemove = function(ev) {
        let oEvent = ev || event;
        that.x = oEvent.clientY - that.disY + nowX;
        that.y = oEvent.clientX - that.disX + nowY;
        //纵向拖拽是改变的是oUl的X轴
        // oUl.style.WebkitTransform='perspective(800px) rotateX('+(-x)+'deg)';
        for (let i = 0; i < that.aLi.length; i++) {
          //横向拖拽是改变的是每个的Y轴 这里要注意要加上每个li的初始角度
          that.aLi[i].style.WebkitTransform =
            "rotateY(" + (that.y + (360 / N) * i) + "deg) translateZ(400px)";
          //横向拖拽时不需要过渡时间直接干掉
          that.aLi[i].style.WebkitTransition = "none";
        }
      };
    }
  }
};
</script>

<style lang="scss">
.overall {
  width: 100vw;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
ul {
  width: 133px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  /*开启3D*/
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  /*给Ul加一个初始的角度方便看效果*/
  transform: translate(-50%, -100%) perspective(800px) rotateX(-8deg);
}

ul li {
  list-style: none;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../static/image/1.png") repeat 100% 100%;
  background-size: cover;
  /*图片一圈加阴影*/
  box-shadow: 0 0 10px #fff;
  /*加圆角*/
  border-radius: 10px;
  transform: rotateY(0deg) translateZ(0px);
  /*给li加倒影*/
  -webkit-box-reflect: below 10px -webkit-linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.3));
}
</style>
