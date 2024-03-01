<script lang="ts">
export default {
  mounted() {
    // Set Giscus
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
  }
}
</script>

<template>
  <div id="giscus"></div>
</template>