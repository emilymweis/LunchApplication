<template>
  <div class="modalbackground">
    <img v-bind:src="pepperUrl" class="loader" />
  </div>
</template>

<script>
  export default {
    name: 'LoadingPepper',
    computed: {
      pepperUrl () {
        return require('../assets/loadingPepper.gif')
      }
    }
  }
</script>

<style>
  .modalbackground {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: silver;
    opacity: .5;
    overflow: hidden;
  }

  .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 100px;
  }
</style>
