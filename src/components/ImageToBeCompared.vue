<template>
  <div>
    <p>
      From episode: <a v-bind:href="imageData.videoUrl">{{imageData.videoTitle}}</a>
    </p>
    <img alt="Vue logo" :src="getImgUrl(imageData.id)" />
  </div>
</template>

<script>


  import images from '../images/1a.png'
  console.log(images)
  const getImgUrl = (id) => {
    let imageContext;
    try {
      imageContext = require.context('../images/', false, /\.png$/)
    } catch (error) {
      console.warn("Failed to get context")
      imageContext = (s) => s
    }

    return imageContext('./' + id + ".png")
  }


  export default {
    name: "ImageToBeCompared",
    props: ['imageData'],
    components: {
    },
    methods: {
      getImgUrl,
    },

  };
</script>

<style scoped>
</style>