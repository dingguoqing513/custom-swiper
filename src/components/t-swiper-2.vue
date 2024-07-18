<template>
  <div class="swiper-container">
    <h3>当前轮播时间间距：{{ loopDuration }}</h3>
    <span class="left-img operate" @click="changeImg(-1)"></span>
    <div class="swiper-box">
      <ul
        class="swiper-wrap"
        :style="{
          left: `${offsetLeft}px`,
        }"
      >
        <li class="swiper-wrap-li" v-for="opt in swiperImgs" :key="opt.id">
          <img :src="opt.img_url" />
          <div class="swiper-content">
            <p v-for="opt in swiperContent" :key="opt">{{ opt }}</p>
          </div>
        </li>
      </ul>
    </div>
    <span class="right-img operate" @click="changeImg(1)"></span>

    <span class="stop-btn" @click="closeLoop">关闭轮播</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchAllJson } from "../api/swiper";
import { getAssetsPath } from "../utils/util";

const swiperImgs = [
  {
    id: 1,
    img_url: getAssetsPath("1.jpg"),
  },
  {
    id: 2,
    img_url: getAssetsPath("2.jpg"),
  },
  {
    id: 3,
    img_url: getAssetsPath("3.jpg"),
  },
];

const activeIndex = ref(0); // 当前图像索引

const swiperContent = ref(); // 给的那个接口数据

const offsetLeft = ref(0); // 图像偏移量

const imgWidth = 500; // 图像固定宽度

const loopDuration = 2000; // 图像轮播时间间距

const loopTime = ref(); // 轮播定时器

const triggerOffset = () => {
  offsetLeft.value = -activeIndex.value * imgWidth;
};

const changeImg = (num: number) => {
  if (activeIndex.value <= 0 && num === -1) return alert("当前是第一张");
  if (activeIndex.value >= 2 && num === 1) return alert("当前是最后一张");
  activeIndex.value += num;
  triggerOffset();
};

const getAllJson = async () => {
  let result = await fetchAllJson();
  const data = Object.values(result);
  if (data.length) {
    swiperContent.value = data;
  }
};
getAllJson();

const autoPlay = () => {
  loopTime.value = setInterval(() => {
    if (activeIndex.value >= swiperImgs.length) {
      activeIndex.value = 0;
    }
    triggerOffset();
    activeIndex.value++;
  }, loopDuration);
};
autoPlay();

const closeLoop = () => {
  clearInterval(loopTime.value);
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.box-center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.swiper-container {
  .swiper-box {
    overflow: hidden;
    position: relative;
    width: 500px;
    height: 300px;
    .swiper-wrap {
      display: flex;
      position: absolute;
      transition: all 0.25s ease;
      width: 500px;
      height: 300px;
      top: 0;
      left: 0;
      li {
        width: 500px;
        height: 300px;
        list-style: none;
        .swiper-content {
          position: absolute;
          .box-center();
          color: #fff;
        }
        img {
          width: 500px;
          height: 300px;
        }
      }
    }
  }

  .operate {
    position: fixed;
    width: 56px;
    height: 56px;
    cursor: pointer;
    &:hover {
      &::before {
        transition: background 0.35s ease-in;
        background: #3870fd;
      }
      &::after {
        transition: background 0.35s ease-in;
        background: #38dffd;
      }
    }
    &::before {
      content: "";
      width: 36px;
      height: 4px;
      position: absolute;
      background: #333;
    }
    &::after {
      content: "";
      width: 36px;
      height: 4px;
      position: absolute;
      background: #333;
    }
  }
  .stop-btn {
    display: inline-block;
    padding: 6px 15px;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 80px;
    cursor: pointer;
    transition: all 0.25s;
    user-select: none;
    background: linear-gradient(45deg, #e33ace 7%, #1677ff 83%);
    &:hover {
      transform: translateY(-3px);
      box-shadow: 3px 3px 10px 1px #63a4ff;
      transition: all 0.25s;
    }
    &:active {
      transform: scale(0.98);
      transition: all 0.2s ease;
    }
  }
  .left-img {
    left: 40px;
    top: calc(50% - 18px);
    &::before {
      transform: rotate(45deg) translate(8px, 45px);
    }
    &::after {
      transform: rotate(-45deg) translate(-29px, -8px);
    }
  }
  .right-img {
    right: 40px;
    top: calc(50% - 18px);
    &::before {
      transform: rotate(45deg) translate(4px, 16px);
    }
    &::after {
      transform: rotate(-45deg) translate(-33px, 20px);
    }
  }
}
</style>
