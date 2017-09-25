<template>
  <mu-paper>
    <mu-bottom-nav :value="$route.path" @change="handleChange">
      <mu-bottom-nav-item value="/recents" title="Recents" icon="history"/>
      <mu-bottom-nav-item value="/folders" title="Folders" icon="folder"/>
      <mu-bottom-nav-item value="/favorites" title="Favorites" icon="favorite"/>
      <mu-bottom-nav-item value="/settings" title="Settings" icon="settings"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<style scoped>
</style>

<script>
export default {
  methods: {
    handleChange (val) {
      this.$router.replace(val)
    }
  }
}
</script>
