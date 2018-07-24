<template>
<div id="login">
  <div class="card">
    <div class="login">
      <div class="card-main" v-if="authStatus">
        Hello authenticated user!
        <button v-on:click="logout()" class="button loginButton">
          Logout
        </button>
      </div>
      <div v-else>
        <h2 class="card-header" >Login</h2>
        <div class="card-main">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="field">
              <div class="control">
                <input v-model="username" id="loginUserInput" class="input" type="text"
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
                <input v-model="password" id="loginPassInput" class="input" type="password"
                placeholder="Your password">
              </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
              <div class="control">
                <button v-if="authStatus" v-on:click="logout()" class="button loginButton">
                Logout
                </button>
                <button v-on:click="login()" class="button loginButton">
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
</div>
</template>
<script>
  import loginService from '../app.service.js'
  import axios from 'axios'

  const baseUrl = axios.defaults.baseURL

  export default {
    data () {
      return {
        userData: [],
        errors: [],
        username: '',
        password: ''
      }
    },
    created () {
      axios.get(baseUrl + '/userData')
        .then(response => {
          this.userData = response.data
          return this.userData
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    computed: {
      authStatus () {
        return loginService.authStatus()
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', {Username: this.username, PasswordHash: this.password})
      },
      logout: function () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
<style lang="scss">
#login{
  display: flex;
  justify-content: center;
  margin-top: 50px;

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
  .button{
      background-color: #008CBA;
      border-radius: 4px;
      border: none;
      padding: 10px;
      color: white;
      text-transform: uppercase;
      margin-top: 10px;
  }
  .button:hover{
    background-color: rgb(1, 110, 146);
  }
  input[id=loginUserInput] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[id=loginPassInput] {
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
