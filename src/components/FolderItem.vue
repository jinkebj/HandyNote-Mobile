<template>
  <div class="folder-container">
    <div class="folder-current">
      <div :style="{width: folderGap + 'px' }"></div>
      <mu-icon value="folder" class="folder-icon" v-show="noteFolder.type === 0" />
      <div :class="noteFolder.type === 0 ? 'folder-title-top' : 'folder-title'"
        @click="$router.push('/folders/' + noteFolder.id)">
        {{noteFolder.label}} ({{getFolderStatisticsInfo}})
      </div>
      <mu-icon-menu icon="more_vert">
        <mu-menu-item title="New Sub Folder" />
        <mu-menu-item title="Rename" v-show="noteFolder.type !== 0" />
        <mu-menu-item title="Move To" v-show="noteFolder.type !== 0" />
        <mu-menu-item title="Delete" v-show="noteFolder.type !== 0" @click="selectFolder(noteFolder.id)" />
      </mu-icon-menu>
    </div>

    <div class="folder-sub" v-for="noteFolder in noteFolder.children" :key="noteFolder.id" v-if="haveSubFolder">
      <folder-item :noteFolder="noteFolder" @deleteFolder="$emit('deleteFolder')"></folder-item>
    </div>

    <mu-dialog :open="showDeleteConfirm" title="Please Confirm">
      All notes and subfolder under this folder will be moved to trash, continue?
      <mu-flat-button slot="actions" @click="showDeleteConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="deleteFolder" label="Yes"/>
    </mu-dialog>
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
import Model from '@/models'

export default {
  name: 'folderItem',

  props: {
    noteFolder: Object
  },

  data () {
    return {
      showDeleteConfirm: false,
      selectedFolderId: ''
    }
  },

  computed: {
    haveSubFolder () {
      return this.noteFolder.children &&
        this.noteFolder.children.length
    },

    folderGap () {
      return 20 * (this.noteFolder.ancestor_ids.length + 1)
    },

    getFolderStatisticsInfo () {
      if (this.noteFolder.note_count_cur === this.noteFolder.note_count_all) {
        return this.noteFolder.note_count_cur
      } else {
        return this.noteFolder.note_count_cur + '/' + this.noteFolder.note_count_all
      }
    }
  },

  methods: {
    selectFolder (id) {
      this.showDeleteConfirm = true
      this.selectedFolderId = id
    },

    deleteFolder () {
      const self = this
      Model.deleteFolder(self.selectedFolderId)
        .then(function (response) {
          self.showDeleteConfirm = false
          self.$emit('deleteFolder')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
