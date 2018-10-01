<template>
  <div class="page">
    <my-header></my-header>

    <div class="page-content">
      <mu-list class="list-bg">
        <mu-list-item :title="loginUser" describeText="Logged in">
          <mu-avatar slot="left" icon="person" />
        </mu-list-item>
      </mu-list>

      <mu-divider />

      <mu-list class="list-bg">
        <mu-sub-header>Settings</mu-sub-header>
        <mu-list-item title="Language" describeText="english" />
        <mu-list-item title="Auto sync">
          <mu-switch slot="right"/>
        </mu-list-item>
      </mu-list>

      <mu-raised-button primary class="logout-button" label="Logout" @click="logout" />
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
  position: relative; /* need this to position inner content */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
}

.list-bg {
  background: #FFFFFF;
}

.logout-button {
  width: 80%;
  align-self: center;
  margin: 20px 0;
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
