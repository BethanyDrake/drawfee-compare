<template>
  <div id="app">
    <VotingPage v-if='currentPage=="VotingPage"' :goToResultsPage="goToResultsPage"/>
    <ResultsPage v-if='currentPage=="ResultsPage"'/>
  </div>
</template>

<script>
  import VotingPage from "./VotingPage.vue"
  import ResultsPage from "./ResultsPage.vue"
  export default {
    name: "App",
    components: {
      VotingPage,
      ResultsPage,
    },
    data: function() {
      return {
        currentPage: "VotingPage"
      }
    },
    methods: {
      goToResultsPage: function() {
        this.$set(this, 'currentPage', "ResultsPage")
      }
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