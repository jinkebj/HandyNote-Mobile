<template>
  <div>
    <mu-appbar title="Handy Note">
      <mu-icon-button icon="search" slot="right"/>
      <mu-icon-button icon="sync" slot="right" @click="syncData" />
    </mu-appbar>
    <mu-popup position="top" popupClass="popup-top" :open="syncFlag">
      Sync with server ...
    </mu-popup>
  </div>
</template>

<style scoped>
</style>

<script>
import Model from '@/models'

export default {
  data () {
    return {
      syncFlag: false
    }
  },

  methods: {
    syncData () {
      this.syncFlag = true
      Model.sync().then(response => { this.syncFlag = false })
    }
  }
}
</script>
