<template>
<div id="login">
  <div class="card">
    <div class="login">
      <div class="card-main" v-if="isAuthenticated">
        Hello authenticated user!
        <button v-on:click="logout()" class="button loginButton">
          Logout
        </button>
      </div>
      <h2 class="card-header"  v-else>Login</h2>
        <div class="card-main">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="field">
              <div class="control">
                <input v-model="username" id="loginInput" class="input" type="text"
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
                <input v-model="password" id="loginInput" class="input" type="password"
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
                <button id="login" v-on:click="login()" class="button is-info loginButton">
                Login
                </button>
              </div>
              </div>
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
#login{
  display: flex;
  justify-content: center;

  .login{
    margin: 20px;
    padding: 20px;
  }
  .card{
    overflow: hidden;
    margin: 10px;
    flex-basis: content;
    align-items: stretch;
    flex-wrap: wrap;
    border: none;
    border-radius: 5px;
    background-color: white;
  }
  .card-header {
    text-align: left;
    font-size: 30px;
    box-shadow: none;
  }
  .card-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
  .control{
    margin-right: 30px;
  }
  .loginButton{
    margin-top: 10px;
  }
  .button{
      background-color: #008CBA;
      border-radius: 4px;
      border: none;
      padding: 10px;
      color: white;
      text-transform: uppercase;
  }
  .button:hover{
    background-color: rgb(1, 110, 146);
  }
  input[id=loginInput] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .label{
    font-size: 15px;
  }
}
</style>
