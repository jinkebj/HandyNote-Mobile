<template>
  <div class="folder-container">
    <div class="folder-current" @click="selectFolder">
      <div :style="{width: folderGap + 'px' }"></div>
      <mu-icon value="folder" class="folder-icon" v-show="noteFolder.type === 0" />
      <div :class="noteFolder.type === 0 ? 'folder-title-top' : 'folder-title'">
        {{noteFolder.label}}
      </div>
    </div>

    <div class="folder-sub" v-for="noteFolder in noteFolder.children" :key="noteFolder.id" v-if="haveSubFolder">
      <folder-item :noteFolder="noteFolder" @selectFolder="(folderId) => $emit('selectFolder', folderId)"></folder-item>
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

.folder-selected {
  background: #E0E0E0;
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
    haveSubFolder () {
      return this.noteFolder.children &&
        this.noteFolder.children.length
    },

    folderGap () {
      return 20 * (this.noteFolder.ancestor_ids.length + 1)
    }
  },

  methods: {
    selectFolder () {
      this.$emit('selectFolder', this.noteFolder.id)
    }
  }
}
</script>
