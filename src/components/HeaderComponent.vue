<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div id="HeaderComponent">
    <div class="about">
      <a href="https://github.com/melonpan0130">Github</a>
    </div>
    <RouterLink to="/">
      <p>😎 A blog I made for studying</p>
    </RouterLink>
  </div>
</template>

<style>
#HeaderComponent p {
  display: inline-block;
}
#HeaderComponent .about {
  display: flex;
}
#HeaderComponent .about a {
  display: inline-flex;
  flex-shrink: 0;
  margin-inline-start: auto;
}
</style>