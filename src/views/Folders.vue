<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
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
import MyNoteFolder from '@/components/NoteFolder'
import MyFooter from '@/components/BottomBar'

export default {
  components: {
    MyHeader,
    MyNoteFolder,
    MyFooter
  }
}
</script>
