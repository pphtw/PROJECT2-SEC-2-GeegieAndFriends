<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067"
      :stroke="attrsBinder(isActive, 'black', '#C493E1')"
      :stroke-width="attrsBinder(isActive, '1.5', '2.5')"
      :stroke-opacity="attrsBinder(isActive, 'default', '0.7')"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.98668 2.66667L4.77335 6.88L8.98668 11.0933M27.2267 25.12H8.77335C6.56001 25.12 4.77335 23.3333 4.77335 21.12V16.6933"
      :stroke="attrsBinder(isActive, 'black', '#C493E1')"
      :stroke-width="attrsBinder(isActive, '1.5', '2.5')"
      :stroke-opacity="attrsBinder(isActive, 'default', '0.7')"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067"
      :stroke="attrsBinder(isActive, 'black', '#C493E1')"
      :stroke-width="attrsBinder(isActive, '1.5', '2.5')"
      :stroke-opacity="attrsBinder(isActive, 'default', '0.7')"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { attrsBinder } from '@/lib/utils'

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
})
</script>
