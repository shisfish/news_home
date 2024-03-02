<script setup>
import { inject, ref } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { getNewsInfo } from '../utils/request'

const menuList = inject('menuList')
const menu = ref()

const id = new URLSearchParams(location.search).get('id') * 1

const newsInfo = ref({})
const breadcrumbList = ref([])

getNewsInfo(id).then((res) => {
  if (res?.flag) {
    newsInfo.value = res.data

    

    const menu = (menuList.value || []).find((d) => d.newsTypeId === res.data.newsTypeId)

    breadcrumbList.value.push(
      ...[
        {
          title: '首页',
          link: '/'
        },
        {
          title: menu.newsTypeName,
          link: location.href
        }
      ]
    )
  }
})
</script>
<template>
  <Breadcrumb :list="breadcrumbList"/>
  <div class="news-content">
    <p class="news-title">{{ newsInfo.newsTitle }}</p>
    <p class="publisher-time">发布时间：{{ newsInfo.publishTime }}</p>
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
    padding: 0 15px 30px;
    min-height: 300px;
    img {
      max-width: 100%;
    }
    p {
        margin: 1px 0;
        span {
           font-weight: inherit;
        }
    }
  }
}
</style>
