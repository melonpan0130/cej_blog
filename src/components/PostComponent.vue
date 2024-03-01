<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import GiscusComponent from './GiscusComponent.vue';

const route = useRoute();
const fileName:string[] = route.params.fileName as string[];

axios.get(`/posts/${fileName.join('/')}.html`)
  .then((res)=> {
    // Set content
    document.getElementById('PostComponent')!.innerHTML = res.data;
  })
  .catch(err=>console.log(err));
</script>

<template>
  <div id="PostComponent"></div>
  <GiscusComponent />
</template>

<style>
#PostComponent {
  border-bottom: solid 1px #aeaeae;
}
</style>