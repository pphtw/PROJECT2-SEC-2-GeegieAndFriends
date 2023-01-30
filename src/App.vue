<script setup>
const playlist = [
  {
    name: "Matsuri",
    artist: "Fuji Kaze",
    cover:
      "https://e.snmc.io/i/600/s/5126c31850a2de84d4d561c1c45cdeac/9808581/%E8%97%A4%E4%BA%95%E9%A2%A8-fujii-kaze-%E3%81%BE%E3%81%A4%E3%82%8A-matsuri-Cover-Art.jpg",
    source: "../src/assets/tracks/matsuri.mp3",
    favorited: false,
  },
  {
    name: "Double take",
    artist: "dhruv",
    cover: "https://i.scdn.co/image/ab67616d0000b273834f16100678d3e800fb5fb9",
    source: "../src/assets/tracks/double_take.mp3",
    favorited: false,
  },
  {
    name: "Recall",
    artist: "bowkylion",
    cover:
      "https://e.snmc.io/i/600/s/8551a37b85a88cff3cd699d7b0bd74f2/10164638/bowkylion-%E0%B8%A7%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B9%89-recall-Cover-Art.jpg",
    source: "../src/assets/tracks/recall.mp3",
    favorited: false,
  },
];
</script>

<template>
  <div class="flex w-screen h-screen bg-[#2D3967]">
    <!-- Navbar -->
    <div
      class="flex flex-col justify-center row-span-6 gap-5 items-center w-24 h-full bg-[#162750]"
    >
      <!-- Home Icon -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17.99V14.99M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Search Icon -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5H20M14 8H17M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2M22 22L20 20"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Playlist Icon -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 13V17C22 20.5 20 22 17 22H7C4 22 2 20.5 2 17V13C2 10.35 3.15 8.85 5 8.28C5.6 8.09 6.27 8 7 8H17C17.73 8 18.4 8.09 19 8.28C20.85 8.85 22 10.35 22 13Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 7V8.28C18.4 8.09 17.73 8 17 8H7C6.27 8 5.6 8.09 5 8.28V7C5 5.9 5.9 5 7 5H17C18.1 5 19 5.9 19 7ZM16 3.51V5H8V3.51C8 2.68 8.68 2 9.51 2H14.49C15.32 2 16 2.68 16 3.51Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.07 19.4501C9.42009 19.4501 9.75583 19.311 10.0034 19.0634C10.2509 18.8159 10.39 18.4801 10.39 18.1301C10.39 17.78 10.2509 17.4442 10.0034 17.1967C9.75583 16.9491 9.42009 16.8101 9.07 16.8101C8.71991 16.8101 8.38417 16.9491 8.13662 17.1967C7.88907 17.4442 7.75 17.78 7.75 18.1301C7.75 18.4801 7.88907 18.8159 8.13662 19.0634C8.38417 19.311 8.71991 19.4501 9.07 19.4501Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.25 17.25V12.08C15.25 10.98 14.56 10.82 13.86 11.02L11.21 11.74C10.73 11.87 10.4 12.25 10.4 12.8V18.13"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4 14.35L15.25 13.03M13.93 18.57C14.2801 18.57 14.6159 18.431 14.8634 18.1834C15.111 17.9359 15.25 17.6001 15.25 17.25C15.25 16.8999 15.111 16.5642 14.8634 16.3166C14.6159 16.0691 14.2801 15.93 13.93 15.93C13.5799 15.93 13.2442 16.0691 12.9966 16.3166C12.7491 16.5642 12.61 16.8999 12.61 17.25C12.61 17.6001 12.7491 17.9359 12.9966 18.1834C13.2442 18.431 13.5799 18.57 13.93 18.57Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Copyright Icon -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.88 15C14.1508 15.6431 13.2123 15.9986 12.24 16C10.03 16 8.23999 14.21 8.23999 12C8.23999 9.79 10.03 8 12.24 8C13.2123 8.0014 14.1508 8.35689 14.88 9"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Setting Icon -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.8041 19.9691 5.48558 19.5554 5.35435 19.0698C5.22311 18.5843 5.28988 18.0665 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <!-- Content -->
    <div class="w-content h-full gap-6 px-28 py-10 flex flex-col">
      <!-- Header & Playlist -->
      <div class="h-1/3">
        <!-- Header -->
        <div class="grid grid-cols-12 pb-3">
          <h1 class="text-2xl font-bold text-white">YourStyle</h1>
          <div class="col-end-13 flex justify-end gap-2">
            <!-- Next & Previous Icon -->
            <svg
              class="hover:scale-110 transition ease-in-out"
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
            <svg
              class="hover:scale-110 transition ease-in-out"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" rx="25" fill="#E5E5E5" />
              <path
                d="M23.1398 15.4316L23.1402 15.4318L27.5787 17.8336L32.0166 20.2351C32.0168 20.2352 32.0169 20.2353 32.0171 20.2354C34.6396 21.657 35.75 23.4178 35.75 25C35.75 26.5823 34.6395 28.3432 32.0166 29.7649L27.5787 32.1664L23.1402 34.5682L23.1398 34.5684C20.5247 35.9859 18.3068 36.0327 16.7934 35.2113C15.2957 34.3984 14.25 32.6039 14.25 29.8036V25V20.1964C14.25 17.3961 15.2957 15.6016 16.7934 14.7887C18.3068 13.9673 20.5247 14.0141 23.1398 15.4316Z"
                stroke="black"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <!-- Playlist -->
        <div class="h-3/4 grid grid-cols-12 gap-5 text-center">
          <div
            class="flex flex-col justify-center col-span-3 bg-blue-500 rounded-2xl hover:bg-blue-400 transition ease-in-out"
          >
            <p class="text-white text-lg font-semibold">Playlist Name</p>
          </div>
          <div
            class="flex flex-col justify-center col-span-3 bg-blue-500 rounded-2xl hover:bg-blue-400 transition ease-in-out"
          >
            <p class="text-white text-lg font-semibold">Playlist Name</p>
          </div>
          <div
            class="flex flex-col justify-center col-span-3 bg-blue-500 rounded-2xl hover:bg-blue-400 transition ease-in-out"
          >
            <p class="text-white text-lg font-semibold">Playlist Name</p>
          </div>
          <div
            class="flex flex-col justify-center col-span-3 bg-blue-500 rounded-2xl hover:bg-blue-400 transition ease-in-out"
          >
            <p class="text-white text-lg font-semibold">Playlist Name</p>
          </div>
        </div>
      </div>
      <!-- MusicPlaying & Trending -->
      <div class="h-2/3">
        <!-- Music Playing -->
        <div class="grid grid-cols-12 gap-5 h-full">
          <div class="flex flex-col col-span-3">
            <h1 class="text-2xl font-bold pb-1.5 text-white">Now Playing</h1>
            <div class="grow flex flex-col bg-[#E5E5E5] rounded-2xl h-[25rem]">
              <div
                class="grow h-3/5 bg-cover rounded-t-2xl"
                :style="{ backgroundImage: `url(${playlist[0].cover})` }"
              ></div>
              <div
                class="flex flex-col justify-center items-center gap-2 h-2/5 bg-[#E5E5E5] rounded-b-2xl"
              >
                <!-- Title Name -->
                <div class="pt-2 text-center">
                  <h1 class="text-2xl font-bold">{{ playlist[0].name }}</h1>
                  <h3 class="font-semibold">{{ playlist[0].artist }}</h3>
                </div>
                <!-- Time Counter -->
                <div class="flex w-fit items-center">
                  <p class="px-2 text-sm">00:00</p>
                  <div>
                    <svg
                      width="139"
                      height="4"
                      viewBox="0 0 139 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="1"
                        width="138"
                        height="2"
                        rx="1"
                        fill="#171717"
                      />
                      <rect
                        x="0.5"
                        y="1"
                        width="138"
                        height="2"
                        rx="1"
                        stroke="#171717"
                      />
                    </svg>
                  </div>

                  <p class="px-2 text-sm">00:00</p>
                </div>
                <!-- Icons -->
                <div class="flex justify-around items-center gap-3 pb-4">
                  <!-- Shuffle Icon -->
                  <div>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 23.9733L7.4 23.9867C8.61333 23.9867 9.74667 23.3867 10.4133 22.3867L18.9333 9.61332C19.2632 9.11738 19.7115 8.71142 20.2376 8.43208C20.7637 8.15274 21.351 8.00882 21.9467 8.01332L28.0133 8.03999M25.3333 26.64L28 23.9733M11.8533 11.4933L10.4133 9.49332C10.0803 9.0271 9.63983 8.64798 9.12924 8.38803C8.61864 8.12809 8.05293 7.99499 7.48 7.99999L4 8.01332M17.2933 20.5067L18.92 22.6C19.6 23.48 20.6667 24 21.7867 24L28.0133 23.9733M28 8.02665L25.3333 5.35999"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <!-- Previous Icon -->
                  <div>
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.26336 7.77156L5.26336 24.2516M27.2367 22.3849L27.2367 9.62489C27.2367 7.01156 24.3967 5.37156 22.13 6.67823L16.5967 9.86489L11.0634 13.0649C8.79669 14.3716 8.79669 17.6382 11.0634 18.9449L16.5967 22.1449L22.13 25.3316C24.3967 26.6382 27.2367 25.0116 27.2367 22.3849Z"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <!-- Play/Pause Icon -->
                  <div>
                    <svg
                      width="51"
                      height="50"
                      viewBox="0 0 51 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        width="50"
                        height="50"
                        rx="25"
                        fill="#C493E1"
                      />
                      <path
                        d="M23.6402 15.4318L23.6398 15.4316C21.0247 14.0141 18.8068 13.9673 17.2934 14.7887C15.7957 15.6016 14.75 17.3961 14.75 20.1964V25V29.8036C14.75 32.6039 15.7957 34.3984 17.2934 35.2113C18.8068 36.0327 21.0247 35.9859 23.6398 34.5684L23.6402 34.5682L28.0787 32.1664L32.5166 29.7649L23.6402 15.4318ZM23.6402 15.4318L28.0787 17.8336M23.6402 15.4318L28.0787 17.8336M28.0787 17.8336L32.5166 20.2351M28.0787 17.8336L32.5166 20.2351M32.5166 20.2351C35.1395 21.6568 36.25 23.4177 36.25 25C36.25 26.5822 35.1396 28.343 32.5171 29.7646L32.5166 20.2351Z"
                        stroke="#E5E5E5"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <!-- Skip Icon -->
                  <div>
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.7366 24.24L27.7366 7.76004M5.76331 9.6267L5.76331 22.3867C5.76331 25 8.60331 26.64 10.87 25.3334L16.4033 22.1467L21.9366 18.9467C24.2033 17.64 24.2033 14.3734 21.9366 13.0667L16.4033 9.8667L10.87 6.68004C8.60331 5.37337 5.76331 7.00004 5.76331 9.6267Z"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <!-- Loop Icon -->
                  <div>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.54401 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.98665 2.66663L4.77332 6.87996L8.98665 11.0933M27.2266 25.12H8.77332C6.55998 25.12 4.77332 23.3333 4.77332 21.12V16.6933"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.0133 29.3333L27.2266 25.1199L23.0133 20.9066"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Trending -->
          <div class="flex flex-col col-span-9 h-full">
            <h1 class="text-2xl text-white font-bold pb-1">Trending</h1>
            <div class="grow rounded-2xl overflow-y-scroll pr-2 h-[20rem]">
              <!-- Song List -->
              <!-- for-loop here -->
              <div
                class="flex items-center mb-2 h-fit bg-[#E5E5E5] hover:bg-gray-300 transition ease-in-out rounded-2xl"
                v-for="(tracks, index) in playlist"
                :key="index"
              >
                <!-- Soung Count -->
                <div class="w-12">
                  <h1 class="text-center font-semibold">{{ index + 1 }}</h1>
                </div>
                <!-- Song Cover -->
                <div class="w-14">
                  <img :src="tracks.cover" />
                </div>
                <!-- Title & Artist -->
                <div class="grow grid grid-rows-2 h-fit pl-5">
                  <h1 class="row-span-1 text-xl font-bold">
                    {{ tracks.name }}
                  </h1>
                  <h1 class="row-span-1 font-semibold">
                    {{ tracks.artist }}
                  </h1>
                </div>
                <!-- Time Counter -->
                <div class="px-3 font-semibold">00.00</div>
                <!-- Heart Icon -->
                <div class="px-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8267 27.7467C16.3733 27.9067 15.6267 27.9067 15.1733 27.7467C11.3067 26.4267 2.66666 20.92 2.66666 11.5867C2.66666 7.46666 5.98666 4.13333 10.08 4.13333C12.5067 4.13333 14.6533 5.30666 16 7.12C16.685 6.1945 17.5773 5.4423 18.6053 4.92366C19.6333 4.40501 20.7685 4.13434 21.92 4.13333C26.0133 4.13333 29.3333 7.46666 29.3333 11.5867C29.3333 20.92 20.6933 26.4267 16.8267 27.7467Z"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <!-- More Icon -->
                <div class="px-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0001 14C13.1046 14 14.0001 13.1046 14.0001 12C14.0001 10.8954 13.1046 10 12.0001 10C10.8955 10 10.0001 10.8954 10.0001 12C10.0001 13.1046 10.8955 14 12.0001 14Z"
                      fill="#231F20"
                    />
                    <path
                      d="M19.0001 14C20.1046 14 21.0001 13.1046 21.0001 12C21.0001 10.8954 20.1046 10 19.0001 10C17.8955 10 17.0001 10.8954 17.0001 12C17.0001 13.1046 17.8955 14 19.0001 14Z"
                      fill="#231F20"
                    />
                    <path
                      d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                      fill="#231F20"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-playlist {
  background: url(ace11a71fb7f211b905336bdef4c122f.png);
}
</style>
