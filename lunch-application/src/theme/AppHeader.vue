<template>
  <nav class="nav has-shadow">
    <div class="container">
      <router-link to="/category/front-end" exact>
        <img src="http://bit.ly/vue-img"
          alt="Lunch App" />
      </router-link>

      <router-link class="nav-item is-tab"
        to="/category/front-end">Home</router-link>
      <router-link class="nav-item is-tab"
        to="/lunchInfo">Lunch Info</router-link>
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
