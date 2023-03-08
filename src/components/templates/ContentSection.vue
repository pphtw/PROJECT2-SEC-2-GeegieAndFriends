<script setup></script>

<template>
  <div
    class="col-span-1 row-span-1 max-sm:w-full sm:row-auto sm:flex sm:flex-col sm:justify-start sm:h-full max-sm:place-self-center"
  >
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<style scoped></style>
