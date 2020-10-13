<template>
  <div id="app">
    <div id="imageComparisonContainer">
      <div class="row">
        <p class="rowItem">
          From episode: <a v-bind:href="images[0].videoUrl">{{images[0].videoTitle}}</a>
        </p >
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
      <div class="row">
        <div class="rowItem">
        <button v-on:click="voteForImage(1)">Vote</button>
      </div>
        <div class="rowItem">
        <button v-on:click="voteForImage(0)">Vote</button>
      </div>
      </div>

    </div>




  <p>
    {{message}}
  </p>
  <button v-if='hasVoted' v-on:click='nextMatchup'>Next</button>
  </div>
</template>

<script>
  import MatchupService from "./MatchupService.js"
  import VoteService from "./VoteService.js"

  export default {
    name: "App",
    props: ['injectedMatchupService', 'voteService'],
    data: function () {
      return {
        message: "",
        hasVoted: false,
        images: [],
        matchupService: new MatchupService(),
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
        this.$set(this, 'hasVoted', false)
        this.$set(this, 'message', "")
      },
      voteForImage: async function (imageIndex) {
        const voteService = this.voteService || new VoteService();
        const winner = this.images[imageIndex]
        const loser = this.images[(imageIndex + 1) % 2]

        const votes = await voteService.voteForImage(winner.id, loser.id);
        this.$set(this, 'hasVoted', true)
        const newMessage = winner.id + " has " + votes[winner.id] + " votes" + " ... " + loser.id + " has " + votes[loser.id] + " votes";
        this.$set(this, 'message', newMessage)

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
    flex-direction: column;
    margin: 0 16px;
  }

  .row {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .rowItem{
    width: 50%;
  }

  #imageComparisonContainer img {
    width: 90%;
  }
</style>