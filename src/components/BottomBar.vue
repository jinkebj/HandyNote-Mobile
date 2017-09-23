<template>
  <md-bottom-bar class="page-footer">
    <md-bottom-bar-item md-icon="history" :md-active="isActive('/recents')" @click="$router.replace('/recents')">
      Recents
    </md-bottom-bar-item>
    <md-bottom-bar-item md-icon="folder" :md-active="isActive('/folders')" @click="$router.replace('/folders')">
      Folders
    </md-bottom-bar-item>
    <md-bottom-bar-item md-icon="favorite" :md-active="isActive('/favorites')" @click="$router.replace('/favorites')">
      Favorites
    </md-bottom-bar-item>
    <md-bottom-bar-item md-icon="settings" :md-active="isActive('/settings')" @click="$router.replace('/settings')">
      Settings
    </md-bottom-bar-item>
  </md-bottom-bar>
</template>

<style scoped>
</style>

<script>
export default {
  methods: {
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>
