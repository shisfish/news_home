<script setup>
defineProps({
  list: Array
})
</script>

<template>
  <div class="breadcrumb">
    <span>所在位置：</span>
    <ul class="breadcrumb-list" v-if="list && list.length">
      <li class="breadcrumb-item" v-for="(item, index) of list" v-bind:key="index">
        <a :href="item.link">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 10px;
  >span {
    font-weight: bold;
    color: #999;
  }
}
.breadcrumb-list {
  display: flex;
  flex-direction: row;
  .breadcrumb-item {
    padding: 5px 0 5px 6px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      &::after {
        content: '';
      }
    }
    &::after {
      content: '>';
      display: inline-block;
      padding-left: 6px;
      color: #999;
    }
    a {
      color: #999;
      font-weight: bold;
    }
  }
}
</style>
