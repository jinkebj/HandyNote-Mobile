<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <div>
        {{loginUser}}
        <mu-raised-button label="Logout" primary @click="logout" />
      </div>
    </div>

    <my-footer></my-footer>
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
