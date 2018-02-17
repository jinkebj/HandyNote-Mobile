<template>
  <div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list class="note-folder-container">
      <folder-item :noteFolder="noteFolders[0]" @refreshFolderList="loadFolderList"></folder-item>

      <mu-list-item>
        <mu-icon slot="left" value="delete"/>
        <div slot="title" class="note-top-folder" @click="$router.push('/trash')">Trash</div>
        <mu-icon-menu slot="after" icon="more_vert">
          <mu-menu-item title="Empty Trash" @click="showEmptyTrashConfirm=true" />
          <mu-menu-item title="Restore All" @click="showRevertTrashConfirm=true" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>

    <mu-popup position="top" popupClass="popup-top" :open="emptyTrashPopup">
      Empty trash successfully!
    </mu-popup>

    <mu-dialog :open="showEmptyTrashConfirm" title="Please Confirm">
      Permanently delete all items in trash? This action can NOT be undone!
      <mu-flat-button slot="actions" @click="showEmptyTrashConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="emptyTrash" label="Yes"/>
    </mu-dialog>

    <mu-dialog :open="showRevertTrashConfirm" title="Please Confirm">
      Restore all items in trash?
      <mu-flat-button slot="actions" @click="showRevertTrashConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="revertTrash" label="Yes"/>
    </mu-dialog>
  </div>
</template>

<style>
.note-folder-container .mu-item {
  padding-top: 0;
  padding-bottom: 0;
  border-bottom: 1px solid #ddd;
}

.note-folder-container .mu-item.show-left {
  padding-left: 50px;
}

.popup-top {
  font-size: 16px;
  width: 100vw;
  color: #FFFFFF;
  background: #2196F3;
  height: 56px;
  line-height: 56px;
  display: flex;
  justify-content: center;
}
</style>

<style scoped>
.note-top-folder {
  color: #475669;
  font-size: 16px;
  font-weight: bold;
}

.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}
</style>

<script>
import Model from '@/models'
import {getCurUsrRootFolderId, getCurUsrRootFolderName, getCurUsrTrashFolderId} from '@/util'
import FolderItem from '@/components/FolderItem'

export default {
  components: {
    FolderItem
  },

  data () {
    return {
      trashFolderId: getCurUsrTrashFolderId(),
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
      refreshing: false,
      trigger: null,
      emptyTrashPopup: false,
      showEmptyTrashConfirm: false,
      showRevertTrashConfirm: false
    }
  },

  watch: {
    emptyTrashPopup (val) {
      if (val) {
        setTimeout(() => {
          this.emptyTrashPopup = false
        }, 2000)
      }
    }
  },

  mounted () {
    this.loadFolderList()
    this.trigger = this.$el
  },

  methods: {
    loadFolderList () {
      const self = this
      Model.getFolderTreeData()
        .then(function (response) {
          self.noteFolders = response.data
          self.refreshing = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    refresh () {
      this.refreshing = true
      this.loadFolderList()
    },

    emptyTrash () {
      const self = this
      Model.emptyTrash()
        .then(function (response) {
          self.emptyTrashPopup = true
          self.showEmptyTrashConfirm = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    revertTrash () {
      const self = this
      Model.revertTrash()
        .then(function (response) {
          self.loadFolderList()
          self.showRevertTrashConfirm = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
