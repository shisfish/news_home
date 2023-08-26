<script setup>
import { inject, ref } from 'vue'
import { getNewsList } from '../utils/request'
import NewsLink from '../components/NewsLink.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

const menuList = inject('menuList')

const id = new URLSearchParams(location.search).get('id') * 1

const menu = ref((menuList.value || []).find((d) => d.newsTypeId === id))

const news = ref([])
const breadcrumbList = ref([])

if (menu.value?.newsTypeId) {
  breadcrumbList.value.push(...[{
    title: "首页",
    link: "/"
  }, {
    title: menu.value.newsTypeName,
    link: location.href
  }])
  getNewsList(menu.value?.newsTypeId, 1, 20).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news.value.push(...rows)
    }
  })
}
</script>
<template>
  <Breadcrumb :list="breadcrumbList"/>
  <div class="news-list-content">
    <ul class="news-list">
      <li v-for="item of news" v-bind:key="item.newsId">
        <NewsLink :news-info="item">
          <p>{{ item.newsTitle }}</p>
          <span>{{ item.createTime }}</span>
        </NewsLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.news-list-content {
  width: 1000px;
  margin: 0 auto;
  min-height: 500px;

  .news-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
    li {
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      a {
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 16px;
        color: #333;
        p {
          flex: 1;
        }
        span {
          color: #666;
        }
      }
    }
  }
}
</style>
