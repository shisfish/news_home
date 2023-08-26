<script setup>
import { inject, ref } from 'vue'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { getNewsList } from '../utils/request'

import News from '../components/News.vue'

import 'swiper/css'
import 'swiper/css/autoplay'

SwiperCore.use(Autoplay)

const menuList = inject('menuList')

const mainNews = ref([])
const news1List = ref([])
const news2List = ref([])

if (menuList && menuList.value && menuList.value[0] && menuList.value[0]?.newsTypeId) {
  getNewsList(menuList.value[0]?.newsTypeId).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news1List.value.push(...rows)
      mainNews.value.push(...rows.slice(0, 3))
    }
  })
}

if (menuList && menuList.value && menuList.value[1] && menuList.value[1]?.newsTypeId) {
  getNewsList(menuList.value[1]?.newsTypeId, 1, 2).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news2List.value.push(...rows)
    }
  })
}
</script>

<template>
  <main>
    <section class="report-section">
      <div class="report-swpier">
        <swiper
          v-if="mainNews.length"
          :modules="modules"
          :slides-per-view="1"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false
          }"
          :space-between="50"
          :scrollbar="{ draggable: true }"
        >
          <swiper-slide v-for="item of mainNews" v-bind:key="item.newsId">
            <a class="report-swpier-item" :href="`/news?id=${item.newsId}`">
              <img v-bind:src="item.newsImage" />
              <p>{{ item.newsTitle }}</p>
            </a>
          </swiper-slide>
        </swiper>
      </div>
      <div class="report-part" v-if="menuList[0]">
        <div class="report-list-header">{{ menuList[0].newsTypeName }}</div>
        <ul class="report-list">
          <li v-for="item of news1List" v-bind:key="item.newsId">
            <a :href="`/news?id=${item.newsId}`">
              <span>{{ item.newsTitle }}</span>
              <span class="report-time">2022-12-03</span>
            </a>
          </li>
        </ul>
        <div class="notice">
          <span class="notice-logo">{{ menuList[1].newsTypeName }}</span>
          <ul class="notice-list">
            <li v-for="item of news2List" v-bind:key="item.newsId">
              <a :href="`/news?id=${item.newsId}`">{{ item.newsTitle }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <img src="@/assets/1.jpg" style="width: 100%; margin: 20px 0" />
    <div class="news-wapper">
      <News v-for="item of menuList.slice(2)" v-bind:key="item.newsTypeId" :menu="item" />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 1280px;
  margin: 0 auto;
  padding-top: 14px;
}
.report-section {
  display: flex;
  flex-direction: row;
}

.report-swpier {
  width: 630px;
  height: 380px;
  .report-swpier-item {
    width: 630px;
    height: 380px;
    position: relative;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: rgba($color: #000000, $alpha: 0.6);
      color: #fff;
      padding: 10px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.report-swpier img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.report-part {
  color: var(--color-primary);
  padding-left: 15px;
  width: 500px;
  .report-list-header {
    font-size: 26px;
    border-bottom: 1px solid var(--color-primary);
  }
  .report-list {
    list-style: none;
    padding-left: 0;
    color: var(--color-text);
    padding-top: 16px;
    padding-bottom: 10px;
    li {
      font-size: 17px;
      line-height: 30px;
      a {
        display: flex;
        flex-direction: row;
        width: 100%;
        color: var(--color-text);
      }
      span {
        width: 385px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        padding-right: 5px;
      }
      .report-time {
        width: 100px;
        padding-right: 0;
        text-align: right;
      }
    }
  }
}
.notice {
  border: 1px solid var(--color-primary);
  width: 100%;
  height: 85px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray);
  .notice-logo {
    display: inline-block;
    height: 75px;
    width: 86px;
    background-color: var(--color-primary);
    color: #fff;
    font-size: 24px;
    padding: 5px 8px;
    text-align: center;
    line-height: 32px;
  }
  .notice-list {
    flex: 1;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    li {
      font-size: 16px;
      font-weight: bold;
      a {
        color: var(--color-text);
      }
    }
  }
}

.news-wapper {
  width: 100%;
}
</style>
