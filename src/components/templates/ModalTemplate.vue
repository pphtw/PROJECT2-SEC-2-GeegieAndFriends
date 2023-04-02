<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
})
defineEmits(['hideModal'])
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="showModal"
        class="absolute top-0 left-0 w-screen h-screen bg-gray-900/50 flex items-center justify-center z-[999]"
        @click.self="$emit('hideModal')"
      >
        <div
          class="flex flex-col background-overlay shadow-xl w-[60%] h-2/5 overflow-y-scroll no-scrollbar-full"
          style="max-width: 700px"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 0.3s ease-in;
}

.v-leave-active {
  transition: opacity 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
