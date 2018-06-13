<template>
  <div>
    <mu-appbar title="Handy Note">
      <mu-icon-button icon="search" slot="right" @click="$router.push({path: '/search'})" />
      <mu-icon-button icon="sync" slot="right" @click="syncData" />
    </mu-appbar>
    <mu-popup position="top" popupClass="popup-top" :open="syncFlag">
      Sync with server ...
    </mu-popup>
  </div>
</template>

<style>
.popup-top {
  font-size: 16px;
  width: 100vw;
  color: #FFFFFF;
  background: #2196F3;
  height: 56px;
  line-height: 56px;
  display: flex;
  justify-content: center;
}
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
      Model.sync().then(response => {
        this.$bus.$emit('syncFinished')
        this.syncFlag = false
      })
    }
  }
}
</script>
