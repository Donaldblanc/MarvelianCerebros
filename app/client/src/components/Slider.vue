<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-for="number in [currentNumber]" :key='number'>
        <img :src="currentImage"
        @mouseover="stopRotation" @mouseout="startRotation"/>
        <h1>{{ heroes[Math.abs(currentNumber) % heroes.length] }}</h1>
      </div>
    </transition>
    <button>SEE THE COMIC</button>
    <span><a @click="prev" href='#'>&#8656;</a> | | <a @click="next" href='#'>&#8658;</a></span>
  </div>
</template>

<script>
import spiderman from '../assets/spiderman.png';
import hulk from '../assets/hulk.png';
import cap from '../assets/captain america.png';

export default {
  name: 'Slider',
  data() {
    return {
      images: [spiderman, hulk, cap],
      heroes: ['Spiderman', 'Hulk', 'Captain America'],
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
  },
  computed: {
    currentImage() {
      return this.images[Math.abs(this.currentNumber) % this.images.length];
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
