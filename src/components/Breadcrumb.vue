<script setup>
defineProps({
  list: Array
})
</script>

<template>
  <ul class="breadcrumb" v-if="list && list.length">
    <li class="breadcrumb-item" v-for="(item, index) of list" v-bind:key="index"><a>1234</a></li>
  </ul>
</template>

<style scoped lang="scss"></style>
