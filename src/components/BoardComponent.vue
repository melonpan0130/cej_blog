<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getAllPosts, type Post } from '@/utils/posts'

const route = useRoute()

function filterPosts(category: string[] | undefined): Post[] {
  const allPosts = getAllPosts()

  if (category !== undefined) {
    const categoryPath = category.join('/')
    return allPosts.filter((post) => post.category === categoryPath)
  }

  return allPosts
}

const posts = computed(() => {
  const category = route.params.category as string[] | undefined
  return filterPosts(category).sort((a, b) => (a.date > b.date ? -1 : 1))
})
</script>

<template>
  <div id="BoardComponent">
    <div v-for="(post, index) in posts" :key="post.path">
      <RouterLink class="boardItem" :to="'/post/' + post.category + '/' + post.fileName">
        <h2 class="title">
          {{ `${String(index + 1).padStart(posts.length.toString().length, '0')}_${post.title}.log` }}
        </h2>
        <p class="date">{{ post.date }}</p>
        <p class="category">{{ `/${post.category}` }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style>
#BoardComponent .boardItem {
  margin: 10px 0;
  transition: 0.4s;
  padding: 1em;
  display: block;
}

#BoardComponent .boardItem:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

#BoardComponent .boardItem * {
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
