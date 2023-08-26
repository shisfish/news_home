<script setup>
import { inject, ref } from 'vue'
import { getNewsList } from '../utils/request'

const menuList = inject('menuList')

const id = new URLSearchParams(location.search).get('id') * 1

const menu = ref((menuList.value || []).find((d) => d.newsTypeId === id))

console.log(menu.value.newsTypeId)

const news = ref([])

if (menu.value?.newsTypeId) {
  getNewsList(menu.value?.newsTypeId, 1, 20).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news.value.push(...rows)
    }
  })
}
</script>
<template>
  <div class="news-list-content">
    <ul class="news-list">
      <li v-for="item of news" v-bind:key="item.newsId">
        <p>{{ item.newsTitle }}</p>
        <span>{{ item.createTime }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.news-list-content {
  width: 1280px;
  margin: 0 auto;

  .news-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    li {
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      font-size: 16px;
      color: #333;
    }
  }
}
</style>
