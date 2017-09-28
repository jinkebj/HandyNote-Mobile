<template>
  <div>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list>
      <mu-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
        <div @click="$router.push('/notes/' + listItem._id)">
          <div class="list-item-name">{{listItem.name | truncate(35)}}</div>
          <div class="list-item-digest">{{listItem.digest | truncate(70)}}</div>
          <div class="list-item-info">{{listItem.updated_at | fmtDate}} {{listItem.folder_name}}</div>
        </div>

        <mu-icon-menu slot="right" icon="more_vert">
          <mu-menu-item title="Move To" />
          <mu-menu-item title="Delete" @click="selectNote(listItem._id)" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>

    <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />

    <mu-dialog :open="showDeleteConfirm" title="Please Confirm">
      Move this note to trash?
      <mu-flat-button slot="actions" @click="showDeleteConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="deleteNote" label="Yes"/>
    </mu-dialog>
  </div>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}

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
      loadingFlag: true,
      showDeleteConfirm: false,
      selectedNoteId: '',
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
          self.loadingFlag = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    selectNote (id) {
      this.showDeleteConfirm = true
      this.selectedNoteId = id
    },

    deleteNote () {
      const self = this
      Model.deleteNote(self.selectedNoteId)
        .then(function (response) {
          self.showDeleteConfirm = false
          self.refresh()
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
