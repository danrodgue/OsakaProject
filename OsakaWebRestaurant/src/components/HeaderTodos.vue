<template>
  <header :class="{ shrink: isShrunk }">
    <nav class="navegador">
      <!-- Botón hamburguesa -->
      <button class="menuHamburguesa" @click="menuOpen = !menuOpen">
        ☰
      </button>

      <!-- Menú Desktop / Mobile -->
      <div class="menuDesktop" :class="{ open: menuOpen }">
        <!-- Menú izquierdo -->
        <ul class="listaMenu">
          <li class="navItem"><a class="navLink" href="#home">Home</a></li>
          <li class="navItem"><a class="navLink" href="#about">About</a></li>
          <li class="navItem"><a class="navLink" href="#gallary">Gallary</a></li>
          <li class="navItem"><a class="navLink" href="#book-table">Book-Table</a></li>
        </ul>

        <!-- Logo / Texto Osaka -->
        <transition name="fade" mode="out-in">
          <a class="logoOsaka" href="#" :key="isShrunk ? 'text' : 'logo'">
            <img v-if="!isShrunk" src="../assets/IMG/LOGO.jpg" class="marcaLogo" alt="Logo Osaka" />
            <span v-else class="textOsaka">Osaka</span>
          </a>
        </transition>

        <!-- Menú derecho -->
        <ul class="navNav">
          <li class="navItem"><a class="navLink" href="#blog">Blog</a></li>
          <li class="navItem"><a class="navLink" href="#testmonial">Reviews</a></li>
          <li class="navItem"><a class="navLink" href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <FotoPlatoTexto/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import FotoPlatoTexto from './FotoPlatoTexto.vue'
const isShrunk = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isShrunk.value = window.scrollY > 150
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped lang="sass">
$color_fondo_header: #1a1a1a
$color_primario_osaka: #d32f2f

/* Fade transition */
.fade-enter-active, .fade-leave-active
  transition: opacity 0.8s ease-in-out
.fade-enter-from, .fade-leave-to
  opacity: 0

/* Header */
header
  position: fixed
  top: 0
  left: 0
  width: 100%
  background-color: $color_fondo_header
  padding: 1rem 0
  z-index: 999
  transition: all 0.3s ease
  display: flex
  justify-content: center

header.shrink
  padding: 0.6rem 0
  background-color: rgba(0,0,0,0.9)
  backdrop-filter: blur(4px)

/* Navegador */
.navegador
  display: flex
  align-items: center
  justify-content: space-between
  width: 90%
  max-width: 1200px

/* Logo / Texto */
.logoOsaka
  display: flex
  align-items: center
  justify-content: center

.marcaLogo
  width: 80px
  border-radius: 50%
  transition: all 0.8s ease-in-out

.textOsaka
  color: $color_primario_osaka
  font-weight: 900
  font-size: 40px
  transition: all 0.8s ease-in-out

/* Menú desktop */
.menuDesktop
  display: grid
  grid-template-columns: 1fr auto 1fr
  align-items: center
  width: 100%
  transition: max-height 0.3s ease
  gap: 0.2rem

  a
    text-decoration: none
    color: white
    font-size: 20px
    font-weight: 500
    transition: color 0.2s

    &:hover
      color: $color_primario_osaka

  ul
    display: flex
    gap: 2rem
    li
      list-style: none

.listaMenu
  justify-self: start

.navNav
  justify-self: end

/* Botón hamburguesa */
.menuHamburguesa
  display: none
  font-size: 28px
  background: none
  border: none
  cursor: pointer
  color: white

/* RESPONSIVE */
@media (max-width: 800px)
  header
    justify-content: flex-start

  .menuHamburguesa
    display: block
    font-size: 24px  // un tamaño legible para móvil

  .menuDesktop
    max-height: 0
    overflow: hidden
    display: flex
    flex-direction: column
    align-items: center
    transition: max-height 0.3s ease

    &.open
      max-height: 500px

    ul
      display: flex
      flex-direction: column  // columna en móvil
      gap: 0.5rem             // menos espacio entre items
      padding: 0
      margin: 0
      text-align: center

      li
        list-style: none
        margin: 0
        padding: 0

        a
          font-size: 14px  // tamaño legible
          display: block

  .marcaLogo
    display: block
    position: absolute
    right: 0
    margin-right: 1rem
    margin-top: 5px
    top: 0


  .textOsaka
    font-size: 8px  // tamaño legible en móvil
    position: absolute
    right: 0
    margin: 1rem
    top: 0

    
@media (max-width: 500px)
  .marcaLogo
    display: block

  .textOsaka
    font-size: 26px  // más pequeño para pantallas muy chicas

</style>