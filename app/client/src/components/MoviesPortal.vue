<template>
  <div @scroll="getMovies">
    <ul v-for="movie in fetchRes.movieData" :key="movie.id">
      <div>

      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MoviesPortal',
  data() {
    return {
      fetchRes: movieData,
    };
  },
  methods: {
    async getMovies() {
      const movieData = await fetch.get('/api/moives').then(res => res.json());
    },
  },
};
</script>

<style>
</style>
