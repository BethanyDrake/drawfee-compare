<template>
  <div id="resultsPage">
    <div id="subheaderRow">
      <h2>Results: </h2>
      <button id="backToVotingButton"  v-on:click='onBackToVoting'>Back to Voting</button>
    </div>

    <div v-if="loading">
      <div class="loadingSpinner">
        <div>
          <img class="spinning" src="./assets/drawfee-logo.png" />
          <p id="submittingVoteText">Getting results...</p>
        </div>
      </div>
    </div>
    <div v-else>
   <div class="result" v-for="(entry, index) in results" :key="entry.id">
     <img :src="getImgUrl(entry.id)">
     <div>
     <div class="ranking">#{{index+1}}</div>
     From episode: <a :href="entry.videoUrl">{{entry.videoTitle}}</a>
    </div>
   </div>
  </div>
  </div>
</template>

<script>
    import ResultsService from "./ResultsService.js"

  export default {
    name: "ResultsPage",
    props: ["injectedResultsService", "goToVotingPage"],
    created: function() {
      const resultsService = this.injectedResultsService || new ResultsService()
      resultsService.getResults().then(results => {
        this.$set(this, 'results', results)
        this.$set(this, 'loading', false)
      })
    },
    data: function() {
      return {
        loading: true,
        results: "",
        onBackToVoting: this.goToVotingPage || (() => {}),
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

<style scoped>
  .result {
    text-align: left;
    display: flex;
    margin: 16px;
  }

  .loadingSpinner {
    position: relative;
    background-color: white;
  }

  .result .ranking{
    font-weight: bold;
    font-size: lager;
    letter-spacing: 3px;
    color: white;
    text-shadow:
   -1px -1px 2px #C01F26,
    1px -1px 2px #C01F26,
    -1px 1px 2px #C01F26,
     1px 1px 2px #C01F26;

  }

  #subheaderRow {
    display: flex;
    margin: 16px;
    justify-content: space-between;
    align-items: baseline;
  }

  button {
    padding: 8px 16px;
    font-size: medium;
  }


  .result img{
    margin-right: 16px;
  }

</style>