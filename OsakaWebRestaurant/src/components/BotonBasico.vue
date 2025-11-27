<template>
  <button class="boton_confirmar">
    {{ texto }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  texto: {
    type: String,
    required: true}
  })

</script>

<style lang="sass" scoped>
$color_botones: #d62828
$color_botones_hover: #a7c957
$color_input: #6f1d1b
.boton_confirmar
    padding: 0.5rem
    border-radius: 15px
    border: none
    background-color: $color_botones
    color: white
    font-size: 14px
    font-weight: 600
    position: relative
    z-index: 1
    &:hover
        background-color: $color_botones_hover
        cursor: pointer
    &:active
        transform: translateY(3px) scale(0.997)
    &::after
            border: solid rgba(0,0,0,0.22)
            border-radius: 16px
            border-width: 0 0 4px
            bottom: -6px
            content: ""
            left: 0
            position: absolute
            right: 0
            top: 0
            z-index: -1
    &:active::after
            border-width: 0
            opacity: 0        
            transform: translateY(3px)

</style>