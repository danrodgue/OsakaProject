<script setup>
import HeaderTodos from './components/HeaderTodos.vue';

</script>

<template>
  <main>
    <HeaderTodos/>
    <transition name="fade" mode="out-in">  
      <RouterView :key="$route.fullPath" />
    </transition>
  </main>
</template>

<style lang="sass" scoped>

*
  margin: 0
  padding: 0
  box-sizing: border-box
main
  width: 100%
  background-color: #1a1a1a
.fade-enter-active,.fade-leave-active
  transition: opacity 0.4s ease
.fade-enter-from,.fade-leave-to
  opacity: 0
</style>
