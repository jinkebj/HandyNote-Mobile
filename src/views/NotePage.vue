<template>
  <div class="page">
    <mu-appbar title="Title">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-icon-button icon="clear" slot="right" />
      <mu-icon-button icon="done" slot="right" />
      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item title="Move To" />
        <mu-menu-item title="Delete" />
      </mu-icon-menu>
    </mu-appbar>

    <div class="page-content">
      <my-note></my-note>
    </div>
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
import MyNote from '@/components/NoteDetail'

export default {
  components: {
    MyHeader,
    MyNote
  }
}
</script>
