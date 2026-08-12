<script setup lang="ts">
import { computed } from 'vue'
import { getPostByPath, getPostContent, toRouteSegments } from '~/utils/posts'

const route = useRoute()
const segments = computed(() => toRouteSegments(route.params.fileName))

const post = computed(() => {
  const parts = segments.value
  if (!parts.length) return null

  const category = parts.length > 1 ? parts.slice(0, -1).join('/') : ''
  const postFileName = parts.at(-1)
  if (!postFileName) return null
  return getPostByPath(category, postFileName)
})

const content = computed(() => {
  if (!segments.value.length) return ''
  return getPostContent(segments.value.join('/'))
})

useSeoMeta({
  title: () => post.value?.title ?? 'cej_blog',
  titleTemplate: '%s | cej_blog',
  description: () => post.value?.description ?? 'cej_blog',
  ogTitle: () => post.value?.title ?? 'cej_blog',
  ogDescription: () => post.value?.description ?? 'cej_blog',
  ogUrl: () => (import.meta.client ? window.location.href : ''),
  ogType: 'article',
  ogSiteName: 'cej_blog',
  twitterCard: 'summary_large_image',
  twitterTitle: () => post.value?.title ?? 'cej_blog',
  twitterDescription: () => post.value?.description ?? 'cej_blog'
})
</script>

<template>
  <article v-if="post" class="post">
    <header class="post-header">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-date">{{ post.date }}</p>
      <NuxtLink
        v-if="post.category"
        class="post-category"
        :to="'/board/' + post.category"
      >
        /{{ post.category }}
      </NuxtLink>
    </header>
    <div class="post-content" v-html="content"></div>
  </article>
  <GiscusComponent />
</template>

<style scoped>
.post {
  margin: 1.5rem 0;
  padding: 1.5rem 0;
  border-bottom: solid 1px hsla(160, 100%, 37%, 1);
}

.post-header {
  margin-bottom: 1.5rem 0;
}

.post-category {
  display: inline-block;
  font-size: 0.9rem;
  color: hsla(160, 100%, 37%, 1);
}

.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: bold;
}

.post-date {
  color: #888;
  font-size: 0.9rem;
}

.post-content {
  padding: 16px 0;
  /* border-bottom: solid 1px #aeaeae; */
}
/* 
.post-divider {
  border: none;
  border-top: solid 1px hsla(160, 100%, 37%, 1);;
  margin: 1.5rem 0;
} */


@media (prefers-color-scheme: dark) {
  .post-date {
    color: rgba(235, 235, 235, 0.45);
  }
}
</style>
