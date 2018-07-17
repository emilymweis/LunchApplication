<template>
  <div id="headerStyle">
    <nav class="appNav">
        <router-link to="/home" exact>
            <img id="chiLogo" src="../assets/chi_logo-trans.png" alt="Lunch App" />
        </router-link>
        <router-link class="navText navLeft" to="/home" exact>
            <div>Lunchable</div>
        </router-link>
          <router-link class="navText navRight" to="/login">
              <div v-if="isAuthenticated">LOGOUT</div><div v-else>LOGIN</div>
          </router-link>
    </nav>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'appHeader-comp',
    computed: {
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
<style lang="scss">
  @import "../styles/_main.scss";
#headerStyle{

  .appNav{
    min-height: 50px;
    max-height: 60px;
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 50;

    background-color: white;
    box-shadow: 0 3px 4px silver;

    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .navRight{
    margin-left: auto;
    margin-right: 20px;
  }
  .navLeft{
    margin-right: 10px;
    margin-left: 120px;
  }
  .navText{
    height: 35px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0px;
    margin-top: 10px;
    color: rgba(0,0,0,.5);
    text-decoration: none;
  }
  #chiLogo{
    width: 80px;
    height: 80px;
    margin-left: 25px;
    margin-top: -20px;
    position: absolute;
  }

}

  </style>
