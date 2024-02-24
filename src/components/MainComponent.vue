<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterComponent from './FooterComponent.vue';
import HeaderComponent from './HeaderComponent.vue';
import NavigationComponent from './NavigationComponent.vue';
</script>

<template>
  <main id="MainComponent">
    <HeaderComponent />
    <NavigationComponent />
    <div class="content">
      <RouterView />
    </div>
    <FooterComponent />
  </main>
</template>
