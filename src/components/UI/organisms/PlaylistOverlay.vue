<script setup>
import ContentSection from '../../templates/ContentSection.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import PreviousPageButton from '../atoms/PreviousPageButton.vue'
import PlayPauseButton from '../atoms/PlayPauseButton.vue'
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
const props = defineProps({
  isClicked: { type: Boolean, required: true },
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="isClicked"
        class="absolute top-0 left-0 w-screen h-screen bg-gray-900/50 flex items-center justify-center z-[999]"
        @click.self="$emit('closeOverlay')"
      >
        <div
          class="grid grid-rows-[1fr_2fr] background-overlay shadow-xl w-full h-full overflow-hidden"
          style="max-width: 1000px"
        >
          <div class="md:flex w-full row-span-1 p-10">
            <ContentSection class="min-h-full">
              <template v-slot:header>
                <div class="flex flex-row justify-between">
                  <PreviousPageButton @click="$emit('closeOverlay')" /></div
              ></template>

              <div class="w-full h-full grid grid-cols-[1fr_2fr] gap-x-5">
                <div class="bg-white aspect-square w-full"></div>
                <div class="flex h-full items-center">
                  <div class="grow text-left text-white pt-20">
                    <h1 class="text-6xl pb-5">Playlist Name #1</h1>
                    <p class="text-2xl">(Owner) | (n) Song</p>
                  </div>
                </div>
              </div>
            </ContentSection>
          </div>
          <div class="md:flex w-full row-span-1 p-10">
            <ContentSection class="min-h-full">
              <template v-slot:header>
                <div
                  class="flex flex-row justify-start w-full gap-x-5 items-center"
                >
                  <PlayPauseButton class="w-20 h-20" /><LikeButton
                    class="w-10 h-10"
                  /><MenuButton class="w-10 h-10" /></div
              ></template>

              <div class="w-full h-full grid grid-cols-[1fr_2fr] gap-x-5"></div>
            </ContentSection>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.background-overlay {
  background: linear-gradient(180deg, #162750 0%, #171717 100%);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
