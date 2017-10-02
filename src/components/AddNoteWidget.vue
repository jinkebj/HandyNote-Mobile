<template>
  <mu-float-button icon="add" class="note-float-button" @click="addNote" />
</template>

<style scoped>
.note-float-button {
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 999;
}
</style>

<script>
import Model from '@/models'
import {getCurUsrRootFolderId} from '@/util'

export default {
  data () {
    return {
      rootFolderId: getCurUsrRootFolderId()
    }
  },

  methods: {
    addNote () {
      const self = this
      Model.addNote({
        name: 'No Title',
        folder_id: self.rootFolderId
      })
        .then(function (response) {
          self.$router.push('/notes/' + response.data._id)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
