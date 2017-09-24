<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <div>
        {{loginUser}}
        <md-button class="md-raised md-primary" @click="logout">Logout</md-button>
      </div>
    </div>

    <my-footer class="page-footer"></my-footer>
  </div>
</template>

<style scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
}

.page-footer {
  flex: 0 0 auto;
}
</style>

<script>
import {getCurUsrId} from '@/util'
import MyHeader from '@/components/TopBar'
import MyFooter from '@/components/BottomBar'

export default {
  components: {
    MyHeader,
    MyFooter
  },

  data () {
    return {
      loginUser: getCurUsrId()
    }
  },

  methods: {
    logout () {
      window.localStorage.removeItem('hn-token')
      window.localStorage.removeItem('hn-user')
      this.$router.replace('/login')
    }
  }
}
</script>
