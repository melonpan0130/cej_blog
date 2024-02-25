<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const fileName = route.params.fileName.toString();

axios.get(`/posts/${fileName}`)
  .then((res)=> {
    document.getElementById('PostComponent')!.innerHTML = res.data;
  })
  .catch(err=>console.log(err));
</script>

<template>
  <div id="PostComponent"></div>
</template>