<template>
  <div class="page">
    <mu-appbar title="Select Folder">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-flat-button label="Cancel" slot="right" @click="$router.back()" />
      <mu-flat-button label="Move" slot="right" :disabled="selectedFolderId===''" @click="moveItem" />
    </mu-appbar>

    <div class="page-content">
      <folder-item :noteFolder="noteFolders[0]" @selectFolder="(id) => selectedFolderId = id"></folder-item>
      <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />
    </div>
  </div>
</template>

<style scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}

.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}
</style>

<script>
import Model from '@/models'
import {getCurUsrRootFolderId, getCurUsrRootFolderName} from '@/util'
import FolderItem from '@/components/FolderSelectItem'

export default {
  props: {
    srcType: String, // 'note' or 'folder'
    srcId: String // id of note or folder to be moved
  },

  components: {
    FolderItem
  },

  data () {
    return {
      loadingFlag: true,
      noteFolders: [
        {
          type: 0,
          id: getCurUsrRootFolderId(),
          label: getCurUsrRootFolderName(),
          ancestor_ids: [],
          children: [],
          note_count_cur: 0, // count of notes under current folder
          note_count_all: 0 // count of notes under current folder and all sub folders
        }
      ],
      selectedFolderId: ''
    }
  },

  mounted () {
    if (this.srcType === 'folder') {
      this.loadFolderList({exclude_id: this.srcId})
    } else {
      this.loadFolderList()
    }
  },

  methods: {
    loadFolderList (params) {
      const self = this
      self.loadingFlag = true
      Model.getFolderTreeData(params)
        .then(function (response) {
          self.noteFolders = response.data
          self.loadingFlag = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    moveItem () {
      const self = this
      if (self.srcType === 'folder') {
        Model.updateFolder(self.srcId, {
          parent_id: self.selectedFolderId
        })
          .then(function (response) {
            self.$router.back()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        Model.updateNote(self.srcId, {
          folder_id: self.selectedFolderId
        })
          .then(function (response) {
            self.$router.back()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }

  }
}
</script>
