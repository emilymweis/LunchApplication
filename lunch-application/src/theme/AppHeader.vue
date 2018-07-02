<template>
  <b-navbar class="navbar" toggleable type="light">
    <b-link class="navbar-brand" to="/home" exact>
      <img id="chiLogo" src="../assets/chi_logo-trans.png"
          alt="Lunch App" />
      <b-navbar-nav>
        <div class="navbar-text">Lunch Application</div>
      </b-navbar-nav>
    </b-link>
    <b-link class="nav-item" to="/login">
      <div v-if="isAuthenticated">LOGOUT</div><div v-else>LOGIN</div>
    </b-link>
  </b-navbar>
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
  #chiLogo{
    width: 80px;
    height: 80px;
  }
  .navbar {
    // override default style to allow for positioning of image
    padding: 0.75rem 0 0.35rem 0;
    position: relative;
    margin-top: 0px;
    height: 50px;

    background-color: $chipotle-white;
    color: $chipotle-dark-brown;
    a {
        color: $chipotle-dark-brown;
    }
  }
  .navbar-brand {
    display: flex;
    width: 250px;
    height: 40px;
    margin-left: 8px;

    div {
        display: flex;

    }

    img {
        width: 80px;
        height: 80px;
        position: absolute;
        margin-top: -11px;
    }

    .navbar-text {
      order: 1;
        margin-left: 90px;
        height: 35px;
        align-items: center;
        padding: 0;
        font-size: 17px;
        font-weight: bold;
        text-transform: uppercase;
        color: #33221b;
    }
  }
  </style>
