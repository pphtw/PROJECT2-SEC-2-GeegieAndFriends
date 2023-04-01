<template>
    <div class="flex flex-col rounded-2xl bg-gray-600 h-full animate-pulse">
        <!-- MusicCover -->
        <div
                class="h-full bg-cover bg-center rounded-t-2xl aspect-auto animate-pulse bg-gradient-to-tr"
        ></div>
        <!-- MusicTitle&Controller -->
        <div class="flex flex-col gap-1 justify-around items-center h-fit bg-white rounded-b-2xl">
            <!-- MusicTitle&Artist -->
            <div class="relative text-center h-8 w-[80%] overflow-x-hidden">
            </div>
            <div class="text-center h-fit w-[70%]">
                <h3 class="font-semibold w-full">
                    <div class="animate-pulse h-2 bg-slate-700 rounded">&nbsp;</div>
                </h3>
            </div>
            <!-- Controller -->
            <div class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6 "></div>
        </div>
    </div>
</template>
