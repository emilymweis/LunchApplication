<template>
  <transition name="fade-loading" tag="div">
    <div v-show="isLoading" class="loading-indicator">
      <img class="loading-image" src="../assets/loadingPepper.gif" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading-indicator',
  computed: {
    isLoading: function () {
      return this.$store.getters.isLoading
    }
  }
}
</script>

<style lang="scss">
.loading-indicator {
  cursor: wait;
  top: 0;
  bottom: 0;
  background-color:white;
  color: black;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;

  /* Required to prevent Chrome from ghosting the
  child image during rendering at specific viewport sizes */
  -webkit-transform: translateZ(0);

  .loading-image {
    width: 14em;
    height: 14em;
  }
}

.fade-loading-enter-active, .fade-loading-leave-active {
  transition: opacity .5s
}
.fade-loading-enter, .fade-loading-leave-to {
  opacity: 0
}
</style>
