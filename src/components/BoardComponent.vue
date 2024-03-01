<script lang="ts">
import { watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

export default {
  data () {
    const route = useRoute();
    watch(()=> route, ()=> {
      // Route changed
      const category:string[] = route.params.category as string[];
      const postsProp:any = this.$posts;
      this.posts = this.reload(category, postsProp);
    }, {
      deep: true
    });

    const category:string[] = route.params.category as string[];
    const postsProp:any = this.$posts;
    const result:any[] = this.reload(category, postsProp)
      .sort((a:any, b:any) => {
      return a['date'] > b['date'] ? -1 : 1;
    });
    
    return {
      posts: result
    }
  },
  methods: {
    reload(category:string[], postsProp:any): any[] {
      if (category !== undefined) {
        const categoryPath = category.join('/');
        return postsProp.posts.filter((post:any) => post['category'] === categoryPath);
      } else {
        return postsProp.posts;
      }
    }
  }
};
</script>

<template>
  <div id="BoardComponent">
    <div v-for="(post, index) in posts" :key="index">
      <RouterLink class="boardItem" :to="'/post/'+post['category']+'/'+post['fileName']">
        <h2 class="title">
          {{ `${String(index+1).padStart(posts.length.toString().length, '0')}_${post['title']}.log` }}
        </h2>
        <p class="date">{{ post['date'] }}</p>
        <p class="category">{{ `/${post['category']}` }}</p>
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