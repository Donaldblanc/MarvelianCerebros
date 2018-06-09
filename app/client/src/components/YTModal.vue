<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button class="modal-default-button" style="border: none; background-color: inherit; cursor: pointer" @click="$emit('close')">
                x
            </button>
            </slot>
          </div>
          <div class="modal-body">
            <iframe width="560" height="315" :src="modalURL" frameborder="0"
             allowfullscreen></iframe>
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
export default {
  name: 'YTModal',
  props: {
    modalURL: String,
  },
};
</script>

<style>
</style>