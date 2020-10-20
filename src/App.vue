<template>
  <div id="app">
    <h1>
      Drawfee Royale
    </h1>
    <VotingPage v-if='currentPage=="VotingPage"' :goToResultsPage="goToResultsPage"/>
    <ResultsPage v-if='currentPage=="ResultsPage"' :goToVotingPage="goToVotingPage"/>
    <div id="footerPadding"><i class="fa fa-exclamation-circle"></i> Report an issue</div>

    <a id="reportAnIssue" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSejOihxHxDWHWZthvxdX3KPpxu7tNo0CFTYWE8GU0fIL6Gkfg/viewform?usp=sf_link"><i class="fa fa-exclamation-circle"></i> Report an issue</a>
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
      },
      goToVotingPage: function() {
        this.$set(this, 'currentPage', "VotingPage")
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
  @font-face {
    font-family: "FlamanteSans";
    src: local("FlamanteSans"),
      url(./fonts/FlamanteSans/Flamante-Sans-Bold-FFP.ttf) format("truetype");
  }

  body {
    margin: 0;
  }

  h1 {
    background-color: #C01F26;
    color: white;
    margin: 0;
    padding: 16px;
    padding-top: 32px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: "FlamanteSans";
    font-size: xxx-large;
  }

  #footerPadding {
    color: white;
  }

  #reportAnIssue {
    position: fixed;
    left: 0;
    bottom: 0;
    color: #C01F26;
    background-color: white;
    padding-right: 8px;
    border-top-right-radius: 3px;
  }
</style>