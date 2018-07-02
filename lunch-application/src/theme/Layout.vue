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
  html, body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
body{
  background-color: #e7dcc8;
  color: $chipotle-black;
  font-size: 14px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-section{
  flex:1;

}
footer{
  text-align: center;
  background-color: #e7dcc8;

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
}
.route-content {
  padding: 20px 0px;
}
.container {
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.fade-enter-active {
  transition-property: opacity;
  transition-duration: .25s;
}
.fade-leave-active {
  transition-property: opacity;
  transition-duration: .0s;
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
