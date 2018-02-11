<template>
  <mu-appbar title="Handy Note">
    <mu-icon-button icon="search" slot="right"/>
    <mu-icon-button icon="sync" slot="right" @click="syncData" />
  </mu-appbar>
</template>

<style scoped>
</style>

<script>
import Model from '@/models'

export default {
  data () {
    return {
      loadingFlag: true
    }
  },

  methods: {
    syncData () {
      const self = this
      self.loadingFlag = true
      Model.sync()
      self.loadingFlag = false
    }
  }
}
</script>
