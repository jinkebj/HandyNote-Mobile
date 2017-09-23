<template>
  <md-list class="md-triple-line">
    <md-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
      <div class="md-list-text-container">
        <span class="list-item-name">{{listItem.name | truncate(50)}}</span>
        <p>{{listItem.digest | truncate(100)}}</p>
        <p>{{listItem.updated_at | fmtDate}} {{listItem.folder_name}}</p>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-list-item>
  </md-list>
</template>

<style scoped>
.list-item-name {
  font-size: 18px;
  font-weight:bold;
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
