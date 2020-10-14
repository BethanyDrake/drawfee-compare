<template>
  <div id="votingPage">
    <h1>
      Drawfee Royale
    </h1>
    <div id="imageComparisonContainer">
      <div class="row">
        <p class="rowItem">
          From episode: <a v-bind:href="images[0].videoUrl">{{images[0].videoTitle}}</a>
        </p>
        <p class="rowItem">
          From episode: <a v-bind:href="images[1].videoUrl">{{images[1].videoTitle}}</a>
        </p>
      </div>
      <div class="row">
        <div class="rowItem">
          <img alt="Vue logo" :src="getImgUrl(images[0].id)" />
        </div>
        <div class="rowItem">
          <img alt="Vue logo" :src="getImgUrl(images[1].id)" />
        </div>
      </div>
      <div class="row voteButtonRow">
        <div class="rowItem">
          <button class="voteButton" :disabled='voteSubmitted' v-on:click="voteForImage(0)">{{voteButtonText[0]}}</button>
        </div>
        <div class="rowItem">
          <button class="voteButton" :disabled='voteSubmitted' v-on:click="voteForImage(1)">{{voteButtonText[1]}}</button>
        </div>
      </div>
    </div>
    <div class="loadingSpinner" v-if="voteSubmitted && !voteRecieved">
      <div>
        <img class="spinning" src="./assets/drawfee-logo.png" />
        <p id="submittingVoteText">Submitting vote...</p>
      </div>
    </div>
    <p>
      {{message}}
    </p>
    <button v-if='voteRecieved' v-on:click='nextMatchup'>Next</button>
  </div>
</template>

<script>
  import MatchupService from "./MatchupService.js"
  import VoteService from "./VoteService.js"


  const formatPercentage = (n) => {
    return (n*100).toFixed(0) + "%"
  }

  const calculateWinPercentages = (id1, id2, votes) => {
    const totalVotes = votes[id1] + votes[id2];
    return [formatPercentage(votes[id1]/totalVotes), formatPercentage(votes[id2]/totalVotes)]

  }

  export default {
    name: "VotingPage",
    props: ['injectedMatchupService', 'voteService'],
    data: function () {
      return {
        message: "",
        images: [],
        matchupService: new MatchupService(),
        voteSubmitted: false,
        voteRecieved: false,
        voteButtonText: ["Vote", "Vote"],
      }
    },
    created: function () {


      if (this.injectedMatchupService) {
        this.$set(this, 'matchupService', this.injectedMatchupService)
      }
      this.$set(this, 'images', this.matchupService.getMatchup())
    },
    methods: {
      nextMatchup: function () {
        this.$set(this, 'images', this.matchupService.getMatchup())
        this.$set(this, 'voteSubmitted', false)
        this.$set(this, 'voteRecieved', false)
        this.$set(this, 'message', "")
        this.$set(this, 'voteButtonText', ["Vote", "Vote"])
      },
      voteForImage: async function (imageIndex) {
        const voteService = this.voteService || new VoteService();
        const winner = this.images[imageIndex]
        const loser = this.images[(imageIndex + 1) % 2]

        this.$set(this, 'voteSubmitted', true)
        voteService.voteForImage(winner.id, loser.id).then(votes => {
          this.$set(this, 'voteRecieved', true)
          const newMessage = winner.id + " has " + votes[winner.id] + " votes" + " ... " + loser.id + " has " + votes[loser.id] + " votes";
          this.$set(this, 'voteButtonText', calculateWinPercentages(this.images[0].id, this.images[1].id, votes));
          this.$set(this, 'message', newMessage)
        }).catch((e) => {
          console.error(e)
          console.log("Could not submit vote.")
          this.$set(this, 'voteRecieved', false);
          this.$set(this, 'voteSubmitted', false);
        })


      },
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
    },
    components: {
    }
  };
</script>

<style>
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

  .voteButtonRow {
    margin-top: -32px;
  }

  button {
    background-color: #C01F26;
    padding: 16px 32px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: large;
    border-width: 4px;
    border-style: solid;
    border-color: white;
  }

  button:disabled {
    background-color: grey;
    border-color: white;
    color: white;
  }

  button:disabled:hover {
    background-color: grey;
    border-color: white;
    color: white;
  }

  button:hover {
    background-color: white;
    color: #C01F26;
    border-width: 4px;
    border-style: solid;
    border-color: #C01F26;
  }

  .voteButton:focus {
    outline-color: #C01F26;
  }

  #imageComparisonContainer {
    display: flex;
    flex-direction: column;
    margin: 0 16px;

  }

  .loadingSpinner {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(199, 199, 199, 0.829);
    /* Black w/ opacity */
    justify-content: center;
  }

  #submittingVoteText {
    font-size: large;
    color: #C01F26;
    font-weight: bold;
  }

  .spinning {
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }

  /* rotate 360 key for refresh btn */
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .row {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .rowItem {
    width: 50%;
  }

  #imageComparisonContainer img {
    width: 90%;
  }
</style>