<template>
  <div class="image-container">
    <!-- <mu-appbar>
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />

      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item title="Rotate" @click="rotateRight" />
        <mu-menu-item title="Corp" @click="enterCrop" />
      </mu-icon-menu>
    </mu-appbar> -->

    <div class="image-wrapper">
      <img ref="image" :src="imgSrc" @load="start">
    </div>
  </div>
</template>

<style>
/*.image-container .mu-appbar {
  background-color: rgba(33, 150, 243, 0.2)
}*/
</style>

<style scoped>
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
      cropper: null,
      editMode: false,
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
      this.editMode = true
      if (this.cropper !== null) this.cropper.destroy()

      this.cropper = new Cropper(this.$refs.image, {
        autoCrop: false,
        dragMode: this.dragMode
      })
    },

    stop () {
      this.editMode = false
      this.dragMode = 'move'
      if (this.cropper !== null) this.cropper.destroy()
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
      self.$confirm('Update image? This action can NOT be undone!', 'Please Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        self.cropBoxData = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
        Model.updateImage(self.getImgId, {
          data: self.cropBoxData
        })
          .then(function (response) {
            self.stop()
            self.$emit('updateImage')
            self.$message({
              message: 'Image update successfully!',
              type: 'success'
            })
          })
          .catch(function (error) {
            console.log(error)
            self.$message.error('Image update failed!')
          })
      })
    }
  }
}
</script>
