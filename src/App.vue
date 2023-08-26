<script setup>
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import { getListType } from './utils/request'

defineProps({})

const menuList = ref([])

provide('menuList', readonly(menuList))

getListType().then((res) => {
  if (res.flag) {
    console.log(res.data)
    menuList.value.push(...res.data)
  }
})
</script>

<template>
  <header>
    <img src="@/assets/top.jpg" />
    <ul class="menu">
      <li><a href="/">首页</a></li>
      <li v-for="menu in menuList" v-bind:key="menu.key">
        <a :href="`/news-list?id=${menu.newsTypeId}`">{{ menu.newsTypeName }}</a>
      </li>
    </ul>
  </header>

  <RouterView v-if="menuList.length" />

  <footer>
    <p>中共绍兴市委组织部 主办</p>
    <p>地址：绍兴市越城区洋江西路589号 邮编：312000 联系电话：0575－85132844</p>
    <p>浙ICP备11008497号-1</p>
    <p style="margin-top: 20px">浙公网安备 33060202000253号</p>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

footer {
  padding: 30px 0;
  width: 100%;
  background-color: var(--color-primary);
  font-size: 16px;
  line-height: 28px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
