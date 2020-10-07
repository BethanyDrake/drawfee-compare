<template>
  <div id="app">
    <div id="imageComparisonContainer">
      <ImageToBeCompared v-bind:imageData='images[0]' v-bind:voteForImage='voteForImage(images[0], images[1])' />
      <ImageToBeCompared v-bind:imageData='images[1]' v-bind:voteForImage='voteForImage(images[1], images[0])' />
    </div>

    <p>
      {{message}}
    </p>
  </div>
</template>

<script>
  import ImageToBeCompared from "./components/ImageToBeCompared.vue"
  import MatchupService from "./MatchupService.js"
  import VoteService from "./VoteService.js"
  const data = {
    message: ""
  }

  export default {
    name: "App",
    props: ['matchupService', 'voteService'],
    data: () => data,
    computed: {
      images() {
        const matchupService = this.matchupService || new MatchupService();
        return matchupService.getMatchup();
      },
      voteForImage() {
        const voteService = this.voteService || new VoteService();
        return (winner, loser) => async () => {
          let votes = await voteService.voteForImage(winner.id, loser.id );
          data.message = winner.id + " has " + votes[winner.id] + " votes" + " ... " + loser.id + " has " + votes[loser.id] + " votes";
        }
      }
    },
    components: {
      ImageToBeCompared
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
    margin-top: 60px;
  }

  #imageComparisonContainer {
    display: flex;
  }

  #imageComparisonContainer img {
    width: 90%;
  }
</style>