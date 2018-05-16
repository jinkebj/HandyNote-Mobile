<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <mu-list-item disabled class="login-info">
        <div slot="title" class="login-user">{{loginUser}}</div>
        <mu-avatar slot="left" icon="person" />
      </mu-list-item>

      <mu-raised-button label="Logout" primary @click="logout" />
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
  background: #F5F5F5;
  flex: 1 1 auto;
  padding: 30px;

  display: flex;
  flex-direction: column;
}

.login-info {
  padding-bottom: 30px;
}

.login-user {
  font-size: 18px;
  color: #324057;
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
      this.$router.replace('/login')
    }
  }
}
</script>
