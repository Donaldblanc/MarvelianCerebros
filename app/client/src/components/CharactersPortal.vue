<template>
  <div class="gallery1">
    <p v-if="characters.length === 0">Pick a movie</p>
    <div v-for="character in characters" :key="characters.indexOf(character)">
      <img class="thumbnails" style="cursor: pointer"
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name" :data-id="character.id" @dblclick="getComics($event)"/>
      <p class="character-name">{{ character.name }}</p>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import eventBus from '@/main';
import flatten from 'array-flatten';

export default {
  name: 'CharactersPortal',
  data() {
    return {
      characters: [],
    };
  },
  created() {
    eventBus.$on('movieSelected', (movie) => {
      if (document.getElementsByClassName('highlighted thumbnails').length > 0) {
        document.getElementsByClassName('highlighted thumbnails').item(0).classList.remove('highlighted');
      }
      fetch(`/api/movieCharacters/${movie}`).then(res => res.json()).then((res) => {
        this.characters = Array.from(new Set(flatten(res)));
      });
    });
  },
  updated() {
    // eslint-disable-next-line
    $('.gallery1').slick({
      autoplay: false,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      adaptiveHeight: true,
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
  methods: {
    getComics(event) {
      eventBus.$emit('characterSelected', event.currentTarget.dataset.id);
      if (document.getElementsByClassName('highlighted thumbnails').length > 0) {
        document.getElementsByClassName('highlighted thumbnails').item(0).classList.remove('highlighted');
      }
      event.currentTarget.classList.add('highlighted');
    },
  },
};
</script>

<style scoped>
 .gallery1 {
   text-align: center;
   font-family: 'Open Sans', sans-serif;
   font-size: 30px;
 }
 .thumbnails {
   margin-left: 55px;
 }
 .character-name {
   font-size: 20px;
 }
</style>
