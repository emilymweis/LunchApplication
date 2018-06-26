<template>
  <nav class="nav has-shadow">
    <div class="container">
      <router-link to="/Home" exact>
        <!-- TODO <img src="../assets/chi_logo-trans.png" -->
          <!-- alt="Lunch App" /> -->
      </router-link>
      <router-link class="nav-item is-tab"
        to="/Home">Home</router-link>
    </div>
    <router-link class="nav-item is-tab justify-content-end" to="/login">
        <span v-if="isAuthenticated">Logout</span><span v-else>Login</span>
    </router-link>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
