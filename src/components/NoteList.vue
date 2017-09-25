<template>
  <div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <mu-list>
      <mu-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
        <div>
          <div class="list-item-name">{{listItem.name | truncate(35)}}</div>
          <div class="list-item-digest">{{listItem.digest | truncate(70)}}</div>
          <div class="list-item-info">{{listItem.updated_at | fmtDate}} {{listItem.folder_name}}</div>
        </div>

        <mu-icon-menu slot="right" icon="more_vert">
          <mu-menu-item title="Move To" />
          <mu-menu-item title="Delete" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<style scoped>
.list-item-name {
  padding: 0 0 10px 0;
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
  padding: 10px 0 0 0;
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
      refreshing: false,
      trigger: null,
      listItems: []
    }
  },

  mounted () {
    this.loadNoteList()
    this.trigger = this.$el
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
    },

    refresh () {
      this.refreshing = true
      setTimeout(() => {
        this.loadNoteList()
        this.refreshing = false
      }, 1000)
    }
  }
}
</script>
