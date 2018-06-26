<template>
  <div id="app">
    <toast-container></toast-container>
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  export default {
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
    }
  }
</script>
<style lang="scss">
  $primary: #FF0000;
  @import '~bulma';
  @import '../../node_modules/vue-on-toast/dist/vue-on-toast.styl';
  .columns{
    flex-wrap: wrap
  }
</style>
