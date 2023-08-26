<script setup>
defineProps({
  newsInfo: Object
})
</script>

<template>
  <a target="_blank" :href="`${newsInfo.link}`" v-if="newsInfo.type === 2"><slot /></a>
  <a target="_blank" :href="`/news?id=${newsInfo.newsId}`" v-else><slot /></a>
</template>

<style scoped lang="scss"></style>
