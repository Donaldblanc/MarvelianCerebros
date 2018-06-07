<template>
    <div class="gallery2">
    <p v-if="comics.length === 0">Then a character</p>
    <div v-for="comic in comics" :key="comics.indexOf(comic)">
    <img class="comic-thumbnails" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import eventBus from '@/main';

export default {
  name: 'ComicsPortal',
  data() {
    return {
      comics: [],
    };
  },
  created() {
    eventBus.$on('characterSelected', (id) => {
      fetch(`/api/comics/${id}`).then(res => res.json()).then((res) => {
        this.comics = res;
      });
    });
    eventBus.$on(['movieSelected', 'characterSelected'], () => {
      document.querySelector('.gallery2').style.opacity = 1;
    });
    eventBus.$on('movieSelected', () => {
      while (this.comics.length > 0) {
        this.comics.pop();
      }
    });
  },
  updated() {
    // eslint-disable-next-line
    $('.gallery2').slick({
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
};
</script>

<style>
 .gallery2 {
   text-align: center;
   font-family: 'Open Sans', sans-serif;
   font-size: 30px;
   opacity: 0;
 }
</style>
