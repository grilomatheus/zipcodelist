<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
  h3 {
    font-size: 20px;
    font-family: "SimplonLight",sans-serif;
    color: #6c757d;
    font-style: italic;
    margin-bottom: 20px
  }
  @media (min-width: 1024px){
    h3 {
      font-size: 36px;
    }
  }

  .illustration{
    height: 100%;
    width: 320px;
    max-height: 400px;
    background-size: 320px 290px;
    background-repeat: no-repeat;
    background-image: url("../../assets/notfound.png");
    background-position: center;
  }
  @media (min-width: 1024px){
    .illustration{
      width: 600px;
      max-height: 600px;
      background-size: 558px 506px;
    }
  }
  @media (min-width: 1366px){
    .illustration{
      width: 800px;
      max-height: 700px;
      background-size: 700px 635px;
    }
  }
</style>
<template>
  <div class="container text-center">
    <div class="content illustration">
      <h3>Página não encontrada.</h3>
      <router-link :to="'/'" class="btn btn-outline-secondary">
        <span class="fa fa-undo"></span> Voltar
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>
