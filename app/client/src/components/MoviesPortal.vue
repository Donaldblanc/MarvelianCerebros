<template>
  <div>
    <button @click="getMovies">TEST</button>
    <ul>
      <li v-for="movie in [json]" :key="movie.imdbID">{{ movie.Title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MoviesPortal',
  data() {
    return {
      json: [],
    };
  },
  methods: {
      getMovies() {
        fetch('/api/movies').then(res => res.json()).then(res => this.json = res)
    },
  },
};
</script>

<style>
</style>
