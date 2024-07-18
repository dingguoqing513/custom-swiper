<template>
  <div class="swiper-container">
    <ul class="swiper-wrap">
      <li>
        <span class="left-img operate" @click="changeImg(-1)"></span>
        <img :src="getAssetsPath(`${activeIndex}.jpg`)" />
        <div class="swiper-content">
          <p v-for="opt in swiperContent" :key="opt">{{ opt }}</p>
        </div>
        <span class="right-img operate" @click="changeImg(1)"></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchAllJson } from "../api/swiper";
import { getAssetsPath } from "../utils/util";

const activeIndex = ref(1);

const swiperContent = ref();

const changeImg = (num: number) => {
  if (activeIndex.value <= 1 && num === -1) return alert("当前是第一张");
  if (activeIndex.value >= 3 && num === 1) return alert("当前是最后一张");
  activeIndex.value += num;
};

const getAllJson = async () => {
  let result = await fetchAllJson();
  console.log(result, "获取的数据");
  const data = Object.values(result);
  if (data.length) {
    swiperContent.value = data;
  }
};
getAllJson();
</script>

<style lang="less">
.swiper-container {
  .swiper-wrap {
    li {
      position: relative;
      list-style: none;
      .swiper-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
      img {
        height: 300px;
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
  }
}
</style>
