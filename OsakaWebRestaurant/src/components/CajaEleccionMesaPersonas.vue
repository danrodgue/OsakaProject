<template>
    <div id="bienvenido">
        <div id="container_seleccion_mesa_personas">
            <div>
                <h1>Bienvenido a Osaka</h1>
            </div>
          <div id="seleccion_personas">
              <input type="number" id="number_personas" placeholder="Introduzca el número de personas en su mesa :)">
          </div>
          <div id="seleccion_mesa">
              <input type="number" id="number_mesa" placeholder="Número de mesa">
          </div>
          <!-- <button @click=recuperar_values id="confirm_mesa" class="boton_confirmar">CONFIRMAR</button> -->
          <BotonBasico @click=recuperar_values id="confirmar_mesa" :texto="BtnMensaje"></BotonBasico>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BotonBasico from './BotonBasico.vue'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router' 

const toast = useToast()
const router = useRouter() 


const recuperar_values = ()=>{
    let n_mesa = ref(number_mesa.value)
    let n_personas = ref(number_personas.value)
    if(n_mesa.value == "" || n_personas.value == "" ){
        toast.warning("Debes introducir nºde mesa y nºde personas",{
            duration: 1500,
            style: {
                background: "#d62828",   // color de fondo
                color: "#fff",            // color de texto
                fontWeight: "900",       // texto en negrita
                borderRadius: "15px",      // bordes redondeados
                padding: "12px 18px",     // espaciado interno
                fontSize: "20px"          // tamaño de fuente
            }
        })
        return
    }else{
        toast.success("Gracias!",{
            duration: 1000,
            style: {
                background: "#a7c957",   // color de fondo
                color: "#fff",            // color de texto
                fontWeight: "900",       // texto en negrita
                borderRadius: "15px",      // bordes redondeados
                padding: "12px 18px",     // espaciado interno
                fontSize: "20px"          // tamaño de fuente
            }
        })

        setTimeout(() => {
            router.push("/VistaEleccionMenu")
        }, 1100);
        return 
    }
}
const BtnMensaje = "CONFIRMAR"
</script>

<style lang="sass" scoped>
$color_botones: #d62828
$color_botones_hover: #a7c957
$color_input: #6f1d1b

#bienvenido
    border: 1px solid
    width: 100%
    display: flex
    justify-content: center
    padding: 2rem
    border-radius: 15px

#container_seleccion_mesa_personas
    border: 2px solid red
    padding: 3rem 10rem
    border-radius: 15px
    box-shadow: 0px 0px 15px 9px rgba(0,0,0,0.1)
    display: flex
    gap: 2rem
    flex-direction: column
    align-items: center

    #seleccion_personas,
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
            &::-webkit-inner-spin-button
                -webkit-appearance: none
            &::-webkit-outer-spin-button
                -webkit-appearance: none
            &:focus
                border: 1px solid $color_input
                outline: none

#confirmar_mesa
    width: 150px
    height: 40px

/* ===== RESPONSIVE ===== */
@media (max-width: 800px)
    #container_seleccion_mesa_personas
        padding: 2rem 4rem
        gap: 1.5rem

        #seleccion_personas,
        #seleccion_mesa
            width: 80%  // ocupa casi todo el ancho

@media (max-width: 500px)
    #container_seleccion_mesa_personas
        padding: 1.5rem 2rem
        gap: 1rem

        #seleccion_personas,
        #seleccion_mesa
            width: 100%  // full width en móvil
            input
                padding: 0.8rem

    #confirmar_mesa
        width: 100%
        height: 40px

</style>