<template>
  <div class="gallery">
    <div v-for="character in characters" :key="characters.indexOf(character)">
    <img class="thumbnails" style="cursor: pointer"
    :src="character[0].thumbnail.path + '.' + character[0].thumbnail.extension"/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import eventBus from '@/main';

export default {
  name: 'CharactersPortal',
  data() {
    return {
      characters: [],
      slider: null,
    };
  },
  created() {
    eventBus.$on('movieSelected', (movie) => {
      // eslint-disable-next-line
      console.log(movie);
      fetch(`/api/movieCharacters/${movie}`).then(res => res.json()).then((res) => {
        this.characters = res;
      });
    });
  },
  updated() {
    $('.gallery').slick({
      autoplay: false,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 500,
        settings: {
          dots: false,
          arrows: false,
          infinite: false,
        },
      }],
    });
  },
};
</script>

<style scoped>
</style>
