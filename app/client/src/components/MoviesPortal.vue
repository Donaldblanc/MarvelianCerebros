<template>
    <carousel class="movie-container" perPage="4" navigationEnabled="true"
    navigationNextLabel="<div style='color: aliceblue;
     background-color: #151517; border: none'>▶</div>"
    navigationPrevLabel="<div style='color: aliceblue;
     background-color: #151517; border: none'>◀</div>">
      <slide class="movies" v-for="movie in json" :key="movie.Title">
        <img class="posters" style="cursor: pointer" :src="movie.Poster"
         :alt="movie.Title" @dblclick.prevent="getCharacters($event)"/>
      </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import eventBus from '@/main';

export default {
  name: 'MoviesPortal',
  components: { Carousel, Slide },
  data() {
    return {
      json: [],
    };
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      fetch('/api/movies').then(res => res.json()).then((res) => {
        this.json = res;
      });
    },
    getCharacters(event) {
      eventBus.$emit('movieSelected', event.currentTarget.getAttribute('alt'));
    },
  },
};
</script>

<style >
</style>
