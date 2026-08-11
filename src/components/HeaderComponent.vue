<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div id="HeaderComponent">
    <div class="about">
      <a href="https://github.com/melonpan0130">Github</a>
    </div>
    <RouterLink to="/" class="logo">
      <p>😎 A blog I made for Deep Dive</p>
    </RouterLink>
  </div>
</template>