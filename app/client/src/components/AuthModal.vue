<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" @click="$emit('close')">
                x
            </button>
            </slot>
          </div>
            <input id="txtEmail" v-model="txtEmail">
            <input id="txtPassword" v-model="txtPassword">
            <button id="btnLogin" @click="login">Login</button>
            <button id="btnSignUp" @click="signup">Sign Up</button>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
import Firebase from 'firebase';


export default {
  name: 'AuthModal',
  data() {
    return {
      txtEmail: '',
      txtPassword: '',
    };
  },
  methods: {
    login() {
      Firebase.auth().signInWithEmailAndPassword(this.txtEmail, this.txtPassword).then(
        (user) => {
          alert('Logged in');
        },
        (err) => {
          alert('Oops' + err.message);
        }
      );
    },
    signup() {
      Firebase.auth().createUserWithEmailAndPassword(this.txtEmail, this.txtPassword).then(
        (user) => {
          alert('Account created');
        },
        (err) => {
          alert('Oops' + err.message);
        }
      );
    },
  },
};
</script>

<style>

</style>
