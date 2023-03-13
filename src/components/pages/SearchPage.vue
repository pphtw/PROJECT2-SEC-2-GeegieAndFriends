<script setup>
import { computed } from 'vue';
import SingleTrack from '../UI/organisms/SingleTrack.vue';
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue';
import NavigationBar from '../UI/organisms/NavigationBar.vue';
import PlaylistCarousel from '../UI/organisms/PlaylistCarousel.vue';
import FilterButton from '../UI/atoms/FilterButton.vue';
import FilterSection from '../UI/molecules/FilterSection.vue';
import SearchBar from '../UI/molecules/SearchBar.vue';

const props = defineProps(['searchKeywords'])
console.log(props.searchKeywords);


const filteredList = computed(() => {
    return null
})

</script>
 
<template>
<div 
    class="w-screen h-screen flex flex-row bg-[#3f5586]"
>
<NavigationBar/>
    <div class="w-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-4">
       <div class="bg-slate-500 col-span-3 gap-y-3">
        <!-- #SearchBarSection -->
        <SearchBar/>

        <!-- #FilterSection -->
        <div class="bg-slate-500 flex gap-2 py-4">       
            <FilterSection/>
            <!-- <FilterButton filterName="All"/>
            <FilterButton filterName="Playlists"/>
            <FilterButton filterName="Artists"/>
            <FilterButton filterName="Profile"/>
            <FilterButton filterName="Songs"/>
            <FilterButton filterName="Albums"/> -->
        </div>

        <!-- #TrackSection -->
        <div 
        v-for="(track, index) in filteredList" 
        class="bg-red-500">
            <SingleTrack 
                :playlist="playlist"
                :track="track"
                :track-index="index"
            />
        </div>
       </div> 
       
       <div class="bg-slate-500">
        

        <!-- #PlaylistSection -->
        <div class="h-2/5">
            <PlaylistCarousel/>
        </div>

        <!-- #MusicPlayerCardSection -->
        <div class="h-3/5">
            <MusicPlayerCard/>
        </div>
       </div>

    </div>
</div>
</template>
 
<style scoped>

</style>