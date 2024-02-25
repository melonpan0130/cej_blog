<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const fileName = route.params.fileName.toString();

axios.get(`/posts/${fileName}`)
  .then((res)=> {
    // Set content
    document.getElementById('PostComponent')!.innerHTML = res.data;

    // Set Utterances
    const utterances = document.createElement('script');
    utterances.type = 'text/javascript';
    utterances.async = true;
    utterances.src = 'https://utteranc.es/client.js';
    utterances.setAttribute('crossorigin', 'anonymous')
    utterances.setAttribute('issue-term', 'pathname');
    utterances.setAttribute('theme', 'github-light');
    utterances.setAttribute('repo', 'melonpan0130/cej_blog');
    document.getElementById('utterances')!.appendChild(utterances);
  })
  .catch(err=>console.log(err));
</script>


<template>
  <div id="PostComponent"></div>
  <div id="utterances"></div>
</template>

<style>
#PostComponent {
  border-bottom: solid 1px #aeaeae;
}
</style>