<template>
  <div>
    <input type="text" class="note-item-name" :readonly="!canEdit" v-model="noteItem.name">

    <mu-float-button icon="edit" secondary class="note-float-button" v-show="!canEdit" @click="togglecanEdit"/>

    <div id="note-toolbar" v-show="canEdit">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>

      <select class="ql-color"></select>
      <select class="ql-background"></select>
      <select class="ql-align"></select>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>

      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
      <button class="ql-clean"></button>
      <button class="ql-image"></button>
    </div>

    <div id="note-editor"></div>
  </div>
</template>

<style scoped>
.note-item-name {
  border: none;
  outline: none;
  width: 100vw;
  padding: 10px 15px;
  background: #F5F5F5;
  color: #475669;
  font-size: 18px;
}

.note-float-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}

#note-toolbar {
  background: #F5F5F5;
  position: sticky;
  top: 0px;
  z-index: 999;
}
</style>

<script>
import Model from '@/models'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

export default {
  data () {
    return {
      canEdit: false,
      quill: {},
      noteItem: {name: ''}
    }
  },

  mounted () {
    this.quill = new Quill('#note-editor', {
      readOnly: true,
      modules: {
        toolbar: '#note-toolbar'
      },
      theme: 'snow'
    })

    this.loadNote()
  },

  methods: {
    loadNote () {
      const self = this
      Model.getNote(self.$route.params.id)
        .then(function (response) {
          self.noteItem = response.data
          self.quill.setContents(response.data.contents)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    togglecanEdit () {
      this.canEdit = !this.canEdit
      this.quill.enable(this.canEdit)
    }
  }
}
</script>
