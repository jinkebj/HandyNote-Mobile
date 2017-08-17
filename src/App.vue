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



    <md-list class="page-content md-triple-line">
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
      <md-list-item>
        <md-avatar class="md-avatar-icon">
          <md-icon>folder</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>Ali Connors</span>
          <p>I'll be in your neighborhood doing errands...</p>
          <p>Jan 20, 2014</p>
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>

      <md-list-item>
        <md-avatar class="md-avatar-icon md-primary">
          <md-icon>insert_drive_file</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>Vacation Itinerary</span>
          <span>testtestsets</span>
          <p>Jan 20, 2014</p>
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>

      <md-list-item>
        <md-avatar md-theme="orange" class="md-avatar-icon md-primary">
          <md-icon>collections</md-icon>
        </md-avatar>

        <div class="md-list-text-container">
          <span>Kitchen Remodel</span>
          <span>testtestsets</span>
          <p>Jan 10, 2014</p>
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon>more_vert</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <md-bottom-bar class="page-footer">
      <md-bottom-bar-item md-icon="history">Recents</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="folder">Folders</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="favorite" md-active>Favorites</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="settings">Settings</md-bottom-bar-item>
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
  name: 'app'
}
</script>
