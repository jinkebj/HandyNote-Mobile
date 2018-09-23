<template>
  <div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list class="note-folder-container">
      <folder-item :noteFolder="noteFolders[0]" @refreshFolderList="loadFolderList"></folder-item>

      <mu-list-item @click="$router.push('/trash')">
        <mu-icon slot="left" value="delete"/>
        <div slot="title" class="note-top-folder">Trash</div>
      </mu-list-item>
    </mu-list>
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
import {getRootFolderItem, getCurUsrTrashFolderId} from '@/util'
import FolderItem from '@/components/FolderItem'

export default {
  components: {
    FolderItem
  },

  data () {
    return {
      trashFolderId: getCurUsrTrashFolderId(),
      noteFolders: [getRootFolderItem()],
      refreshing: false,
      trigger: null
    }
  },

  mounted () {
    // use cached folder list first
    this.noteFolders = JSON.parse(window.localStorage.getItem('hn-folder-list-cache') || JSON.stringify(this.noteFolders))
    this.loadFolderList()
    this.trigger = this.$el

    this.$bus.$on('syncFinished', () => {
      this.refresh()
    })
  },

  methods: {
    loadFolderList () {
      const self = this
      Model.getFolderTreeData()
        .then(function (response) {
          self.noteFolders = response.data
          window.localStorage.setItem('hn-folder-list-cache', JSON.stringify(response.data))
          self.refreshing = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    refresh () {
      this.refreshing = true
      this.loadFolderList()
    }
  }
}
</script>
