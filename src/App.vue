<template>
  <router-view></router-view>
</template>

<style>
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.md-bottom-bar {
  overflow: hidden; /* need this for iPhone5 */
}
</style>

<script>
export default {
  name: 'app'
}
</script>
