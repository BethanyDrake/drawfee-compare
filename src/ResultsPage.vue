<template>
  <div id="resultsPage">
    {{JSON.stringify(results)}}
  </div>
</template>

<script>
    import ResultsService from "./ResultsService.js"

  export default {
    name: "ResultsPage",
    props: ["injectedResultsService"],
    created: function() {
      const resultsService = this.injectedResultsService || new ResultsService()
      resultsService.getResults().then(results => {
        this.$set(this, 'results', results)
      })
    },
    data: function() {
      return {
        results: "",
      }
    },
    components: {
    }
  };
</script>

<style>
</style>