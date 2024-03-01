<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const fileName:string[] = route.params.fileName as string[];

axios.get(`/posts/${fileName.join('/')}`)
  .then((res)=> {
    // Set content
    document.getElementById('PostComponent')!.innerHTML = res.data;

    // Set giscus
    const giscus = document.createElement('script');
    giscus.src ='https://giscus.app/client.js';
    giscus.async = true;
    giscus.setAttribute('data-repo', 'melonpan0130/cej_blog');
    giscus.setAttribute('data-repo-id', 'R_kgDOLXW8iQ');
    giscus.setAttribute('data-category-id', 'DIC_kwDOLXW8ic4CdpHp');
    giscus.setAttribute('data-mapping', 'pathname');
    giscus.setAttribute('data-strict', '0');
    giscus.setAttribute('data-reactions-enabled', '1');
    giscus.setAttribute('data-emit-metadata', '0');
    giscus.setAttribute('data-input-position', 'bottom');
    giscus.setAttribute('data-theme', 'preferred_color_scheme');
    giscus.setAttribute('data-lang', 'ko');
    giscus.setAttribute('crossorigin', 'anonymous');
    document.getElementById('giscus')?.appendChild(giscus);
  })
  .catch(err=>console.log(err));
</script>

<template>
  <div id="PostComponent"></div>
  <div id="giscus"></div>
</template>

<style>
#PostComponent {
  border-bottom: solid 1px #aeaeae;
}
</style>