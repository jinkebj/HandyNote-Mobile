<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <my-note-widget></my-note-widget>
      <my-note-folder></my-note-folder>
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
import MyHeader from '@/components/TopBar'
import MyNoteWidget from '@/components/AddNoteWidget'
import MyNoteFolder from '@/components/FolderList'
import MyFooter from '@/components/BottomBar'

export default {
  components: {
    MyHeader,
    MyNoteWidget,
    MyNoteFolder,
    MyFooter
  }
}
</script>
