<template>
  <md-list>
    <md-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
      <div class="has-ripple">
        <md-ink-ripple />
        <div class="list-item-name">{{listItem.name | truncate(35)}}</div>
        <div class="list-item-digest">{{listItem.digest | truncate(70)}}</div>
        <div class="list-item-info">{{listItem.updated_at | fmtDate}} {{listItem.folder_name}}</div>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-list-item>
  </md-list>
</template>

<style scoped>
.has-ripple {
  display: inline-block;
  position: relative;
}

.list-item-name {
  padding: 15px 0 10px 0;
  font-size: 16px;
  font-weight:bold;
}

.list-item-digest {
  color: #475669;
  font-size: 14px;
}

.list-item-info {
  color: #8492A6;
  font-size: 12px;
  padding: 10px 0 10px 0;
}

.list-item-divider {
  border-bottom: 1px solid #ddd;
}
</style>

<script>
import Model from '@/models'

export default {
  data () {
    return {
      listItems: []
    }
  },

  mounted () {
    this.loadNoteList()
  },

  methods: {
    loadNoteList (params) {
      const self = this
      Model.getNoteList(params)
        .then(function (response) {
          self.listItems = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
