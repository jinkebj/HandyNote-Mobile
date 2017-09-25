<template>
  <mu-list class="note-folder-container">
    <mu-list-item title="My Folders (12 / 30)" toggleNested>
      <mu-icon slot="left" value="home" />

      <mu-list-item slot="nested" title="Added (10 / 23)" titleClass="note-folder-title" toggleNested>
        <mu-list-item title="Drafts (5)" slot="nested" titleClass="note-folder-title">
        </mu-list-item>

        <mu-list-item title="Java (8)" slot="nested" titleClass="note-folder-title">
        </mu-list-item>
      </mu-list-item>

      <mu-list-item slot="nested" title="Added (10 / 23)" titleClass="note-folder-title" toggleNested>
        <mu-list-item title="Drafts (5)" slot="nested" titleClass="note-folder-title">
        </mu-list-item>

        <mu-list-item title="Java (8)" slot="nested" titleClass="note-folder-title">
        </mu-list-item>
      </mu-list-item>

      <mu-list-item slot="nested" title="Updated (2 / 6)" titleClass="note-folder-title" toggleNested>
        <mu-list-item title="Drafts (4)" slot="nested" titleClass="note-folder-title">
        </mu-list-item>
      </mu-list-item>

    </mu-list-item>

    <mu-list-item title="Trash (5)">
      <mu-icon slot="left" value="delete"/>
    </mu-list-item>
  </mu-list>
</template>

<style>
.note-folder-container .mu-item-wrapper {
  border-bottom: 1px solid #ddd;
}

.note-folder-title {
  font-size: 14px;
}
</style>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
