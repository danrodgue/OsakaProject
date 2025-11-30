<template>
  <div id="general"> 
        <div class="textos">
            <h1 class="uno">Osaka</h1>
            <h2 class="dos">Auténtica Cocina Japonesa</h2> 
        </div>
  </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>
#general
    width: 100%
    margin-top: 0rem
    background: url("../assets/IMG/fotoshushi.jpg")
    height: 600px
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    display: flex
    justify-content: center
    align-items: center
    .textos
        display: flex
        flex-direction: column
        background-color: rgba(26, 26, 26, 0.5)
        height: 100%
        align-items: center
        justify-content: center
        color: white
        .uno
            font-size: 60px
            margin-bottom: -1rem
        .dos
            font-size: 30px
            margin-bottom: 1rem
        
</style>