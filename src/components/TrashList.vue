<template>
  <div class="page">
    <mu-appbar title="Trash">
      <mu-icon-button icon="arrow_back" slot="left" @click="$router.back()" />
      <mu-icon-menu slot="right" icon="more_vert" v-show="listItems.length > 0">
        <mu-menu-item title="Empty Trash" @click="showEmptyTrashConfirm=true" />
        <mu-menu-item title="Restore All" @click="showRevertTrashConfirm=true" />
      </mu-icon-menu>
    </mu-appbar>

    <div class="page-content">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

      <mu-list>
        <mu-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
          <mu-avatar icon="folder" backgroundColor="blue" slot="leftAvatar" v-if="listItem.folder_name === undefined" />
          <mu-avatar icon="assignment" slot="leftAvatar" v-if="listItem.folder_name !== undefined" />
          <div>
            <div class="list-item-name">{{listItem.name | truncate(35)}}</div>
            <div class="list-item-digest">{{listItem.digest | truncate(70)}}</div>
            <div class="list-item-info">{{listItem.updated_at | fmtDate}} {{listItem.folder_name}}</div>
          </div>

          <mu-icon-menu slot="right" icon="more_vert">
            <mu-menu-item title="Restore" @click="restoreItem(listItem._id)" />
            <mu-menu-item title="Delete" @click="selectItem(listItem)" />
          </mu-icon-menu>
        </mu-list-item>
      </mu-list>

      <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />

      <mu-popup position="top" popupClass="popup-top" :open="popupFlag">
        {{popupHint}}
      </mu-popup>

      <mu-dialog :open="showEmptyTrashConfirm" title="Please Confirm">
        Permanently delete all items in trash? This action can NOT be undone!
        <mu-flat-button slot="actions" @click="showEmptyTrashConfirm=false" primary label="No"/>
        <mu-flat-button slot="actions" primary @click="emptyTrash" label="Yes"/>
      </mu-dialog>

      <mu-dialog :open="showRevertTrashConfirm" title="Please Confirm">
        Restore all items in trash?
        <mu-flat-button slot="actions" @click="showRevertTrashConfirm=false" primary label="No"/>
        <mu-flat-button slot="actions" primary @click="revertTrash" label="Yes"/>
      </mu-dialog>

      <mu-dialog :open="showDeleteConfirm" title="Please Confirm">
        Permanently delete this item? This action can NOT be undone!
        <mu-flat-button slot="actions" @click="showDeleteConfirm=false" primary label="No"/>
        <mu-flat-button slot="actions" primary @click="deleteItem" label="Yes"/>
      </mu-dialog>
    </div>
  </div>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
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
      selectedItem: {},
      refreshing: false,
      trigger: null,
      listItems: [],
      popupFlag: false,
      popupHint: '',
      showEmptyTrashConfirm: false,
      showRevertTrashConfirm: false
    }
  },

  watch: {
    popupFlag (val) {
      if (val) {
        setTimeout(() => {
          this.popupFlag = false
        }, 2000)
      }
    }
  },

  mounted () {
    this.loadTrashList()
    this.trigger = this.$el
  },

  methods: {
    loadTrashList () {
      const self = this
      self.loadingFlag = true

      Model.getTrash()
        .then(function (response) {
          self.listItems = response.data
          self.loadingFlag = false
          self.refreshing = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    selectItem (item) {
      this.showDeleteConfirm = true
      this.selectedItem = item
    },

    deleteItem () {
      const self = this
      Model.deleteTrash(self.selectedItem._id)
        .then(function (response) {
          self.showDeleteConfirm = false
          self.refresh()
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    restoreItem (itemId) {
      const self = this
      self.loadingFlag = true

      Model.restoreTrash(itemId)
        .then(function (response) {
          self.refresh()
          self.loadingFlag = false
          self.popupHint = 'Restore selected item successfully!'
          self.popupFlag = true
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    refresh () {
      this.refreshing = true
      this.loadTrashList()
    },

    emptyTrash () {
      const self = this
      Model.emptyTrash()
        .then(function (response) {
          self.popupHint = 'Empty trash successfully!'
          self.popupFlag = true
          self.showEmptyTrashConfirm = false
          self.refresh()
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    revertTrash () {
      const self = this
      self.loadingFlag = true

      Model.revertTrash()
        .then(function (response) {
          self.showRevertTrashConfirm = false
          self.refresh()
          self.loadingFlag = false
          self.popupHint = 'Restore trash successfully!'
          self.popupFlag = true
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
