<template>
    <carousel class="movie-container" perPage="4" navigationEnabled="true"
    navigationNextLabel="<div style='color: aliceblue;
     background-color: #151517; border: none'>▶</div>"
    navigationPrevLabel="<div style='color: aliceblue;
     background-color: #151517; border: none'>◀</div>">
      <slide class="movies" v-for="movie in json" :key="movie.imdbID">
        <img class="posters" :src="movie.Poster"/>
      </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

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
      // eslint-disable-next-line
      fetch('/api/movies').then(res => res.json()).then(res => this.json = res);
    },
  },
};
</script>

<style >
</style>
