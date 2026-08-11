<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BoardComponent from '@/components/BoardComponent.vue'

const route = useRoute()
const boardTitle = computed(() => {
  const cat = route.params.category
  return Array.isArray(cat) ? cat.join(' / ') : cat
})

useSeoMeta({
  title: () =>
    boardTitle.value ? `${boardTitle.value} | cej_blog` : 'cej_blog',
  description: 'cej_blog - Personal blog',
  ogTitle: () =>
    boardTitle.value ? `${boardTitle.value} | cej_blog` : 'cej_blog',
  ogDescription: 'cej_blog - Personal blog',
  ogType: 'website'
})
</script>

<template>
  <BoardComponent />
</template>
