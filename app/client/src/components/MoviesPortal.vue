<template>
    <div class="movie-container">
      <div class="movies" v-for="movie in json" :key="movie.Title">
        <img class="posters" style="cursor: pointer" :src="movie.Poster"
         :alt="movie.Title" @dblclick.prevent="getCharacters($event)"/>
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
      if (document.getElementsByClassName('highlighted').length > 0) {
        document.getElementsByClassName('highlighted').item(0).classList.remove('highlighted');
      }
      if (document.getElementsByClassName('play').length > 0) {
        document.getElementsByClassName('play').item(0).remove();
      }
      event.currentTarget.classList.add('highlighted');
      const element = document.createElement('img');
      element.setAttribute('src', youtubeIcon);
      element.style.width = '45px';
      element.style.marginTop = '10px';
      element.style.marginLeft = '130px';
      element.classList.add('play');
      event.currentTarget.parentElement.appendChild(element);
    },
  },
};
</script>

<style>
.highlighted {
  border-style: solid;
  border-color: aliceblue;
  text-align: center;
}
</style>
