<template>
  <div id="resultsPage">
   <div v-for="entry in results" :key="entry.id">
     <img :src="getImgUrl(entry.id)">
     <a :href="entry.videoUrl">{{entry.videoTitle}}</a>
   </div>
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
    },
    methods: {
      getImgUrl: (id) => {
        let imageContext;
        try {
          imageContext = require.context('./images/', false, /\.png$/)
        } catch (error) {
          console.warn("Failed to get context")
          imageContext = (s) => s
        }

        return imageContext('./' + id + ".png")
      }
    }
  };
</script>

<style>
</style>