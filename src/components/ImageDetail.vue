<template>
  <div class="image-container">
    <div class="image-toolbar">
      <mu-icon-button icon="arrow_back" @click="$router.back()" />
      <mu-icon-button icon="rotate_left" @click="rotateLeft" />
      <mu-icon-button icon="rotate_right" @click="rotateRight" />
      <mu-icon-button icon="crop" v-show="isHandyNoteProtocol && dragMode!=='crop'" @click="enterCrop" />
      <mu-icon-button icon="highlight_off" v-show="dragMode==='crop'" @click="exitCrop" />
      <mu-icon-button icon="save" v-show="isHandyNoteProtocol" @click="showSaveConfirm=true" />
    </div>

    <div class="image-wrapper">
      <img ref="image" :src="imgSrc" @load="start">
    </div>

    <mu-dialog :open="showSaveConfirm" title="Please Confirm">
      Update image? This action can NOT be undone!
      <mu-flat-button slot="actions" @click="showSaveConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="crop" label="Yes"/>
    </mu-dialog>
  </div>
</template>

<style>
.image-toolbar .material-icons {
  color: #7E57C2;
}
</style>

<style scoped>
.image-toolbar {
  position: absolute;
  top: 0px;
  z-index: 8888;
}

.image-wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.image-wrapper > img {
  height: 100vh;
  width: 100vw;
}
</style>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import Model from '@/models'

export default {
  props: ['imgSrc'],

  data () {
    return {
      showSaveConfirm: false,
      cropper: null,
      dragMode: 'move',
      cropBoxData: null
    }
  },

  computed: {
    isHandyNoteProtocol () {
      return this.imgSrc.indexOf('/api/images/') >= 0 && this.imgSrc.indexOf('?certId') >= 0
    },

    getImgId () {
      let startIndex = this.imgSrc.indexOf('/api/images/') + 12
      let endIndex = this.imgSrc.indexOf('?certId')
      return this.imgSrc.substring(startIndex, endIndex)
    }
  },

  watch: {
    imgSrc: 'changeSrc'
  },

  mounted () {
  },

  methods: {
    changeSrc () {
      this.stop()
    },

    start () {
      if (this.cropper !== null) this.cropper.destroy()

      this.cropper = new Cropper(this.$refs.image, {
        autoCrop: false,
        dragMode: this.dragMode
      })
    },

    stop () {
      this.dragMode = 'move'
      if (this.cropper !== null) this.cropper.destroy()
    },

    rotateLeft () {
      this.cropper.rotate(-90)
    },

    rotateRight () {
      this.cropper.rotate(90)
    },

    enterCrop () {
      this.dragMode = 'crop'
      this.cropper.setDragMode(this.dragMode)
    },

    exitCrop () {
      this.cropper.clear()
      this.dragMode = 'move'
      this.cropper.setDragMode(this.dragMode)
    },

    crop () {
      let self = this
      self.cropBoxData = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
      Model.updateImage(self.getImgId, {
        data: self.cropBoxData
      })
        .then(function (response) {
          self.stop()
          self.$router.back()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
