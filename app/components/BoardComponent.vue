<script setup lang="ts">
import { computed } from 'vue'
import { getAllPosts, toRouteSegments, type Post } from '~/utils/posts'

const route = useRoute()

const boardTitle = computed(() => {
  const segments = toRouteSegments(route.params.category)
  return segments.length ? segments.join(' / ') : ''
})

useSeoMeta({
  title: () => (boardTitle.value ? `${boardTitle.value} | cej_blog` : 'cej_blog'),
  description: 'cej_blog - Personal blog',
  ogTitle: () => (boardTitle.value ? `${boardTitle.value} | cej_blog` : 'cej_blog'),
  ogDescription: 'cej_blog - Personal blog',
  ogType: 'website'
})

function filterPosts(category: string[] | undefined): Post[] {
  const allPosts = getAllPosts()

  if (category !== undefined && category.length > 0) {
    const categoryPath = category.join('/')
    return allPosts.filter((post) => post.category === categoryPath)
  }

  return allPosts
}

const posts = computed(() => {
  const category = toRouteSegments(route.params.category)
  const filtered = filterPosts(category.length ? category : undefined)
  return filtered.sort((a, b) => (a.date > b.date ? -1 : 1))
})
</script>

<template>
  <div id="BoardComponent">
    <div v-for="(post, index) in posts" :key="post.path">
      <NuxtLink class="boardItem" :to="'/post/' + post.path">
        <h2 class="title">
          {{ `${String(index + 1).padStart(posts.length.toString().length, '0')} ${post.title}` }}
        </h2>
        <p class="date">{{ post.date }}</p>
        <p class="category">{{ `/${post.category}` }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
#BoardComponent .boardItem {
  margin: 10px 0;
  transition: 0.4s;
  padding: 1em;
  display: block;
}

#BoardComponent .boardItem:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

#BoardComponent .boardItem :deep(*) {
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

#BoardComponent .boardItem .title {
  font-weight: bolder;
}

#BoardComponent .boardItem .date {
  font-weight: 300;
}
</style>
