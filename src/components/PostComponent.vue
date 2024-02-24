<script setup lang="ts">
import axios from 'axios';

axios.get('test.html')
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err));
</script>

<template>
  <div id="PostComponent">
    PostComponent
  </div>
</template>