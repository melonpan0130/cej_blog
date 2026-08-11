<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { RouterLink } from 'vue-router'

useSeoMeta({
  title: 'Page not found | cej_blog',
  description: 'The requested page could not be found.'
})
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found.</p>
    <RouterLink to="/">Back to home</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.not-found h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.not-found p {
  margin-bottom: 1.5rem;
  color: rgb(44, 62, 80);
}

@media (prefers-color-scheme: dark) {
  .not-found p {
    color: rgba(235, 235, 235, 0.64);
  }
}
</style>
