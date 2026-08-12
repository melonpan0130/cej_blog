<script setup lang="ts">
import { getNaviBarMap } from '~/utils/posts'

const naviBarMap = getNaviBarMap()
</script>

<template>
  <nav id="NavigationComponent">
    <NuxtLink to="/">Home</NuxtLink>
    <div v-for="(value, key) in naviBarMap" :key="key" class="navigationItem">
      <NuxtLink v-if="Object.keys(value).length === 0" :to="'/board/' + key">{{ key }}</NuxtLink>
      <div v-else class="dropdown">
        <a>{{ key }}</a>
        <div class="dropped">
          <NuxtLink
            v-for="(dropValue, dropKey) in value"
            :key="dropKey"
            :to="'/board/' + key + '/' + dropKey"
            class="droppedItem"
          >
            {{ dropKey }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigationItem,
.droppedItem {
  display: inline;
  margin: 0.5em;
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
