<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import axios from 'axios'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import postsData from '@/posts.json'
import GiscusComponent from './GiscusComponent.vue'

const route = useRoute()
const fileName: string[] = route.params.fileName as string[]

const post = computed(() => {
  const arr = fileName
  if (!arr?.length) return null
  const category = arr.length > 1 ? arr.slice(0, -1).join('/') : ''
  const postFileName = arr[arr.length - 1]
  return postsData.posts.find(
    (p: { category: string; fileName: string }) =>
      p.category === category && p.fileName === postFileName
  )
})

useSeoMeta({
  title: () => post.value?.title ?? 'cej_blog',
  titleTemplate: '%s | cej_blog',
  description: () => post.value?.description ?? 'cej_blog',
  ogTitle: () => post.value?.title ?? 'cej_blog',
  ogDescription: () => post.value?.description ?? 'cej_blog',
  ogUrl: () =>
    typeof window !== 'undefined' ? window.location.href : '',
  ogType: 'article',
  ogSiteName: 'cej_blog',
  twitterCard: 'summary_large_image',
  twitterTitle: () => post.value?.title ?? 'cej_blog',
  twitterDescription: () => post.value?.description ?? 'cej_blog'
})

axios.get(`/posts/${fileName.join('/')}.html`)
  .then((res)=> {
    // Set content
    document.getElementById('PostComponent')!.innerHTML = res.data;
  })
  .catch(err=>console.log(err));
</script>

<template>
  <div id="PostComponent"></div>
  <GiscusComponent />
</template>

<style>
#PostComponent {
  border-bottom: solid 1px #aeaeae;
}
</style>