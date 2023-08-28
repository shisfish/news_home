<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs';
import { getNewsList } from '../utils/request'
import NewsLink from './NewsLink.vue'

const props = defineProps({
  menu: Object
})

const news = ref([])

if (props?.menu?.newsTypeId) {
  getNewsList(props?.menu?.newsTypeId, 1, 8).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news.value.push(...rows)
    }
  })
}
</script>

<template>
  <div class="news">
    <p class="news-title">
      <span>{{ menu.newsTypeName }}</span>
      <a :href="`/news-list?id=${menu.newsTypeId}`">更多&gt;&gt;</a>
    </p>
    <ul class="news-list" v-if="news.length">
      <li class="news-item" v-for="item of news" v-bind:key="item.newsId">
        <NewsLink :news-info="item">
          <span class="news-item-content">{{ item.newsTitle }}</span>
          <span class="news-item-time">{{ item.createTime ? dayjs(item.createTime).format('MM-DD') : '' }}</span>
        </NewsLink>
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
  padding-left: 15px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  span {
    font-size: 26px;
    color: var(--color-primary);
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
    font-size: 16px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    a {
      display: flex;
      width: 100%;
      flex-direction: row;
      color: var(--color-text);
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
