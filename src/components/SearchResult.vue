<template>
  <div class="page">
    <mu-appbar :title="getSearchTitle">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
    </mu-appbar>

    <div class="page-content">
      <my-note-list :folderId="curFolderId" :searchStr="searchStr"></my-note-list>
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
import {getCurUsrSearchFolderId} from '@/util'
import MyNoteList from '@/components/NoteList'

export default {
  props: ['searchStr'],

  components: {
    MyNoteList
  },

  data () {
    return {
      curFolderId: getCurUsrSearchFolderId(),
      searchStr: ''
    }
  },

  computed: {
    getSearchTitle () {
      return 'Search: ' + this.searchStr
    }
  }
}
</script>
