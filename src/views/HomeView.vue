<script setup>
import { inject, ref } from 'vue'
import dayjs from 'dayjs'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { getNewsList, getNewsListWithImage } from '../utils/request'

import News from '../components/News.vue'
import Subject from '../components/Subject.vue'
import NewsLink from '../components/NewsLink.vue'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

SwiperCore.use(Autoplay)
SwiperCore.use(Pagination)

const menuList = inject('menuList')

const mainNews = ref([])
const news1List = ref([])
const news2List = ref([])

if (menuList && menuList.value && menuList.value[0] && menuList.value[0]?.newsTypeId) {
  getNewsList(menuList.value[0]?.newsTypeId, 1, 10).then((res) => {
    if (res?.flag) {
      const rows = (res?.rows || []).slice(0, 8)
      news1List.value.push(...rows)
    }
  })

  getNewsListWithImage(menuList.value[0]?.newsTypeId).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      mainNews.value.push(...rows)
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

console.log(menuList[6]);
</script>

<template>
  <main>
    <section class="report-section">
      <div class="report-swpier">
        <swiper
          v-if="mainNews.length"
          :modules="modules"
          :slides-per-view="1"
          :pagination="{ clickable: true }"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false
          }"
          :space-between="50"
          :scrollbar="{ draggable: true }"
        >
          <swiper-slide v-for="item of mainNews" v-bind:key="item.newsId">
            <NewsLink class="report-swpier-item" :news-info="item">
              <img v-bind:src="item.newsImage" />
              <p>{{ item.newsTitle }}</p>
            </NewsLink>
          </swiper-slide>
        </swiper>
      </div>
      <div class="report-part" v-if="menuList[0]">
        <div class="report-list-header"><span>{{ menuList[0].newsTypeName }}</span></div>
        <ul class="report-list">
          <li v-for="item of news1List" v-bind:key="item.newsId">
            <NewsLink :news-info="item">
              <span>{{ item.newsTitle }}</span>
<!--              <span class="report-time">{{-->
<!--                item.publishTime ? dayjs(item.publishTime).format('YYYY-MM-DD') : ''-->
<!--              }}</span>-->
            </NewsLink>
          </li>
        </ul>
        <div class="notice">
          <span class="notice-logo">{{ menuList[1].newsTypeName }}</span>
          <ul class="notice-list">
            <li v-for="item of news2List" v-bind:key="item.newsId">
              <NewsLink :news-info="item">
                {{ item.newsTitle }}
              </NewsLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <img src="@/assets/1.jpg" style="width: 100%; margin: 20px 0" />
    <div class="news-wapper">
      <News v-for="item of menuList.slice(2)" v-bind:key="item.newsTypeId" :menu="item" />
      <Subject />
    </div>
    <div class="service-section">
      <div class="service-section-item">
        <p class="service-section-title">服务之窗</p>
        <ul>
          <li>
            <a href="https://zjsx12380.gov.cn/" target="_blank">
              <img src="@/assets/email.jpg" alt="" />
              <p>12380举报</p>
            </a>
          </li>
          <li>
            <a href="http://www.zjce.gov.cn/" target="_blank">
              <img src="@/assets/logo2.jpg" />
              <p>领导干部网络学院</p>
            </a>
          </li>
          <li>
            <img src="@/assets/qrcode.jpg" alt="" />
            <p>“绍兴组工”公众号</p>
          </li>
        </ul>
      </div>
      <div class="service-section-item">
        <p class="service-section-title">友情链接</p>
        <div class="links">
          <a href="https://cpc.people.com.cn/">中国共产党新闻网</a>
          <a href="https://www.12371.cn/">共产党员网</a>
          <a href="http://www.zjzzgz.gov.cn/">浙江组织工作网</a>
          <a href="https://www.xuexi.cn/">学习强国</a>
          <a href="http://www.people.com.cn/">人民网</a>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- <style>
 .swiper-pagination {
    top: 300px;
    display: none !important;
  }
</style> -->

<style lang="scss">
main {
  width: 1180px;
  margin: 0 auto;
  padding-top: 14px;
}
.report-section {
  display: flex;
  flex-direction: row;
}

.report-swpier {
  width: 650px;
  height: 345px;

  .swiper-pagination {
    top: 270px;

    .swiper-pagination-bullet {
      border-radius: 0;
      width: 10px;
      height: 10px;
      background-color: #999;
      opacity: 0.8;

      &.swiper-pagination-bullet-active {
        background-color: var(--color-primary);
        opacity: 1;
      }
    }
  }

  .report-swpier-item {
    width: 650px;
    height: 345px;
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
  width: 530px;
  .report-list-header {
    font-size: 20px;
    border-bottom: 1px solid var(--color-primary);
    span {
      background-color: var(--color-primary);
      font-size: 19px;
      padding: 0 4px;
      display: inline-block;
      color: #fff;
    }
  }
  .report-list {
    list-style: none;
    padding-left: 0;
    color: var(--color-text);
    padding-top: 10px;
    padding-bottom: 10px;
    height: 240px;
    li {
      font-size: 14px;
      line-height: 28px;
      a {
        display: flex;
        flex-direction: row;
        width: 100%;
        color: var(--color-text);
      }
      span {
        //width: 415px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        padding-right: 5px;
        color: var(--color-text);
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
  height: 72px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray);
  .notice-logo {
    display: inline-block;
    height: 62px;
    width: 62px;
    background-color: var(--color-primary);
    color: #fff;
    font-size: 16px;
    padding: 5px 8px;
    text-align: center;
    line-height: 27px;
  }
  .notice-list {
    flex: 1;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    li {
      font-size: 14px;
      font-weight: bold;
      a {
        color: var(--color-text);
      }
    }
  }
}

.news-wapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.service-section {
  width: 100%;
  height: 176px;
  margin-bottom: 20px;
  border: 1px solid var(--color-primary);
  background-color: transparent;
  display: flex;
  flex-direction: row;

  .service-section-item:first-child {
    border-right: 1px solid var(--color-primary);
    width: 406px;
  }

  .service-section-item {
    height: 100%;
    padding: 2px 25px 25px;
  }
  .service-section-title {
    font-size: 18px;
    font-weight: 500;
    color: var(--color-primary);
    margin-bottom: 5px;
    margin-top: 10px;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 355px;
    li {
      width: 103px;
      height: 103px;
      border: 1px solid var(--color-primary);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 70px;
        height: 70px;
        object-fit: contain;
      }
      p {
        font-size: 12px;
        color: var(--color-primary);
        text-align: center;
        padding-top: 5px;
      }
    }
  }
}

.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  a {
    width: 25%;
    padding-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    height: 27px;
    line-height: 27px;
    font-size: 14px;
    color: #5c5b5b;
  }
}
</style>
