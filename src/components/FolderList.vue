<template>
  <div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list class="note-folder-container">
      <folder-item :noteFolder="noteFolders[0]"></folder-item>

      <mu-list-item>
        <mu-icon slot="left" value="delete"/>
        <div slot="title" class="note-top-folder" @click="$router.push('/folders/' + trashFolderId)">Trash (5)</div>
        <mu-icon-menu slot="after" icon="more_vert">
          <mu-menu-item title="Empty Trash" />
          <mu-menu-item title="Restore All" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>

    <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />
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
import {prepareFolderData, getCurUsrRootFolderId, getCurUsrTrashFolderId} from '@/util'
import FolderItem from '@/components/FolderItem'

export default {
  components: {
    FolderItem
  },

  data () {
    return {
      loadingFlag: true,
      rootFolderId: getCurUsrRootFolderId(),
      trashFolderId: getCurUsrTrashFolderId(),
      noteFolders: [
        {
          type: 0,
          id: getCurUsrRootFolderId(),
          label: 'My Folders',
          ancestor_ids: [],
          children: []
        }
      ],
      refreshing: false,
      trigger: null
    }
  },

  mounted () {
    this.loadFolderList()
    this.trigger = this.$el
  },

  methods: {
    loadFolderList () {
      const self = this
      self.loadingFlag = true
      Model.getFolderList()
        .then(function (response) {
          self.noteFolders = prepareFolderData(self.noteFolders[0], response.data)
          self.loadingFlag = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    refresh () {
      this.refreshing = true
      setTimeout(() => {
        this.loadFolderList()
        this.refreshing = false
      }, 1000)
    }
  }
}
</script>
