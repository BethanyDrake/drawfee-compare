<template>
  <div id="app">
    <VotingPage/>
  </div>
</template>

<script>
  import VotingPage from "./VotingPage.vue"

  export default {
    name: "App",
    components: {
      VotingPage,
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>