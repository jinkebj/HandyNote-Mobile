<template>
  <div class="page">
    <mu-appbar title="Folder">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-icon-button icon="add" slot="right" />
      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item title="Rename Folder" />
        <mu-menu-item title="Move Folder" />
        <mu-menu-item title="Delete Folder" />
      </mu-icon-menu>
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
  background: #F5F5F5;
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}
</style>

<script>
import MyNoteList from '@/components/NoteList'

export default {
  components: {
    MyNoteList
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
