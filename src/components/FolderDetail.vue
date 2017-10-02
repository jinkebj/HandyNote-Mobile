<template>
  <div class="page">
    <mu-appbar :title="folderTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
    </mu-appbar>

    <div class="page-content">
      <my-note-widget :folderId="id" :bottom=true></my-note-widget>
      <my-note-list :folderId="id"></my-note-list>
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
import {getCurUsrRootFolderId} from '@/util'
import MyNoteWidget from '@/components/AddNoteWidget'
import MyNoteList from '@/components/NoteList'

export default {
  props: ['id'],

  components: {
    MyNoteWidget,
    MyNoteList
  },

  data () {
    return {
      rootFolderId: getCurUsrRootFolderId(),
      folderItem: {name: ''}
    }
  },

  computed: {
    folderTitle () {
      let title = ''
      if (this.id === this.rootFolderId) {
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
      Model.getFolder(self.id)
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
