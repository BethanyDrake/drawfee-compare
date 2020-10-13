<template>
  <div id="app">
    <div id="imageComparisonContainer">
      <ImageToBeCompared v-bind:imageData='images[0]' v-bind:voteForImage='voteForImage(images[0], images[1])' />
      <ImageToBeCompared v-bind:imageData='images[1]' v-bind:voteForImage='voteForImage(images[1], images[0])' />
    </div>

    <p>
      {{message}}
    </p>
    <button v-if='hasVoted' v-on:click='nextMatchup'>Next</button>
  </div>
</template>

<script>
  import ImageToBeCompared from "./components/ImageToBeCompared.vue"
  import MatchupService from "./MatchupService.js"
  import VoteService from "./VoteService.js"

  export default {
    name: "App",
    props: ['injectedMatchupService', 'voteService'],
    data: function() {
      return {
          message: "",
          hasVoted: false,
          images: [],
          matchupService: new MatchupService(),
      }
    },
    created: function() {
      console.log("BBBB")
      if (this.injectedMatchupService) {
        console.log("updating matchup")
        this.$set(this, 'matchupService', this.injectedMatchupService)
      }
      this.$set(this, 'images', this.matchupService.getMatchup())
    },
    computed: {
      voteForImage() {
        const voteService = this.voteService || new VoteService();
        return (winner, loser) => async () => {
          let votes = await voteService.voteForImage(winner.id, loser.id );
          this.$set(this, 'hasVoted', true)
          const newMessage = winner.id + " has " + votes[winner.id] + " votes" + " ... " + loser.id + " has " + votes[loser.id] + " votes";
          this.$set(this, 'message', newMessage)
        }
      }
    },
    methods: {
      nextMatchup: function() {
        console.log("NEXT")
        this.$set(this, 'images', this.matchupService.getMatchup())
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