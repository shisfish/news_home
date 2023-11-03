<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { getNewsList } from '../utils/request'
import NewsLink from './NewsLink.vue'

const props = defineProps({
  menu: Object
})

const news = ref([
  {
    img: 'http://101.34.59.38/static/top-116d877f.jpg',
    url: 'https://mp.weixin.qq.com/s?__biz=MzIxNDUyMzcwOA==&mid=2247840784&idx=1&sn=cca2397bb5b3144f7b750643c9fdacbe&chksm=97a9be43a0de3755853fed356c6b93411c56fcd5a7ecaa1a028053ab89641b34ff39c9c43476#rd'
  },
  {
    img: 'http://101.34.59.38/static/top-116d877f.jpg',
    url: 'https://mp.weixin.qq.com/s?__biz=MzIxNDUyMzcwOA==&mid=2247840784&idx=1&sn=cca2397bb5b3144f7b750643c9fdacbe&chksm=97a9be43a0de3755853fed356c6b93411c56fcd5a7ecaa1a028053ab89641b34ff39c9c43476#rd'
  },
  {
    img: 'http://101.34.59.38/static/top-116d877f.jpg',
    url: 'https://mp.weixin.qq.com/s?__biz=MzIxNDUyMzcwOA==&mid=2247840784&idx=1&sn=cca2397bb5b3144f7b750643c9fdacbe&chksm=97a9be43a0de3755853fed356c6b93411c56fcd5a7ecaa1a028053ab89641b34ff39c9c43476#rd'
  },
  {
    img: 'http://101.34.59.38/static/top-116d877f.jpg',
    url: 'https://mp.weixin.qq.com/s?__biz=MzIxNDUyMzcwOA==&mid=2247840784&idx=1&sn=cca2397bb5b3144f7b750643c9fdacbe&chksm=97a9be43a0de3755853fed356c6b93411c56fcd5a7ecaa1a028053ab89641b34ff39c9c43476#rd'
  },
  {
    img: 'http://101.34.59.38/static/top-116d877f.jpg',
    url: 'https://mp.weixin.qq.com/s?__biz=MzIxNDUyMzcwOA==&mid=2247840784&idx=1&sn=cca2397bb5b3144f7b750643c9fdacbe&chksm=97a9be43a0de3755853fed356c6b93411c56fcd5a7ecaa1a028053ab89641b34ff39c9c43476#rd'
  }
])
</script>

<template>
  <div class="news">
    <p class="news-title">
      <span>专题专栏</span>
    </p>
    <ul class="news-list" v-if="news.length">
      <li class="news-item" v-for="item of news" v-bind:key="item.img">
        <a :href="`${item.url}`">
          <img :src="`${item.img}`" style="width: 100%;"/>
        </a>
      </li>
    </ul>
    <ul class="news-list" v-else>
      <li class="news-item">
        <span class="news-item-content">暂无数据</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.news {
  width: 33.33%;
  display: inline-block;
  margin-bottom: 30px;
  &:nth-child(3n + 1) {
    padding-right: 12px;
  }
  &:nth-child(3n + 2) {
    padding-right: 6px;
    padding-left: 6px;
  }
  &:nth-child(3n) {
    padding-left: 12px;
  }
}

.news-title {
  border-bottom: 1px solid var(--color-primary);
  padding-left: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  span {
    font-size: 19px;
    color: #fff;
    background-color: var(--color-primary);
    padding: 0 4px;
  }
  a {
    font-size: 16px;
    text-decoration: none;
  }
}

.news-list {
  color: #000;
  padding-top: 5px;
  min-height: 200px;
  .news-item {
    font-size: 14px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    height: 44px;
    & + .news-item {
      margin-top: 5px;
    }

    a {
      display: flex;
      width: 100%;
      flex-direction: row;
      color: var(--color-text);
      img {
        object-fit: cover;
      }
    }
    .news-item-content {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .news-item-time {
      width: 50px;
      white-space: nowrap;
      text-align: right;
    }
  }
}
</style>
