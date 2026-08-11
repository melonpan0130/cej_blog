<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { getNaviBarMap } from '@/utils/posts'

const naviBarMap = getNaviBarMap()
</script>

<template>
  <nav id="NavigationComponent">
    <RouterLink to="/">Home</RouterLink>
    <div v-for="(value, key) in naviBarMap" :key="key" class="navigationItem">
      <RouterLink v-if="Object.keys(value).length === 0" :to="'/board/' + key">{{ key }}</RouterLink>
      <div v-else class="dropdown">
        <a>{{ key }}</a>
        <div class="dropped">
          <RouterLink
            v-for="(dropValue, dropKey) in value"
            :key="dropKey"
            :to="'/board/' + key + '/' + dropKey"
            class="droppedItem"
          >
            {{ dropKey }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.navigationItem,
.droppedItem {
  display: inline;
}

.dropdown {
  display: inline;
  position: relative;
}
.dropped {
  display: none;
  background-color: hsla(160, 100%, 37%, 0.2);
  position: absolute;
  left: 5px;
  padding: 10px;
}

.dropdown:hover .dropped,
.dropped:hover {
  display: block;
}
</style>
