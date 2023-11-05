<script setup>
import { inject, ref } from 'vue'
import dayjs from 'dayjs'
import { getNewsList } from '../utils/request'
import NewsLink from '../components/NewsLink.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

const menuList = inject('menuList')

const id = new URLSearchParams(location.search).get('id') * 1

const subject = new URLSearchParams(location.search).get('subject') * 1

const menu = ref((menuList.value || []).find((d) =>
  d.newsTypeId === id))

const news = ref([])
const total = ref(0)
const pageNum = ref(1)
const breadcrumbList = ref([])

const refresh = (index) => {
  getNewsList(menu.value?.newsTypeId, subject, index, 15).then((res) => {
    if (res?.flag) {
      const rows = res?.rows || []
      news.value = rows
      total.value = res?.total
      pageNum.value = res?.pageNum
    }
  })
}

if (menu.value?.newsTypeId) {
  breadcrumbList.value.push(
    ...[
      {
        title: '首页',
        link: '/'
      },
      {
        title: menu.value.newsTypeName,
        link: location.href
      }
    ]
  )
  refresh(1)
} else {
  let subjectTitle;
  if (subject === 1) {
    subjectTitle = "专题专栏 > 组工锐评"
  } else if (subject === 2) {
    subjectTitle = "专题专栏 > 人才增值服务"
  } else if (subject === 3) {
    subjectTitle = "专题专栏 > “天天有感”党群服务中心展播"
  } else if (subject === 4) {
    subjectTitle = "专题专栏 > 和美争创 三百计划"
  } else if (subject === 5) {
    subjectTitle = "专题专栏 > 担当作为好干部风采录"
  }
  breadcrumbList.value.push(
      ...[
        {
          title: '首页',
          link: '/'
        },
        {
          title: subjectTitle,
          link: location.href
        }
      ]
  )
  refresh(1)
}

</script>
<template>
  <Breadcrumb :list="breadcrumbList" />
  <div class="news-list-content">
    <ul class="news-list">
      <li v-for="item of news" v-bind:key="item.newsId">
        <NewsLink :news-info="item">
          <p>{{ item.newsTitle }}</p>
          <span>{{ item.publishTime ? dayjs(item.publishTime).format('YYYY-MM-DD') : '' }}</span>
        </NewsLink>
      </li>
    </ul>
    <div class="pagination-wapper" v-if="total > 0">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="15" @current-change="refresh"></el-pagination>
    </div>
  </div>
</template>

<style lang="scss">
.news-list-content {
  width: 1000px;
  margin: 0 auto;
  min-height: 796px;

  .news-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
    li {
      padding: 7px 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      a {
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 14px;
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

  .pagination-wapper {
    display: flex;
    justify-content: center;
    padding: 10px 0 50px;
  }
}
</style>
