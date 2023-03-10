<script setup>
const props = defineProps({
  previous:{
    type:Object,
    required:true
  }
})

</script>
<template>
    <svg
        class="hover:scale-110 cursor-pointer transition ease-in-out"
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="#E5E5E5" />
      <path
          d="M26.8602 34.5684L26.8598 34.5682L22.4213 32.1664L17.9834 29.7649C17.9832 29.7648 17.9831 29.7647 17.9829 29.7646C15.3604 28.343 14.25 26.5822 14.25 25C14.25 23.4177 15.3605 21.6568 17.9834 20.2351L22.4213 17.8336L26.8598 15.4318L26.8602 15.4316C29.4753 14.0141 31.6932 13.9673 33.2066 14.7887C34.7043 15.6016 35.75 17.3961 35.75 20.1964V25V29.8036C35.75 32.6039 34.7043 34.3984 33.2066 35.2113C31.6932 36.0327 29.4753 35.9859 26.8602 34.5684Z"
          stroke="black"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
      />
    </svg>

</template>
