<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.8267 27.7467C16.3733 27.9067 15.6267 27.9067 15.1733 27.7467C11.3067 26.4267 2.66666 20.92 2.66666 11.5867C2.66666 7.46666 5.98666 4.13333 10.08 4.13333C12.5067 4.13333 14.6533 5.30666 16 7.12C16.685 6.1945 17.5773 5.4423 18.6053 4.92366C19.6333 4.40501 20.7685 4.13434 21.92 4.13333C26.0133 4.13333 29.3333 7.46666 29.3333 11.5867C29.3333 20.92 20.6933 26.4267 16.8267 27.7467Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps(['stroke', 'fill'])
</script>

<style scoped></style>
