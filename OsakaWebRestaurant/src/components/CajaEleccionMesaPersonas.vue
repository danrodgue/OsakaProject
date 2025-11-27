<template>
  <div id="container_seleccion_mesa_personas">
    <div id="seleccion_personas">
        <input type="number" id="number_personas" placeholder="Introduzca el número de personas en su mesa :)">
    </div>
    <div id="seleccion_mesa">
        <input type="number" id="number_mesa" placeholder="Número de mesa">
    </div>
    <!-- <button @click=recuperar_values id="confirm_mesa" class="boton_confirmar">CONFIRMAR</button> -->
    <BotonBasico @click=recuperar_values id="confirmar_mesa" :texto="BtnMensaje"></BotonBasico>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BotonBasico from './BotonBasico.vue'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
const recuperar_values = ()=>{
    let n_mesa = ref(number_mesa.value)
    let n_personas = ref(number_personas.value)
    if(n_mesa.value == "" || n_personas.value == "" ){
        toast.warning("Debes introducir nº de mesa y nº de personas")
        return
    }else{
        localStorage.setItem("n_mesa", n_value)
        localStorage.setItem("n_personas", n_personas.value)
        toast.success("Gracias!")
        return 
    }
}
const BtnMensaje = "CONFIRMAR"
</script>

<style lang="sass" scoped>
$color_botones: #d62828
$color_botones_hover: #a7c957
$color_input: #6f1d1b
#container_seleccion_mesa_personas
    border: 2px solid red
    padding: 10rem
    border-radius: 15px
    box-shadow: 0px 0px 15px 9px rgb(0,0,0,0.1)
    display: flex
    gap: 5rem
    #seleccion_personas
        width: 300px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 0.5rem
        input
            padding: 1rem
            width: 100%
            text-align: center
            border-radius: 15px
            border: 1px dotted 
            justify-content: flex-start
            &::-webkit-inner-spin-button
                -webkit-appearance: none
            &::-webkit-outer-spin-button
                -webkit-appearance: none
            &:focus
                border: 1px solid $color_input
                outline: none
    #seleccion_mesa
        width: 300px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        gap: 0.5rem
        input
            padding: 1rem
            width: 100%
            text-align: center
            border-radius: 15px
            border: 1px dotted
            justify-content: flex-start  
            &::-webkit-inner-spin-button
                -webkit-appearance: none
            &::-webkit-outer-spin-button
                -webkit-appearance: none
            &:focus
                border: 1px solid $color_input
                outline: none
</style>