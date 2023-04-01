<script setup>
import ContentSection from '@/components/templates/ContentSection.vue'
import PageTemplate from '@/components/templates/PageTemplate.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import CollaboratorGrid from '@/components/UI/organisms/CollaboratorGrid.vue'
</script>

<template>
  <PageTemplate>
    <ContentSection class="overflow-y-scroll no-scrollbar-full">
      <template v-slot:header>
        <div class="flex flex-row justify-between">
          <SectionHeader
            input-text-header="Our Team Members"
            font-size="text-6xl"
          />
        </div>
      </template>
      <CollaboratorGrid />
    </ContentSection>
  </PageTemplate>
</template>

<style scoped>
:deep(.container-gradient) {
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
