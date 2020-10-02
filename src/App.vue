<template>
  <div id="app">
    <div id="imageComparisonContainer">
    <ImageToBeCompared videoTitle="Artists Draw MORE Disney Characters As Dark Souls Bosses"
    videoUrl="https://www.youtube.com/watch?v=qHNVzpIWDGw" v-bind:imageId="images[0].imageId" />
    <ImageToBeCompared videoTitle="Artists Draw MORE Disney Characters As Dark Souls Bosses"
    videoUrl="https://www.youtube.com/watch?v=qHNVzpIWDGw" v-bind:imageId="images[1].imageId" />
  </div>
  </div>
</template>

<script>
  import ImageToBeCompared from "./components/ImageToBeCompared.vue"
  import MatchupService from "./MatchupService.js"

  export default {
  name: "App",
  props: ['matchupService'],
  computed: {
    images () {
      const matchupService = this.matchupService || new MatchupService();
      return matchupService.getMatchup();
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
