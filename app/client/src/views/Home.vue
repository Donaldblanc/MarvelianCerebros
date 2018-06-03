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
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue';
import MoviesPortal from '@/components/MoviesPortal.vue';

export default {
  name: 'home',
  components: {
    Slider,
    MoviesPortal,
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
  grid-template-rows: 150px repeat(13, 1fr);
  min-height: 0;
  min-width: 0;
}
#slider1 {
  grid-column: 2 / 6;
  grid-row: 2 / 4;
  min-width: 0;
}
#background {
  z-index: -1;
  opacity: 0.3;
  width: 100%;
  grid-column: 1 / 13;
  grid-row: 1 / 6;
  height: 100%;
}
#mp {
  grid-column: 1 / 13;
  grid-row: 6 / 15;
}
#blurb {
  font-family: 'Open Sans', sans-serif;
  grid-column: 8 / 11;
  grid-row: 2 / 5;
  text-align: center;
}
#blurb > p {
  text-align: right;
}
@media (max-width: 1850px) {
  #blurb{
    grid-column: 7 / 11;
    grid-row: 1 /3;
  }
}
</style>
