<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <my-note-widget></my-note-widget>
      <my-note-list :folderId="starFolderId"></my-note-list>
    </div>

    <my-footer></my-footer>
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
</style>

<script>
import {getCurUsrStarFolderId} from '@/util'
import MyHeader from '@/components/TopBar'
import MyNoteWidget from '@/components/AddNoteWidget'
import MyNoteList from '@/components/NoteList'
import MyFooter from '@/components/BottomBar'

export default {
  components: {
    MyHeader,
    MyNoteWidget,
    MyNoteList,
    MyFooter
  },

  data () {
    return {
      starFolderId: getCurUsrStarFolderId()
    }
  }
}
</script>
