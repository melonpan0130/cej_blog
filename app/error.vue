<script setup lang="ts">
const error = useError()

useSeoMeta({
  title: 'Page not found | cej_blog',
  description: 'The requested page could not be found.'
})
</script>

<template>
  <div class="not-found">
    <h1>{{ error?.statusCode ?? 404 }}</h1>
    <p>Page not found.</p>
    <NuxtLink to="/">Back to home</NuxtLink>
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
}
</style>
