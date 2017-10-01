<template>
  <div class="folder-container">
    <div class="folder-current">
      <div :style="{width: folderGap + 'px' }"></div>
      <mu-icon value="folder" class="folder-icon" v-show="noteFolder.type === 0" />
      <div :class="noteFolder.type === 0 ? 'folder-title-top' : 'folder-title'"
        @click="$router.push('/folders/' + noteFolder.id)">
        {{noteFolder.label}} (888)
      </div>
      <mu-icon-menu icon="more_vert">
        <mu-menu-item title="New Sub Folder" />
        <mu-menu-item title="Rename" v-show="noteFolder.type !== 0" />
        <mu-menu-item title="Move To" v-show="noteFolder.type !== 0" />
        <mu-menu-item title="Delete" v-show="noteFolder.type !== 0" />
      </mu-icon-menu>
    </div>

    <div class="folder-sub" v-for="noteFolder in noteFolder.children" :key="noteFolder.id" v-if="haveSubFolder">
      <folder-item :noteFolder="noteFolder"></folder-item>
    </div>
  </div>
</template>

<style scoped>
.folder-container {
  color: #475669;
  display: flex;
  flex-flow: column;
}

.folder-current {
  padding-right: 15px;
  border-bottom: 1px solid #ddd;

  display: flex;
  flex-flow: row;
  align-items: center;
}

.folder-current:hover {
  background: #E0E0E0;
}

.folder-icon {
  color: #757575;
  padding-right: 10px;
}

.folder-title-top {
  color: #475669;
  font-size: 16px;
  font-weight: bold;
  flex: auto;
  height: 48px;
  line-height: 48px;
}

.folder-title {
  flex: auto;
  height: 48px;
  line-height: 48px;
}

.folder-sub {
  display: flex;
  flex-flow: column;
}
</style>

<script>
export default {
  name: 'folderItem',

  props: {
    noteFolder: Object
  },

  data () {
    return {
    }
  },

  computed: {
    haveSubFolder: function () {
      return this.noteFolder.children &&
        this.noteFolder.children.length
    },

    folderGap: function () {
      return 20 * (this.noteFolder.ancestor_ids.length + 1)
    }
  },

  methods: {
  }
}
</script>
