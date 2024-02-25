<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  data () {
    return {
      loading: true,
      posts: []
    }
  },
  mounted() {
    axios.get('posts.json')
      .then((res)=>{
        this.loading = false;
        this.posts = res.data;
      })
      .catch(err=>console.log(err));
  }
};
</script>

<template>
  <div id="BoardComponent">
    <div v-if="loading">...</div>
    <div v-else>
      <div v-for="(post, index) in posts" class="boardItem">
        <RouterLink :to="'post/'+post['fileName']" >
          <h2 class="title">
            {{ `${String(index+1).padStart(posts.length.toString().length, '0')}_${post['title']}.log` }}
          </h2>
          <p class="date">{{ post['date'] }}</p>
          <p class="category">{{ `/${post['category']}` }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
#BoardComponent .boardItem {
  margin: 10px 0;
  padding: 1em;
  transition: 0.4s;
}

#BoardComponent .boardItem:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

#BoardComponent .boardItem * {
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
}

#BoardComponent .boardItem .title {
  font-weight: bolder;
}

#BoardComponent .boardItem .date {
  font-weight: 300;
}
</style>