<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  data () {
    const postsProp:any = this.$posts;
    const postList:any[] = postsProp.posts;
    const categoryList:string[] = postList.flatMap((post)=> post['category']);
    const categoryMap:any = [...new Set(categoryList)]
      .sort()
      .map((category)=> category.split('/'));
    
    return {
      posts: postsProp.posts,
      naviBarMap: this.setNaviBarMap(categoryMap)
    }
  },
  methods: {
    setNaviBarMap(categoryMap:any) {
      const obj:any = {};

      categoryMap.forEach((element:any) => {
        let currentLevel:any = obj;
        element.forEach((value:any) => {
          if (!currentLevel[value]) {
            currentLevel[value] = {};
          }
          currentLevel = currentLevel[value];
        });
      });
      return obj;
    }
  }
};
</script>

<template>
  <nav id="NavigationComponent">
    <RouterLink to="/">Home</RouterLink>
    <div v-for="(value, key) in naviBarMap" :key="key" class="navigationItem">
      <RouterLink v-if="Object.keys(value).length === 0" :to="'/board/'+key">{{ key }}</RouterLink>
      <div v-else class="dropdown">
        <a>{{ key }}</a>
        <div class="dropped">
          <RouterLink
            v-for="(dropValue, dropKey) in value"
            :key="dropKey"
            :to="'/board/'+key+'/'+dropKey"
            class="droppedItem">
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