<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-for="number in [currentNumber]" :key='number'>
        <img :src="currentImage"
        @mouseover="stopRotation" @mouseout="startRotation"/>
        <h1>{{ heroes[Math.abs(currentNumber) % heroes.length] }}</h1>
      </div>
    </transition>
    <button @click="getComic(currentComic)">SEE THE COMICS</button>
    <span><a @click="prev" href='#'>&#8656;</a> | | <a @click="next" href='#'>&#8658;</a></span>
  </div>
</template>

<script>
import eventBus from '@/main';
import spiderman from '../assets/spiderman.png';
import hulk from '../assets/hulk.png';
import cap from '../assets/captain america.png';
export default {
  name: 'Slider',
  data() {
    return {
      images: [spiderman, hulk, cap],
      heroes: ['Spiderman', 'Hulk', 'Captain America'],
      comicID: [1009610, 1009167, 1009220],
      currentNumber: 0,
    };
  },
  mounted() {
    this.startRotation();
  },
  methods: {
    startRotation() {
      this.timer = setInterval(this.next, 4000);
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    next() {
      this.currentNumber += 1;
    },
    prev() {
      this.currentNumber -= 1;
    },
    getComic(id) {
      eventBus.$emit('characterSelected', id);
    },
  },
  computed: {
    currentImage() {
      return this.images[Math.abs(this.currentNumber) % this.images.length];
    },
    currentComic() {
      return this.comicID[Math.abs(this.currentNumber) % this.comicID.length];
    },
  },
};
</script>

<style scoped>
img {
  height: 100%;
  order: 1;
}
h1 {
  order: 2;
  text-align: center;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
a {
  color: #E32636;
  text-decoration: none;
}
button {
  font-family: "Bowlby One SC", cursive;
  color: aliceblue;
  background-color: #568080;
  border: none;
  padding: 5px;
  order: 3;
  cursor: pointer;
}
span {
  order: 4;
  color: #E32636;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease;
  opacity: 1;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>