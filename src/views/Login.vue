<template>
  <div>
    <md-whiteframe md-elevation="3">
      <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>

        <div class="md-title">Handy Note</div>
      </md-toolbar>
    </md-whiteframe>

    <div class="login-box">
      <md-input-container>
        <label>User Name</label>
        <md-input v-model="usr"></md-input>
      </md-input-container>

      <md-input-container md-has-password>
        <label>Password</label>
        <md-input type="password" v-model="pwd"></md-input>
      </md-input-container>

      <md-button class="md-raised md-primary" @click="doLogin">Login</md-button>

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
