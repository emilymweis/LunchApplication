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
  @import '~bulma';
  @import '../../node_modules/vue-on-toast/dist/vue-on-toast.styl';
  @import "../styles/_main.scss";

  .columns{
    flex-wrap: wrap
  }
  body {
  background-color: #e7dcc8;
  color: $chipotle-black;
  font-size: 14px;
}

footer {
  text-align: center;
}

.heading,
h1,
h2,
h3,
h4,
h5,
h6 {
  text-transform: uppercase;
  font-weight: bold;
  color: $heading-black;
}

h2 {
  font-size: 2em;
}

h4 {
  font-size: 1.17em;
}

#app {
  font-family: "Roboto Condensed", "Franklin Gothic", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}

.route-content {
  padding: 20px 0px;
}

.container {
  padding-bottom: 15px;
  margin-bottom: 20px;
  background: $chipotle-white;
  border-radius: 5px;

  @media (min-width: 1200px) {
    max-width: 900px;
  }
  @media (min-width: 992px) {
    max-width: 900px;
  }
}

.fade-enter-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-leave-active {
  transition-property: opacity; // since we have variable height content,
  // immediately make the content invisible
  // with a zero opacity value that takes place
  // instantly
  transition-duration: .0s; // set the leaving content's position to
  // absolute to avoid dynamic resizing to
  // include both views as the content is swapping
  position: absolute;
}

.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
