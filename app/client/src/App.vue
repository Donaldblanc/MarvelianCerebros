<template>
  <div id="app">
    <div id="nav">
      <MC></MC>
        <router-link to="/" id="home-link">Home</router-link><router-link to="chat" id="chat-link">Chat</router-link>
        <span id="displayName">{{displayName}}</span>
        <button id="btnLoginSignUp" class="" @click="openAuthModal">Login or Sign Up</button>
        <button id="btnLogout" class="hide" @click="logout">Log Out</button>
    </div>
    <AuthModal v-if="showAuthModal" @close="showAuthModal = false"></AuthModal>
      <router-view></router-view>
  </div>
</template>

<script>
import MC from '@/components/MC.vue';
import Firebase from 'firebase';
import AuthModal from '@/components/AuthModal.vue';
import eventBus from '@/main';

const config = {
  apiKey: "AIzaSyDI0QzEY--AmU8EYqeBHdBWEOHauJhrCyc",
  authDomain: "marvelliancerebros2.firebaseapp.com",
  databaseURL: "https://marvelliancerebros2.firebaseio.com",
  projectId: "marvelliancerebros2",
  storageBucket: "",
  messagingSenderId: "115106650682",
};

Firebase.initializeApp(config);

// Firebase.auth().onAuthStateChanged(firebaseUser => {
//         if(firebaseUser){
//             console.log(firebaseUser);
//             alert(firebaseUser.email);
//             alert(firebaseUser.displayName);
//             btnLogout.classList.remove('hide')


//         }else{
//             console.log("user not logged in");
//             alert("user not logged in");
//             btnLogout.classList.add('hide');
//         }

// });

export default {
  name: 'App',
  data() {
    return {
      loggedInStatus: false,
      showAuthModal: false,
      email: '',
      displayName: '',
    };
  },
  created() {
    eventBus.$on('openAuthModal', () => {
      this.showAuthModal = true;
    });

    Firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.email = firebaseUser.email;
        this.displayName = firebaseUser.displayName;
        document.querySelector('#btnLogout').classList.remove('hide');
        document.querySelector('#btnLoginSignUp').classList.add('hide');
      } else {
        this.email = '';
        this.displayName = '';
        document.querySelector('#btnLogout').classList.add('hide');
        document.querySelector('#btnLoginSignUp').classList.remove('hide');
      }
    })

  },
  components: {
    MC,
    AuthModal,
  },
  methods: {
    openAuthModal() {
      eventBus.$emit('openAuthModal', true);
    },
    logout() {
      Firebase.auth().signOut();
    },
  },
};
</script>


<style>
body {
  background-color: #151517;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(245, 245, 245);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr repeat(11, 200px);
}
#nav {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 12;
  display: grid;
  grid-template-columns: 393px 50px 50px 50px auto repeat(7, 50px);
}

#nav a {
  font-weight: bold;
  color: rgb(86, 128, 128);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: crimson;
}
#home-link {
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  align-self: center;
  justify-self: center;
}
#chat-link {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
  align-self: center;
  justify-self: center;
}
#btnLoginSignUp {
  grid-row: 1 / 2;
  grid-column: 10 / 13;
  border: none;
  background-color: inherit;
  color: aliceblue;
  cursor: pointer;
}
#btnLogout {
  grid-row: 1 / 2;
  grid-column: 8 / 10;
  z-index: 2;
  background-color: inherit;
  border: none;
  color: aliceblue;
  cursor: pointer;
}
#displayName {
  grid-row: 1 / 2;
  grid-column: 5 / 6;
  align-self: center;
  justify-self: right;
}
.hide {
 display: none;
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
</style>
