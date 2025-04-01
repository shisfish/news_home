<script setup>
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import VueSelect from 'vue-select'
import { getListType } from './utils/request'

defineProps({})

const menuList = ref([])
const isHomePage = ref(false)

provide('menuList', readonly(menuList))
const swapElements = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  return arr;
};
getListType().then((res) => {
  if (res.flag) {
    console.log(res.data)
    menuList.value.push(...res.data)
    swapElements(menuList.value, 2, 3);
  }
})

if (location.pathname === '/') {
  isHomePage.value = true;
}

const isActiveMenu = (id) => {
  if (!id) {
    return location.pathname === '/'
  }
  try {
    return (
      location.pathname === '/news-list' &&
      `${id}` === new URLSearchParams(location.search).get('id')
    )
  } catch (e) {}
  return false
}
</script>

<template>
  <div v-if="menuList.length &&  isHomePage" class="top-nav">
    <div class="top-nav-list">
      <img src="@/assets/log_h2.jpg" />
      <ul>
        <li>
          <a href="https://www.12371.cn/2023/10/16/ARTI1697453701997391.shtml" target="_blank"
            >习近平文化思想学习知识点</a
          >&ensp;<a href="https://www.12371.cn/special/xxzd/hxnr/wh/" target="_blank">学习专栏</a>
        </li>
        <li>
          <a href="https://www.12371.cn/2023/11/02/ARTI1698883073271621.shtml" target="_blank"
            >学习贯彻中央金融工作会议精神</a
          >
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://www.12371.cn/xxsx/" target="_blank">主题教育 | </a>
          <a href="https://www.12371.cn/2023/08/17/ARTI1692254909776275.shtml" target="_blank"
            >学习资料</a
          >
          <a href="https://www.12371.cn/xxsx/yskt/" target="_blank">有声课堂</a>
          <a href="https://www.12371.cn/2023/06/09/ARTI1686278996739431.shtml" target="_blank"
            >系列问答</a
          >
        </li>
        <li>
          <a href="https://www.12371.cn/special/zzgz/" target="_blank"
            >《组织工作新担当新作为》学习专题</a
          >
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://www.12371.cn/2023/10/31/ARTI1698717851016285.shtml" target="_blank"
            >学习推广“四下基层”优良传统</a
          >
        </li>
        <li>
          <a href="https://www.12371.cn/special/20da/bg/" target="_blank">二十大报告</a>&ensp;
          <a href="https://www.12371.cn/special/zggcdzc/" target="_blank"> 二十大党章学习课件</a>
        </li>
      </ul>
    </div>
    <div class="top-nav-menu-wapper">
      <div class="top-nav-menu">
        <img src="@/assets/logo_h1.jpg" />
        <div class="head-return">
          <a href="http://dwlm.12371.cn/">返回联盟首页</a>
          <span>|</span>
          <a href="http://www.12371.cn/" target="_blank">共产党员网 </a>
        </div>
      </div>
    </div>
  </div>
  <header v-if="menuList.length">
    <div class="top-logo"></div>
    <ul class="menu">
      <li><a href="./" :class="`${isActiveMenu() ? 'active' : ''}`">首页</a></li>
      <li v-for="menu in menuList" v-bind:key="menu.key">
        <a
          :href="`./news-list?id=${menu.newsTypeId}`"
          :class="`${isActiveMenu(menu.newsTypeId) ? 'active' : ''}`"
          >{{ menu.newsTypeName }}</a
        >
      </li>
    </ul>
  </header>

  <RouterView v-if="menuList.length" />

  <footer v-if="menuList.length">
    <p>版权所有：中共绍兴市委组织部 备案号：<a href="https://beian.miit.gov.cn/">浙ICP备11008497号-1</a> <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33060202000253">浙公网安备 33060202000253号</a></p>
    <p>邮编：312000 地址：绍兴市越城区洋江西路589号 联系电话：0575－85132844</p>
    <div class="footer-images"> <!-- 新增容器包裹图片 -->
      <a href="http://bszs.conac.cn/sitename?method=show&id=07A11D7AE61C3648E053012819AC0955">
        <img src="@/assets/red.png" alt="政府网站" />
      </a>
      <a href="https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=3300000068&amp;url=http%3A%2F%2Fwww.zj.gov.cn%2F">
        <img src="@/assets/jiucuo.png" alt="找错" />
      </a>
    </div>
  </footer>
</template>

<style scoped>

header {
  line-height: 1.5;
}

.top-logo {
  background-image: url('@/assets/top.jpg');
  background-size: cover;
  background-position: center;
  padding-top: 7%;
  background-repeat: no-repeat;
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
  text-align: center; /* 确保文本居中 */

  p {
    margin: 0 0 10px 0; /* 调整段落间距 */
    a {
      color: #ffffff;
    }
  }

  .footer-images {
    display: flex;
    align-items: center;
    gap: 20px; /* 增大图片间距 */
    margin-top: 15px; /* 调整与上方文字的间距 */

    img {
      vertical-align: middle;
      /* 移除 width/height 限制，保持原图尺寸 */
    }
  }
}

.links {
  display: flex;
  align-items: center;
  width: 1200px;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;
}

.links span,
a {
  color: #df233e;
  padding: 0 5px;
  display: inline-block;
}

.links a {
  color: #fff;
}

.top-nav {
  background-color: #eee;
}

.top-nav-list {
  height: 60px;
  margin: 0 auto;
  display: flex;
  width: 1180px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.top-nav-list ul {
  padding: 0 10px;
}

.top-nav-list ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}
.top-nav-list ul li::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #666;
}

.top-nav-list ul li a {
  color: #666;
  font-size: 12px;
}

.top-nav-menu-wapper {
  width: 100%;
  height: 63px;
  background-color: #f6b84b;
}

.top-nav-menu {
  height: 63px;
  width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head-return {
  margin-top: 25px;
}

.head-return span {
  color: #1f6ead;
}

.head-return a {
  color: #151b20;
  font-size: 12px;
  padding: 0 10px;
}

>>> {
  --vs-border-radius: 0;

  --vs-controls-color: #ffffff;
  --vs-border-color: #ffffff;

  --vs-dropdown-bg: #fff;
  --vs-dropdown-color: #ffffff;
  --vs-dropdown-option-color: #333;

  --vs-selected-bg: var(--color-primary);
  --vs-selected-color: var(--color-primary);

  --vs-search-input-color: #ffffff;

  --vs-dropdown-option--active-bg: var(--color-primary);
  --vs-dropdown-option--active-color: #fff;
}
</style>
