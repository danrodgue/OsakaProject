<script setup>

</script>

<template>
  <main>
    <transition name="fade" mode="out-in">  
      <RouterView :key="$route.fullPath" />
    </transition>
  </main>
</template>

<style lang="sass" scoped>
.fade-enter-active,.fade-leave-active
  transition: opacity 0.4s ease
.fade-enter-from,.fade-leave-to
  opacity: 0
</style>
