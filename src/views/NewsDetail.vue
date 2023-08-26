<script setup>
import { inject, ref } from 'vue'
import { getNewsInfo } from '../utils/request'

// const menuList = inject('menuList')

const id = new URLSearchParams(location.search).get('id') * 1

const newsInfo = ref({})

getNewsInfo(id).then((res) => {
  if (res?.flag) {
    newsInfo.value = res.data
  }
})
</script>
<template>
  <div class="news-content">
    <p class="news-title">{{ newsInfo.newsTitle }}</p>
    <p class="publisher-time">发布时间：{{ newsInfo.createTime }}</p>
    <div v-html="newsInfo.newsContent" class="news-info"></div>
  </div>
</template>

<style lang="scss">
.news-content {
  width: 1000px;
  margin: 0 auto;

  .news-title {
    line-height: 40px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin: 30px auto 20px;
  }

  .publisher-time {
    line-height: 30px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #808080;
    color: #808080;
    text-align: center;
  }

  .news-info {
    padding: 0 15px;
  }
}
</style>
