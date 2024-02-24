<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav id="NavigationComponent">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>