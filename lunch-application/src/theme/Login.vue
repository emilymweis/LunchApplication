<template>
<div class="content">
  <div class="login-content" v-if="isAuthenticated">
    Hello authenticated user!
    <button v-on:click="logout()" class="button is-info">
      Logout
    </button>
  </div>
  <div class="login-content" v-else>
    <h2 class="header-label">Login</h2>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username</label>
      </div>
      <div class="field-body">
        <div class="field">
        <div class="control">
          <input v-model="username" class="input" type="text"
          placeholder="Your username">
        </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password</label>
      </div>
      <br>
      <div class="field-body">
        <div class="field">
        <div class="control">
          <input v-model="password" class="input" type="password"
          placeholder="Your password">
        </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
        <div class="control">
          <button id="login" v-on:click="login()" class="button is-info">
          Login
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      ...mapActions({
        logout: 'logout'
      }),
      login () {
        this.$store.dispatch('login', {username: this.username, password: this.password})
          .then(() => {
            this.username = ''
            this.password = ''
          })
      }
    }
  }
</script>
<style lang="scss">
  .header-label{
    margin-left: 30px;
    padding-top: 20px;
  }
  .control{
    margin-right: 30px;
  }
  #login{
    margin-bottom: 20px;
  }
  .login-content{
    background-color: white;
  }
</style>
