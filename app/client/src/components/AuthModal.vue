<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" style="border: none; background-color: inherit; cursor: pointer" @click="$emit('close')">
                x
            </button>
            </slot>
          </div>
          <div class="modal-body">
            <input id="txtEmail" v-model="txtEmail" placeholder="Email" style="height: 50px; font-size: 20px; background-color: inherit; border: none; ">
            <input id="txtPassword" type="password" v-model="txtPassword" style="height: 50px; font-size: 20px; background-color: inherit; border: none; " placeholder="Password">
            <input id="txtUsername" v-model="txtUsername" style="height: 50px; font-size: 20px; background-color: inherit; border: none; " placeholder="Username">
            <p>{{ status }}</p>
            <button id="btnLogin" @click="login">Login</button>
            <button id="btnSignUp" @click="signup">Sign Up</button>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
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
      txtUsername: '',
      status: '',
    };
  },
  methods: {
    login() {
      Firebase.auth().signInWithEmailAndPassword(this.txtEmail, this.txtPassword).then(
        (user) => {
          this.status = 'Logged in';
        },
        (err) => {
          this.status = 'Oops' + err.message;
        }
      );
    },
    signup() {
      Firebase.auth().createUserWithEmailAndPassword(this.txtEmail, this.txtPassword).then(
        (user) => {
          alert('Account created');
          user.set({displayName: this.txtUsername});
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
.modal-container {
  background-color: crimson;
}
#btnLogin {
  border: none;
  background-color: rgb(86, 128, 128);
  font-size: 15px;
  cursor: pointer;
  color: rgb(203, 206, 209);
  padding: 5px;
  border-radius: 5px;
}
#btnSignUp {
  border: none;
  margin-left: 15px;
  background-color: rgb(86, 128, 128);
  font-size: 15px;
  cursor: pointer;
  color: rgb(203, 206, 209);
  padding: 5px;
  border-radius: 5px;
}
</style>