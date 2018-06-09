<template>
  <div id="home">
    <img id="background" src="../assets/Background-1.jpg">
    <div id="blurb">
      <h2>How it all began</h2>
      <!-- eslint-disable-next-line -->
      <p>Back in 2005, the idea of superheroes hanging out together on-screen was as absurd as the thought of someone making another Star Wars trilogy. While superheroes often team up on the pages of comic books, movie licensing deals limited specific characters to specific studios for specific franchises. On the big screen, Superman stayed in Metropolis, Batman in Gotham City, and the X-Men and Spider-Man lived in two separate versions of New York produced, respectively, by 20th Century Fox and Columbia Pictures. But around that time Marvel Comics was growing dissatisfied with the way its characters were being presented on-screen in critical flops like 2003’s Daredevil and 2005’s Fantastic Four. So Marvel Studios President Kevin Feige—who handled TV and film rights for the comic book company—came up with a plan: Marvel would simply start making its own films with the characters it still owned the screen rights to—a handful of relatively unknown heroes who made up a famed comic book team called The Avengers. The studio would also replicate a comic book concept introduced by Marvel creators Jack Kirby, Steve Ditko, and Stan Lee back in the 1960s: These movies would all share one continuity, now known as the “Marvel Cinematic Universe”.</p>
    </div>
    <Slider id="slider1"></Slider>
    <MoviesPortal id="mp"></MoviesPortal>
    <CharactersPortal id="cp"></CharactersPortal>
    <ComicsPortal id="comics-portal"></ComicsPortal>
    <YTModal v-if="showModal" @close="showModal = false" :modalURL="modalURL"></YTModal>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue';
import MoviesPortal from '@/components/MoviesPortal.vue';
import CharactersPortal from '@/components/CharactersPortal.vue';
import ComicsPortal from '@/components/ComicsPortal.vue';
import YTModal from '@/components/YTModal.vue';
import eventBus from '@/main';

export default {
  name: 'home',
  components: {
    Slider,
    MoviesPortal,
    CharactersPortal,
    ComicsPortal,
    YTModal,
  },
  data() {
    return {
      showModal: false,
      modalURL: '',
    };
  },
  created() {
    eventBus.$on('openModal', (url) => {
      this.showModal = true;
      this.modalURL = url[0];
    });
  },
};
</script>

<style>
#home {
  grid-row-start: 2;
  grid-row-end: 13;
  grid-column-start: 1;
  grid-column-end: 13;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 150px repeat(16, 1fr);
  min-height: 0;
  min-width: 0;
  grid-gap: 10px;
}
#slider1 {
  grid-column: 5 / 9;
  grid-row: 2 / 4;
  min-width: 0;
}
#background {
  z-index: -1;
  opacity: 0.3;
  width: 100%;
  grid-column: 1 / 13;
  grid-row: 1 / 6;
}
#mp {
  grid-column: 3 / 11;
  grid-row: 9 / 12;
  min-width: 0;
}
#cp {
  grid-column: 3 / 11;
  grid-row: 13 / 15;
  min-width: 0;
}
#comics-portal {
  grid-column: 3 / 11;
  grid-row: 15 / 17;
  min-width: 0;
}
.thumbnails {
  width: 55%;
  border-radius: 50%;
}
.comic-thumbnails {
  width: 55%;
}
.highlighted {
  border-style: solid;
  border-color: aliceblue;
  text-align: center;
}
#blurb {
  font-family: 'Open Sans', sans-serif;
  grid-column: 3 / 11;
  grid-row: 6 / 8;
  text-align: center;
}
#blurb > p {
  text-align: center;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgb(95, 87, 87);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* @media (max-width: 1850px) {
  #blurb{
    grid-column: 7 / 11;
    grid-row: 1 /3;
  }
} */
</style>
