<template>
  <mu-paper>
    <mu-bottom-nav :value="$route.path" @change="handleChange">
      <mu-bottom-nav-item value="/recents" title="Recents" icon="history"/>
      <mu-bottom-nav-item value="/folders" title="Folders" icon="folder_open"/>
      <mu-bottom-nav-item value="/favorites" title="Starred" icon="star_border"/>
      <mu-bottom-nav-item value="/settings" title="Me" icon="perm_identity"/>
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
