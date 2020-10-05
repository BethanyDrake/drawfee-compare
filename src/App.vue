<template>
  <div id="app">
    <div id="imageComparisonContainer">
    <ImageToBeCompared v-bind:imageData='images[0]' v-bind:voteForImage='voteForImage' />
    <ImageToBeCompared v-bind:imageData='images[1]' v-bind:voteForImage='voteForImage' />
  </div>

  <p>
    {{message}}
  </p>
  </div>
</template>

<script>
  import ImageToBeCompared from "./components/ImageToBeCompared.vue"
  import MatchupService from "./MatchupService.js"
  const data= {
    message: ""
  }
  const voteForImage = (imageId) => {
    data.message = imageId +" has 1 votes"
  }

  export default {
  name: "App",
  props: ['matchupService'],
  data: () => data,
  computed: {
    images () {
      const matchupService = this.matchupService || new MatchupService();
      return matchupService.getMatchup();
    }
  },
  components: {
    ImageToBeCompared
  },
  methods:{
    voteForImage
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
