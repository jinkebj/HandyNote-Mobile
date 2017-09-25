<template>
  <mu-list class="note-folder-container">
    <mu-list-item>
      <mu-icon slot="left" value="folder" />
      <div slot="title" class="note-top-folder" @click="$router.replace('/recents')">My Folders (12 / 30)</div>
      <mu-icon-menu slot="after" icon="more_vert">
        <mu-menu-item title="New Sub Folder" />
      </mu-icon-menu>

      <mu-list-item slot="nested">
        <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Added (10 / 23)</div>
        <mu-icon-menu slot="after" icon="more_vert">
          <mu-menu-item title="New Sub Folder" />
          <mu-menu-item title="Rename" />
          <mu-menu-item title="Move To" />
          <mu-menu-item title="Delete" />
        </mu-icon-menu>

        <mu-list-item slot="nested">
          <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Drafts (5)</div>
          <mu-icon-menu slot="after" icon="more_vert">
            <mu-menu-item title="New Sub Folder" />
            <mu-menu-item title="Rename" />
            <mu-menu-item title="Move To" />
            <mu-menu-item title="Delete" />
          </mu-icon-menu>
        </mu-list-item>

        <mu-list-item slot="nested">
          <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Java (8)</div>
          <mu-icon-menu slot="after" icon="more_vert">
            <mu-menu-item title="New Sub Folder" />
            <mu-menu-item title="Rename" />
            <mu-menu-item title="Move To" />
            <mu-menu-item title="Delete" />
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>

      <mu-list-item slot="nested">
        <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Another (10 / 23)</div>
        <mu-icon-menu slot="after" icon="more_vert">
          <mu-menu-item title="New Sub Folder" />
          <mu-menu-item title="Rename" />
          <mu-menu-item title="Move To" />
          <mu-menu-item title="Delete" />
        </mu-icon-menu>

        <mu-list-item slot="nested">
          <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Drafts (5)</div>
          <mu-icon-menu slot="after" icon="more_vert">
            <mu-menu-item title="New Sub Folder" />
            <mu-menu-item title="Rename" />
            <mu-menu-item title="Move To" />
            <mu-menu-item title="Delete" />
          </mu-icon-menu>
        </mu-list-item>

        <mu-list-item slot="nested">
          <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Java (8)</div>
          <mu-icon-menu slot="after" icon="more_vert">
            <mu-menu-item title="New Sub Folder" />
            <mu-menu-item title="Rename" />
            <mu-menu-item title="Move To" />
            <mu-menu-item title="Delete" />
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>

      <mu-list-item slot="nested">
        <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Updated (2 / 6)</div>
        <mu-icon-menu slot="after" icon="more_vert">
          <mu-menu-item title="New Sub Folder" />
          <mu-menu-item title="Rename" />
          <mu-menu-item title="Move To" />
          <mu-menu-item title="Delete" />
        </mu-icon-menu>
        <mu-list-item slot="nested">
          <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Drafts (4)</div>
          <mu-icon-menu slot="after" icon="more_vert">
            <mu-menu-item title="New Sub Folder" />
            <mu-menu-item title="Rename" />
            <mu-menu-item title="Move To" />
            <mu-menu-item title="Delete" />
          </mu-icon-menu>
        </mu-list-item>
      </mu-list-item>
    </mu-list-item>

    <mu-list-item>
      <mu-icon slot="left" value="delete"/>
      <div slot="title" class="note-folder-title" @click="$router.replace('/recents')">Trash (5)</div>
      <mu-icon-menu slot="after" icon="more_vert">
        <mu-menu-item title="Empty Trash" />
        <mu-menu-item title="Restore All" />
      </mu-icon-menu>
    </mu-list-item>
  </mu-list>
</template>

<style>
.note-folder-container .mu-item {
  padding-top: 0;
  padding-bottom: 0;
  border-bottom: 1px solid #ddd;
}

.note-folder-container .mu-list {
  padding: 0;
}

.note-folder-container .mu-item.show-left {
  padding-left: 50px;
}

.mu-menu-item-wrapper {
  font-size: 14px;
}

.note-top-folder {
  color: #475669;
  font-size: 16px;
  font-weight:bold;
}

.note-folder-title {
  color: #475669;
  font-size: 14px;
}
</style>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
