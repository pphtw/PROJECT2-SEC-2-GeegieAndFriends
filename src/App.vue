<script setup></script>

<template>
  <div class="flex w-screen h-screen">
    <!-- Navbar -->
    <div
      class="flex flex-col justify-center row-span-6 gap-5 items-center w-24 h-full border border-purple-800"
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
          d="M12 17.99V14.99M9.02 2.83999L3.63 7.03999C2.73 7.73999 2 9.22999 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28999 21.19 7.73999 20.2 7.04999L14.02 2.71999C12.62 1.73999 10.37 1.78999 9.02 2.83999Z"
          stroke="black"
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
          stroke="black"
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
          stroke="black"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 7V8.28C18.4 8.09 17.73 8 17 8H7C6.27 8 5.6 8.09 5 8.28V7C5 5.9 5.9 5 7 5H17C18.1 5 19 5.9 19 7ZM16 3.51V5H8V3.51C8 2.68 8.68 2 9.51 2H14.49C15.32 2 16 2.68 16 3.51Z"
          stroke="black"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.07 19.45C9.42009 19.45 9.75583 19.3109 10.0034 19.0634C10.2509 18.8158 10.39 18.4801 10.39 18.13C10.39 17.7799 10.2509 17.4442 10.0034 17.1966C9.75583 16.9491 9.42009 16.81 9.07 16.81C8.71991 16.81 8.38417 16.9491 8.13662 17.1966C7.88907 17.4442 7.75 17.7799 7.75 18.13C7.75 18.4801 7.88907 18.8158 8.13662 19.0634C8.38417 19.3109 8.71991 19.45 9.07 19.45Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.25 17.25V12.08C15.25 10.98 14.56 10.82 13.86 11.02L11.21 11.74C10.73 11.87 10.4 12.25 10.4 12.8V18.13"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4 14.35L15.25 13.03M13.93 18.57C14.2801 18.57 14.6159 18.4309 14.8634 18.1834C15.111 17.9358 15.25 17.6001 15.25 17.25C15.25 16.8999 15.111 16.5642 14.8634 16.3166C14.6159 16.0691 14.2801 15.93 13.93 15.93C13.5799 15.93 13.2442 16.0691 12.9966 16.3166C12.7491 16.5642 12.61 16.8999 12.61 17.25C12.61 17.6001 12.7491 17.9358 12.9966 18.1834C13.2442 18.4309 13.5799 18.57 13.93 18.57Z"
          stroke="black"
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
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.88 15C14.1508 15.6431 13.2123 15.9986 12.24 16C10.03 16 8.23999 14.21 8.23999 12C8.23999 9.79 10.03 8 12.24 8C13.2123 8.0014 14.1508 8.35689 14.88 9"
          stroke="black"
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
          stroke="black"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.8041 19.969 5.48558 19.5553 5.35435 19.0698C5.22311 18.5842 5.28988 18.0664 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
          stroke="black"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <!-- Content -->
    <div
      class="w-content h-full gap-10 px-28 py-10 flex flex-col border border-teal-900"
    >
      <!-- Header & Playlist -->
      <div class="h-fit">
        <h1 class="text-2xl font-bold pb-3">YourStyle</h1>
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-3 h-36 border border-red-700 rounded-lg">1</div>
          <div class="col-span-3 h-36 border border-red-700 rounded-lg">2</div>
          <div class="col-span-3 h-36 border border-red-700 rounded-lg">3</div>
          <div class="col-span-3 h-36 border border-red-700 rounded-lg">4</div>
        </div>
      </div>

      <div class="h-full">
        <div class="grid grid-cols-12 gap-5 h-full">
          <div class="col-span-3 border border-red-700 rounded-lg">
            NowPlaying
          </div>
          <div class="col-span-9 border border-red-700 rounded-lg">
            Trending
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
