<script setup></script>

<template>
  <div
    class="w-full h-fit xl:h-full grid grid-flow-row xl:grid-flow-col gap-6 my-12 xl:my-36"
  >
    <div class="relative group">
      <div
        class="bg-amber-300 bg-cover bg-no-repeat bg-center h-[90vh] xl:h-full"
        style="background-image: url(/img/New.jpeg)"
      ></div>
      <div
        class="absolute flex items-center top-0 h-[95vh] w-full bg-black/30 xl:h-full group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <h1 class="text-center w-full text-amber-300 font-bold text-5xl">
          New
        </h1>
      </div>
    </div>
    <div class="relative group">
      <div
        class="bg-emerald-300 bg-cover bg-no-repeat bg-center h-[90vh] xl:h-full"
        style="background-image: url(/img/Banlearit.jpg)"
      ></div>
      <div
        class="absolute flex items-center top-0 h-[95vh] w-full bg-black/30 xl:h-full group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <h1 class="text-center w-full text-emerald-300 font-bold text-5xl">
          GeeGie
        </h1>
      </div>
    </div>
    <div class="relative group">
      <div
        class="bg-sky-300 bg-cover bg-no-repeat bg-center h-[90vh] xl:h-full"
        style="background-image: url(/img/Siripoom.jpg)"
      ></div>
      <div
        class="absolute flex items-center top-0 h-[95vh] w-full bg-black/30 xl:h-full group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <h1 class="text-center w-full text-sky-300 font-bold text-5xl">Siri</h1>
      </div>
    </div>
    <div class="relative group">
      <div
        class="bg-fuchsia-300 bg-cover bg-no-repeat bg-center h-[90vh] xl:h-full"
        style="background-image: url(/img/Pream.jpg)"
      ></div>
      <div
        class="absolute flex items-center top-0 h-[95vh] w-full bg-black/30 xl:h-full group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <h1 class="text-center w-full text-fuchsia-300 font-bold text-5xl">
          Pream
        </h1>
      </div>
    </div>
  </div>
</template>
