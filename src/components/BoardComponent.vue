<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  data () {
    const postsProp:any = this.$posts;
    
    return {
      posts: postsProp.posts
    }
  }
};
</script>

<template>
  <div id="BoardComponent">
    <div v-for="(post, index) in posts" >
      <RouterLink class="boardItem" :to="'post/'+post['fileName']">
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