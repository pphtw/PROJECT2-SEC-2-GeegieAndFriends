<script setup>

// Conponents
import HomeContainer from './components/HomeContainer/HomeContainer.vue'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
</script>
<template>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#162750]"
  >
    <!-- #NavigationBar -->
    <NavigationBar />
    <!-- #HomeContainer -->
    <HomeContainer />
  </div>
</template>
<style scoped>
.progress-bar {
  height: 0.4em;
  width: 100%;
  top: -2em;
  bottom: -2em;
  cursor: pointer;
  background-color: #b9b9b9;
}

.progress-current {
  height: inherit;
  width: 0;
  background-color: #c493e1;
  border-radius: 0 2em 2em 0;
}
.is-playing,
.is-playing:hover {
  background-color: #eedff6;
}
.container-gradient {
  background-image: linear-gradient(
    0deg,
    hsl(228deg 39% 29%) 0%,
    hsl(228deg 39% 32%) 33%,
    hsl(229deg 39% 34%) 47%,
    hsl(230deg 39% 37%) 58%,
    hsl(230deg 39% 40%) 67%,
    hsl(231deg 39% 43%) 74%,
    hsl(232deg 38% 46%) 81%,
    hsl(233deg 38% 49%) 87%,
    hsl(235deg 41% 53%) 93%,
    hsl(236deg 46% 56%) 100%
  );
}
</style>
