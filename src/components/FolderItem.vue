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
        <mu-menu-item title="New Sub Folder" @click="selectFolderToAddSub(noteFolder)" />
        <mu-menu-item title="Rename" v-show="noteFolder.type !== 0" @click="selectFolderToRename(noteFolder)" />
        <mu-menu-item title="Move To" v-show="noteFolder.type !== 0"
          @click="$router.push({path: '/folder-select', query: {srcType: 'folder', srcId: noteFolder.id}})" />
        <mu-menu-item title="Delete" v-show="noteFolder.type !== 0" @click="selectFolderToDelete(noteFolder)" />
      </mu-icon-menu>
    </div>

    <div class="folder-sub" v-for="noteFolder in noteFolder.children" :key="noteFolder.id" v-if="haveSubFolder">
      <folder-item :noteFolder="noteFolder" @refreshFolderList="$emit('refreshFolderList')"></folder-item>
    </div>

    <mu-dialog :open="showAddFolderForm" title="Add Folder">
      <mu-text-field hintText="Folder Name" v-model="newFolderName" />
      <mu-flat-button slot="actions" @click="showAddFolderForm=false" primary label="Cancel"/>
      <mu-flat-button slot="actions" primary @click="addFolder" label="Add" :disabled="newFolderName===''"/>
    </mu-dialog>

    <mu-dialog :open="showRenameFolderForm" title="Rename Folder">
      <mu-text-field hintText="Folder Name" v-model="newFolderName" />
      <mu-flat-button slot="actions" @click="showRenameFolderForm=false" primary label="Cancel"/>
      <mu-flat-button slot="actions" primary @click="renameFolder" label="Rename" :disabled="newFolderName===''"/>
    </mu-dialog>

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
      showAddFolderForm: false,
      showRenameFolderForm: false,
      showDeleteConfirm: false,
      selectedFolder: {},
      newFolderName: ''
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
    selectFolderToAddSub (selectedFolder) {
      this.newFolderName = ''
      this.showAddFolderForm = true
      this.selectedFolder = selectedFolder
    },

    selectFolderToRename (selectedFolder) {
      this.newFolderName = ''
      this.showRenameFolderForm = true
      this.selectedFolder = selectedFolder
    },

    selectFolderToDelete (selectedFolder) {
      this.showDeleteConfirm = true
      this.selectedFolder = selectedFolder
    },

    addFolder () {
      const self = this
      let newAncestorIds = self.selectedFolder.ancestor_ids.concat([self.selectedFolder.id])
      Model.addFolder({
        name: self.newFolderName,
        parent_id: self.selectedFolder.id,
        ancestor_ids: newAncestorIds
      })
        .then(function (response) {
          self.showAddFolderForm = false
          self.$emit('refreshFolderList')
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    renameFolder () {
      const self = this
      Model.updateFolder(self.selectedFolder.id, {
        name: self.newFolderName
      })
        .then(function (response) {
          self.showRenameFolderForm = false
          self.$emit('refreshFolderList')
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    deleteFolder () {
      const self = this
      Model.deleteFolder(self.selectedFolder.id)
        .then(function (response) {
          self.showDeleteConfirm = false
          self.$emit('refreshFolderList')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
