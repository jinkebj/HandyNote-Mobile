<template>
  <div>
    <mu-appbar title="Handy Note">
    </mu-appbar>

    <div class="login-box">
      <mu-text-field label="User Name" labelFloat fullWidth v-model="usr" />
      <mu-text-field label="Password" type="password" labelFloat fullWidth v-model="pwd" />
      <mu-raised-button label="Login" primary :disabled="loadingFlag" @click="doLogin" />
      <span class="login-err" v-show="errFlag">Invalid user name or password, login failed!</span>
    </div>

    <mu-circular-progress class="loading-indicator" :size="40" v-show="loadingFlag" />
  </div>
</template>

<style scoped>
.loading-indicator {
  position: fixed;
  top: calc(100vh / 2 - 20px);
  left: calc(100vw / 2 - 20px);
}

.login-box {
  margin: 30px;
  display: flex;
  flex-flow: column;
}

.login-err {
  color: red;
  text-align: center;
  padding-top: 15px;
}
</style>

<script>
import Model from '@/models'

export default {
  data () {
    return {
      usr: '',
      pwd: '',
      errFlag: false,
      loadingFlag: false
    }
  },

  methods: {
    doLogin () {
      const self = this
      self.loadingFlag = true

      Model.login({
        usr: this.usr,
        pwd: this.pwd
      })
        .then(async function (response) {
          if (response.status === 200) {
            window.localStorage.setItem('hn-token', response.data._id)

            // switch user, clear local storage
            if (window.localStorage.getItem('hn-user') !== response.data.user_id) {
              window.localStorage.setItem('hn-user', response.data.user_id)
              await Model.clearLocalData()
            }

            // execute delta sync
            await Model.sync()
            self.$bus.$emit('syncFinished')
            self.loadingFlag = false

            self.$router.replace('/recents')
          } else {
            self.errFlag = true
            self.loadingFlag = false
          }
        })
        .catch(function (error) {
          console.log(error)
          self.errFlag = true
        })
    }
  }
}
</script>
