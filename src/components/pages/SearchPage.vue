<script setup>
    import SingleTrack from '../UI/organisms/SingleTrack.vue';
    import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue';
    import NavigationBar from '../UI/organisms/NavigationBar.vue';
    import SearchIcon from '../UI/atoms/SearchPageButton.vue'
</script>
 
<template>
<div 
    class="w-screen h-screen flex flex-row bg-[#3f5586]"
>
<NavigationBar/>
    <div class="w-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-2 grid-rows-3">
    <!-- #SearchBarSection -->
    <div class="h-10 flex rounded-full bg-[#E5E5E5] gap-3 px-3 py-1.5">
        <SearchIcon 
            stroke="black"
            class="flex-none self-center"
        />
        <input
            class="bg-transparent flex-1" 
            type="text w-full" 
            placeholder="What do you want to listen to?"/>
    </div>

    <!-- #FilterSection -->
    <div class="bg-slate-500">
        
    </div>

    <!-- #TrackSection -->
    <div class="bg-slate-500">
        <!-- <SingleTrack/> -->
    </div>

    <!-- #PlaylistSection -->
    <div class="bg-slate-500">

    </div>

    <!-- #MusicPlayerCardSection -->
    <div class="bg-slate-500">

    </div>
    </div>
</div>
</template>
 
<style scoped>

</style>