<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostByPath, getPostContent } from '@/utils/posts'
import GiscusComponent from './GiscusComponent.vue'

const route = useRoute()
const fileName = computed(() => route.params.fileName as string[])

const post = computed(() => {
  const segments = fileName.value
  if (!segments?.length) return null

  const category = segments.length > 1 ? segments.slice(0, -1).join('/') : ''
  const postFileName = segments[segments.length - 1]
  return getPostByPath(category, postFileName)
})

const content = computed(() => {
  const segments = fileName.value
  if (!segments?.length) return ''
  return getPostContent(segments.join('/'))
})

useSeoMeta({
  title: () => post.value?.title ?? 'cej_blog',
  titleTemplate: '%s | cej_blog',
  description: () => post.value?.description ?? 'cej_blog',
  ogTitle: () => post.value?.title ?? 'cej_blog',
  ogDescription: () => post.value?.description ?? 'cej_blog',
  ogUrl: () => (typeof window !== 'undefined' ? window.location.href : ''),
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
      <p class="post-date" :datetime="post.date">{{ post.date }}</p>
      <RouterLink
        v-if="post.category"
        class="post-category"
        :to="'/board/' + post.category"
      >
        /{{ post.category }}
      </RouterLink>
    </header>
    <div id="PostComponent" v-html="content"></div>
  </article>
  <GiscusComponent />
</template>

<style>
.post-header {
  margin: 1.5rem 0;
}

.post-category {
  display: inline-block;
  font-size: 0.9rem;
  color: hsla(160, 100%, 37%, 1);
}

.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.post-date {
  color: #888;
  font-size: 0.9rem;
}

#PostComponent {
  padding: 16px 0;
  border-bottom: solid 1px #aeaeae;
}

@media (prefers-color-scheme: dark) {
  .post-date {
    color: rgba(235, 235, 235, 0.45);
  }
}
</style>
