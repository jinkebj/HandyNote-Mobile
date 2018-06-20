<template>
  <div class="page">
    <mu-appbar :title="noteItem.name">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-icon-button :icon="noteItem.starred === 1 ? 'star' : 'star_border'" slot="right"
        v-show="!loadingFlag" @click="toggleNoteStar" />
      <mu-icon-button icon="clear" slot="right" v-show="editMode" @click="preCancelUpdate" />
      <mu-icon-button icon="done" slot="right" v-show="editMode" @click="updateNote" />
      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item title="Move To" v-show="!editMode"
          @click="$router.push({path: '/folder-select', query: {srcType: 'note', srcId: id}})"/>
        <mu-menu-item title="Delete" @click="showDeleteConfirm=true" />
      </mu-icon-menu>
    </mu-appbar>

    <div class="page-content">
      <mu-text-field class="note-item-name" multiLine :underlineShow="false" :disabled="!editMode" v-model="noteItem.name"/>
      <div class="note-folder-info">
        <mu-icon value="folder_open" color="blue" v-show="!loadingFlag" />
        <div class="note-folder-info-text">{{noteItem.folder_name}}</div>
      </div>

      <mu-float-button icon="edit" class="note-float-button" v-show="!editMode" @click="toggleeditMode" />

      <div id="note-toolbar" v-show="editMode">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>

        <select class="ql-color"></select>
        <select class="ql-background"></select>

        <select class="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option selected></option>
        </select>
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>

        <select class="ql-align"></select>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>

        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-clean"></button>
        <button class="ql-link"></button>
        <button class="ql-image"></button>
      </div>

      <div id="note-editor"></div>
    </div>

    <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />

    <mu-dialog :open="showDeleteConfirm" title="Please Confirm">
      Move this note to trash?
      <mu-flat-button slot="actions" @click="showDeleteConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="deleteNote" label="Yes"/>
    </mu-dialog>

    <mu-dialog :open="showCancelConfirm" title="Please Confirm">
      Discard current change?
      <mu-flat-button slot="actions" @click="showCancelConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="cancelUpdateNote" label="Yes"/>
    </mu-dialog>
  </div>
</template>

<style>
.page .ql-snow .ql-editor pre.ql-syntax { /* to avoid black background of code block*/
  background-color: rgb(240, 240, 240);
  color: #171313;
}

.page-content .mu-text-field-content {
  padding: 15px 0 0 0;
}
</style>

<style scoped>
.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}

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

.note-item-name {
  border: none;
  outline: none;
  width: 100vw;
  padding: 0 15px;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.note-folder-info {
  padding-left: 15px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.note-folder-info-text {
  padding-left: 8px;
  color: #2196F3;
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

#note-editor {
  background: #FFFFFF;
  border: 0;
  font-size: 16px;
  min-height: calc(100vh - 145px);
}
</style>

<script>
import {HANDYNOTE_PROTOCOL, getResizedImgData, loadContentWithDelta} from '@/util'
import Model from '@/models'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { ImageHandler } from '@/quill_modules/ImageHandler'
import '@/quill_modules/quill.table.css'
import TableHandler from '@/quill_modules/TableHandler'

export default {
  props: ['id'],

  data () {
    return {
      loadingFlag: true,
      showDeleteConfirm: false,
      showCancelConfirm: false,
      editMode: false,
      quill: {},
      noteItem: {name: ''},
      originNoteName: ''
    }
  },

  mounted () {
    Quill.register('modules/imageHandler', ImageHandler)
    Quill.register('modules/tableHandler', TableHandler)

    this.quill = new Quill('#note-editor', {
      readOnly: true,
      modules: {
        toolbar: '#note-toolbar',
        clipboard: {
          matchers: [
            ['TD, TH', function (node, delta) {
              delta.insert('\n', { td: true })
              delta.insert({ tdbr: true })
              return delta
            }],
            ['TR', function (node, delta) {
              delta.insert({ trbr: true })
              return delta
            }]
          ]
        },
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
        imageHandler: {
          eventBus: this.$bus
        }
      },
      theme: 'snow'
    })

    this.loadNote()

    this.$bus.$on('showImgDetail', (url) => {
      this.$router.push({path: '/image-detail', query: {imgSrc: url}})
    })
  },

  methods: {
    loadNote () {
      const self = this
      Model.getNote(self.id)
        .then(function (response) {
          self.loadingFlag = false
          self.originNoteName = response.data.name
          self.noteItem = response.data

          let contentsJson = (typeof response.data.contents === 'object' ? response.data.contents
            : JSON.parse(response.data.contents))
          // self.quill.setContents(self.handleImgUrl(contentsJson))
          loadContentWithDelta(self.quill, self.handleImgUrl(contentsJson))

          // go to edit mode if the note is newly created
          if (self.editMode === false && contentsJson.length === 0 && response.data.deleted === 0) {
            self.toggleeditMode()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    handleImgUrl (contentsJson) {
      for (let i = 0; i < contentsJson.length; i++) {
        let op = contentsJson[i]
        if (op.insert !== undefined &&
          typeof op.insert === 'object' &&
          op.insert.image !== undefined &&
          typeof op.insert.image === 'string' &&
          op.insert.image.startsWith(HANDYNOTE_PROTOCOL)) {
          op.insert.image = op.insert.image.replace(HANDYNOTE_PROTOCOL, '')
          op.insert.image = Model.getStaticUrl() + '/' + op.insert.image +
            '?certId=' + window.localStorage.getItem('hn-token') +
            // to force browser reload image when note got updated
            '&time=' + this.noteItem.updated_at
        }
      }
      return contentsJson
    },

    async handleImgResize (contentsJson) {
      let retJson = []
      for (let i = 0; i < contentsJson.length; i++) {
        let op = contentsJson[i]
        if (op.insert !== undefined &&
          typeof op.insert === 'object' &&
          op.insert.image !== undefined &&
          typeof op.insert.image === 'string') {
          if (op.insert.image.startsWith('data:image')) {
            retJson.push({insert: {image: await getResizedImgData(op.insert.image)}})
          } else if (op.insert.image.startsWith(Model.getStaticUrl() + '/')) {
            let newImgUrl = op.insert.image.replace(Model.getStaticUrl() + '/', '')
            let endIndex = newImgUrl.indexOf('?certId')
            if (endIndex > 0) newImgUrl = newImgUrl.substring(0, endIndex)
            retJson.push({insert: {image: HANDYNOTE_PROTOCOL + newImgUrl}})
          } else {
            retJson.push(op)
          }
        } else {
          retJson.push(op)
        }
      }
      return retJson
    },

    async updateNote () {
      const self = this
      self.loadingFlag = true
      let contentsJson = await this.handleImgResize(this.quill.getContents().ops)

      Model.updateNote(self.id, {
        name: this.noteItem.name,
        text: this.quill.getText(),
        contents: contentsJson
      })
        .then(function (response) {
          let contentsJson = (typeof response.data.contents === 'object' ? response.data.contents
            : JSON.parse(response.data.contents))
          // self.quill.setContents(self.handleImgUrl(contentsJson))
          loadContentWithDelta(self.quill, self.handleImgUrl(contentsJson))
          self.loadingFlag = false
          self.noteItem = response.data
          self.toggleeditMode()
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    toggleNoteStar () {
      const self = this
      let starValue = (self.noteItem.starred === 1 ? 0 : 1)
      Model.updateNote(self.id, {
        starred: starValue
      })
        .then(function (response) {
          self.noteItem.starred = starValue
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    preCancelUpdate () {
      if (this.originNoteName !== this.noteItem.name ||
        JSON.stringify(this.quill.getContents().ops) !== this.noteItem.contents) {
        this.showCancelConfirm = true
      } else {
        this.toggleeditMode()
      }
    },

    cancelUpdateNote () {
      const self = this
      self.showCancelConfirm = false
      self.noteItem.name = self.originNoteName
      let contentsJson = (typeof self.noteItem.contents === 'object' ? self.noteItem.contents
        : JSON.parse(self.noteItem.contents))
      // self.quill.setContents(self.handleImgUrl(contentsJson))
      loadContentWithDelta(self.quill, self.handleImgUrl(contentsJson))
      self.toggleeditMode()
    },

    deleteNote () {
      const self = this
      Model.deleteNote(self.id)
        .then(function (response) {
          self.showDeleteConfirm = false
          self.$router.back()
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    toggleeditMode () {
      this.editMode = !this.editMode
      this.quill.enable(this.editMode)
      if (this.editMode === true) this.quill.focus()
    }
  }
}
</script>
