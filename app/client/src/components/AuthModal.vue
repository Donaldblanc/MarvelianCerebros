<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container">
          <div class="modal-body">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" @click="$emit('close')">
                x
            </button>
            </slot>
          </div>
            <input id="txtEmail">
            <input id="txtPassword">
            <button id="btnLogin" @click="login">Login</button>
            <button id="btnSignUp">Sign Up</button>
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
}
</script>

<style>

</style>
