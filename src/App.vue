<template>
  <div id="app" class="page">
    <md-whiteframe md-elevation="3" class="page-header">
      <md-toolbar class="md-dense">
        <div class="md-toolbar-container">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>

          <span style="flex: 1"></span>

          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>view_module</md-icon>
          </md-button>
        </div>
      </md-toolbar>
    </md-whiteframe>

    <div class="page-content">
      <md-speed-dial md-open="click" md-direction="top" class="md-fab-bottom-right">
        <md-button class="md-fab" md-fab-trigger>
          <md-icon md-icon-morph>close</md-icon>
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>note_add</md-icon>
        </md-button>

        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>alarm_add</md-icon>
        </md-button>
      </md-speed-dial>
      <router-view></router-view>
    </div>

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
  </div>
</template>

<style>
html,
body,
.page {
  height: 100%; /* needed for proper layout */
}

body {
  overflow: hidden;
}

.page {
  display: flex;
  flex-direction: column;
}

.page-header {
  flex: 0 0 auto;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}

.page-footer {
  flex: 0 0 auto;
}
</style>

<script>
export default {
  name: 'app',

  methods: {
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>
