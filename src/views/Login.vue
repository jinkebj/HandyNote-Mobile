<template>
  <div>
    <mu-appbar title="Handy Note">
      <mu-icon-button icon="menu" slot="left" />
    </mu-appbar>

    <div class="login-box">
      <mu-text-field label="User Name" labelFloat fullWidth v-model="usr" />
      <mu-text-field label="Password" type="password" labelFloat fullWidth v-model="pwd" />
      <mu-raised-button label="Login" primary @click="doLogin" />
      <span class="login-err" v-show="errFlag">Invalid user name or password, login failed!</span>
    </div>
  </div>
</template>

<style scoped>
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
      errFlag: false
    }
  },

  methods: {
    doLogin () {
      const self = this

      Model.login({
        usr: this.usr,
        pwd: this.pwd
      })
        .then(function (response) {
          if (response.status === 200) {
            window.localStorage.setItem('hn-token', response.data._id)
            window.localStorage.setItem('hn-user', response.data.user_id)
            self.$router.replace('/recents')
          } else {
            window.localStorage.removeItem('hn-token')
            window.localStorage.removeItem('hn-user')
            self.errFlag = true
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
