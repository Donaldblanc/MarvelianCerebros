<template>
    <div class="movie-container">
      <div class="movies" v-for="movie in json" :key="movie.Title">
        <img class="posters" style="cursor: pointer" :src="movie.Poster"
         :alt="movie.Title" @dblclick.prevent="getCharacters($event)"/>
         <img :src="youtubeIcon" class="play play-inactive" @click="getTrailer($event)" :data-title="movie.Title"/>
      </div>
    </div>
</template>

<script>
import eventBus from '@/main';
import youtubeIcon from '@/assets/yt_icon_rgb.png';

export default {
  name: 'MoviesPortal',
  data() {
    return {
      json: [],
      youtubeIcon: youtubeIcon,
    };
  },
  mounted() {
    this.getMovies();
  },
  updated() {
    // eslint-disable-next-line
    $('.movie-container').slick({
      autoplay: false,
      centerMode: true,
      centerPadding: '1px',
      variableWidth: false,
      variableHeight: true,
      infinite: true,
      dots: false,
      slidesToShow: 3,
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
    getMovies() {
      fetch('/api/movies').then(res => res.json()).then((res) => {
        this.json = res;
      });
    },
    getCharacters(event) {
      eventBus.$emit('movieSelected', event.currentTarget.getAttribute('alt'));
      if (document.getElementsByClassName('highlighted posters').length > 0) {
        document.getElementsByClassName('highlighted posters').item(0).classList.remove('highlighted');
      }
      event.currentTarget.classList.add('highlighted');
      if (document.querySelectorAll('.play-active').length > 0) {
        document.querySelectorAll('.play-active').item(0).classList.remove('play-active');
      }
      event.currentTarget.parentElement.querySelector('.play').classList.add('play-active');
    },
    getTrailer(event) {
        fetch(`/api/movieTrailer/${event.currentTarget.dataset.title}`).then(res => res.json()).then(res => eventBus.$emit('openModal', res));
    },
  },
};
</script>

<style>
.play-inactive {
  visibility: hidden;
}
.play-active {
  visibility: visible;
  cursor: pointer;
  width: 45px;
  margin-top: 10px;
  margin-left: 130px;
}
</style>
