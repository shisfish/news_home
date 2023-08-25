<script setup>
import { ref } from 'vue'
import { getNewsList } from '../utils/request'

const props = defineProps({
  menu: Object
})

const news = ref([])

if (props?.menu?.newsTypeId) {
  getNewsList(props?.menu?.newsTypeId, 1, 5).then((res) => {
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
      <a>更多&gt;&gt;</a>
    </p>
    <ul class="news-list" v-if="news.length">
      <li class="news-item" v-for="item of news" v-bind:key="item.newsId">
        <span class="news-item-content">{{ item.newsTitle }}</span>
        <span class="news-item-time">05-11</span>
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
  &:first-child {
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
    .news-item-content {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .news-item-time {
      width: 45px;
      text-align: right;
    }
  }
}
</style>
