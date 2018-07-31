<template>
<div id="create">
  <div class="card">
    <div class="create">
      <h2 class="card-header" >Create an Account</h2>
      <div class="card-main">
        <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email (this will be your username)</label>
            </div>
            <div class="field-body">
              <div class="field">
              <div class="control">
                <input v-model="email" id="createUserInput" class="input" type="text"
                placeholder="example@email.com">
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
                <input v-model="password" id="createPassInput" class="input" type="password"
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
                <button v-on:click="save()" class="button">
                Save
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
  export default {
    data () {
      return {
        userData: [],
        errors: [],
        email: '',
        password: ''
      }
    },
    methods: {
      save: function () {
        this.$store.dispatch('save', {Username: this.email, PasswordHash: this.password})
      }
    }
  }
</script>
<style lang="scss">
#create{
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .create{
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
  input[id=createUserInput] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[id=createPassInput] {
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
