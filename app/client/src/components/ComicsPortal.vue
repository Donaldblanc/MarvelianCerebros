<template>
    <div class="gallery2">
    <p v-if="comics.length === 0">Select a character</p>
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
      slider: null,
    };
  },
  created() {
    eventBus.$on('characterSelected', (id) => {
      fetch(`/api/comics/${id}`).then(res => res.json()).then((res) => {
        this.comics = res;
      });
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
 }
</style>
