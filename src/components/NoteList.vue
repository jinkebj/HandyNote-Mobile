<template>
  <div class="infinite-container">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list>
      <mu-list-item class="list-item-divider" v-for="listItem in listItems" :key="listItem._id">
        <div @click="$router.push('/notes/' + listItem._id)">
          <div class="list-item-name">{{listItem.name | truncate(35)}}</div>
          <div class="list-item-digest">{{listItem.digest | truncate(70)}}</div>
          <div class="list-item-info">
            <div class="list-item-star-icon" v-show="listItem.starred === 1">
              <mu-icon value="star" color="orange" :size="20" />
            </div>
            {{listItem.updated_at | fmtDate}} {{listItem.folder_name}}
          </div>
        </div>

        <mu-icon-menu slot="right" icon="more_vert">
          <mu-menu-item :title="listItem.starred === 1 ? 'Unstar' : 'Star'" @click="toggleNoteStar(listItem)" />
          <mu-menu-item title="Move To"
            @click="$router.push({path: '/folder-select', query: {srcType: 'note', srcId: listItem._id}})" />
          <mu-menu-item title="Delete" @click="selectNote(listItem._id)" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>

    <mu-infinite-scroll :scroller="scroller" :loading="loadMoreFlag" loadingText="" @load="loadMore"/>

    <mu-dialog :open="showDeleteConfirm" title="Please Confirm">
      Move this note to trash?
      <mu-flat-button slot="actions" @click="showDeleteConfirm=false" primary label="No"/>
      <mu-flat-button slot="actions" primary @click="deleteNote" label="Yes"/>
    </mu-dialog>
  </div>
</template>

<style scoped>
.infinite-container {
  height: calc(100vh - 66px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

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

  display: flex;
  align-items: center;
}

.list-item-star-icon {
  padding-right: 5px;
  height: 20px;
}

.list-item-divider {
  border-bottom: 1px solid #ddd;
}
</style>

<script>
import {getCurUsrStarFolderId} from '@/util'
import Model from '@/models'

export default {
  props: {
    folderId: String
  },

  data () {
    return {
      limit: 5,
      skip: 0,
      loadMoreFlag: false,
      showDeleteConfirm: false,
      selectedNoteId: '',
      refreshing: false,
      trigger: null,
      scroller: null,
      listItems: []
    }
  },

  mounted () {
    this.loadNoteList(0)
    this.trigger = this.$el
    this.scroller = this.$el

    this.$bus.$on('syncFinished', () => {
      this.refresh()
    })
  },

  methods: {
    loadNoteList (skip) {
      const self = this
      let params = {skip: skip, limit: self.limit}

      if (self.folderId === getCurUsrStarFolderId()) {
        params.starred = 1
      } else {
        params.folder_id = self.folderId
      }
      Model.getNoteList(params)
        .then(function (response) {
          if (skip === 0) {
            self.listItems = response.data
          } else {
            self.listItems.push(...response.data)
          }
          self.skip = self.listItems.length
          self.loadMoreFlag = false
          self.refreshing = false
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

    toggleNoteStar (noteItem) {
      let starValue = (noteItem.starred === 1 ? 0 : 1)
      Model.updateNote(noteItem._id, {
        starred: starValue
      })
        .then(function (response) {
          noteItem.starred = starValue
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    refresh () {
      this.refreshing = true
      this.loadNoteList(0)
    },

    loadMore () {
      this.loadMoreFlag = true
      this.loadNoteList(this.skip)
    }
  }
}
</script>
