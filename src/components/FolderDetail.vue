<template>
  <div class="page">
    <mu-appbar :title="folderTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-icon-button icon="add" slot="right" v-show="$route.params.id!==trashFolderId" />
    </mu-appbar>

    <div class="page-content">
      <my-note-list :folderId="$route.params.id"></my-note-list>
    </div>
  </div>

</template>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}
</style>

<script>
import Model from '@/models'
import {getCurUsrRootFolderId, getCurUsrTrashFolderId} from '@/util'
import MyNoteList from '@/components/NoteList'

export default {
  components: {
    MyNoteList
  },

  data () {
    return {
      rootFolderId: getCurUsrRootFolderId(),
      trashFolderId: getCurUsrTrashFolderId(),
      folderItem: {name: ''}
    }
  },

  computed: {
    folderTitle () {
      let title = ''
      if (this.$route.params.id === this.trashFolderId) {
        title = 'Trash'
      } else if (this.$route.params.id === this.rootFolderId) {
        title = 'My Folders'
      } else {
        title = 'Folder: ' + this.folderItem.name
      }
      return title
    }
  },

  mounted () {
    this.loadFolderInfo()
  },

  methods: {
    loadFolderInfo () {
      const self = this
      Model.getFolder(self.$route.params.id)
        .then(function (response) {
          self.folderItem = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
