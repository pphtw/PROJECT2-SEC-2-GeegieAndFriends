<script>
export default{
  data() {
      return{
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks:[
          {
            song : "Matsuri",
            artist : "Fuji Kaze",
            cover : "https://e.snmc.io/i/600/s/5126c31850a2de84d4d561c1c45cdeac/9808581/%E8%97%A4%E4%BA%95%E9%A2%A8-fujii-kaze-%E3%81%BE%E3%81%A4%E3%82%8A-matsuri-Cover-Art.jpg",
            url : "/src/assets/tracks/matsuri.mp3",
            favorited : false
          },
          {
            song : "a",
            artist : "Fuji Kaze",
            cover : "../src/assets/img/matsuri.jpg",
            url : "",
            favorited : false
          }
        ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
      };
    },
methods: {
  favorite() {
    
  }
  }
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-700">

    <!-- Song Card -->
    <div id="card" class="w-60 h-80  rounded-md bg-gray-300">
      
      <!-- Song Image -->
      <div class="flex justify-center items-center">
        <img id="song-cover" class="w-full h-48 object-cover rounded-t-md" :src="`${tracks[0].cover}`">
      </div>
      
      <!-- Song Details -->
      <div class="text-center pt-7">
        <h2 id="music-name" >{{tracks[0].song}}</h2>
        <p id="music">{{tracks[0].artist}}</p>
      </div>

      <!-- Audio -->
      <audio controls>
        <source :src="`${tracks[0].url}`" type="audio/mpeg">
      </audio>

      <!-- Track Time -->
      <div class="flex justify-center items-center pt-1">
        <!-- <div class="time-font-size flex-none pr-2 pl-10">00:00</div>
          <div class="flex-end w-full bg-gray-200 h-1 mx-1 rounded-full">
            <div class="bg-gray-600 h-1 rounded-full" style="width: 45%"></div>
          </div>
        <div class="time-font-size flex-none pl-2 pr-10">00:00</div> -->
        <input type="range" value="0" id="progress">
      </div>

      <!-- Play Pause -->
      <div class="grid grid-cols-5 gap-5 content-center pt-2 pr-4 pl-4">
        <div class="random-track"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 23.9733L7.4 23.9867C8.61333 23.9867 9.74667 23.3867 10.4133 22.3867L18.9333 9.61332C19.2632 9.11738 19.7115 8.71142 20.2376 8.43208C20.7637 8.15274 21.351 8.00882 21.9467 8.01332L28.0133 8.03999M25.3333 26.64L28 23.9733M11.8533 11.4933L10.4133 9.49332C10.0803 9.0271 9.63983 8.64798 9.12924 8.38803C8.61864 8.12809 8.05293 7.99499 7.48 7.99999L4 8.01332M17.2933 20.5067L18.92 22.6C19.6 23.48 20.6667 24 21.7867 24L28.0133 23.9733M28 8.02665L25.3333 5.35999" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <div class="prev-track"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.01336 7.77156L5.01336 24.2516M26.9867 22.3849L26.9867 9.62489C26.9867 7.01156 24.1467 5.37156 21.88 6.67823L16.3467 9.86489L10.8134 13.0649C8.54669 14.3716 8.54669 17.6382 10.8134 18.9449L16.3467 22.1449L21.88 25.3316C24.1467 26.6382 26.9867 25.0116 26.9867 22.3849Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <div class="playpause-track"><svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="19" fill="white"/>
          <path d="M5.33334 16V11.2534C5.33334 5.36002 9.50668 2.94669 14.6133 5.89336L18.7333 8.26669L22.8533 10.64C27.96 13.5867 27.96 18.4134 22.8533 21.36L18.7333 23.7334L14.6133 26.1067C9.50668 29.0534 5.33334 26.64 5.33334 20.7467V16Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <div class="next-track"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9867 24.24L26.9867 7.75998M5.01334 9.62664L5.01334 22.3866C5.01334 25 7.85334 26.64 10.12 25.3333L15.6533 22.1466L21.1867 18.9466C23.4533 17.64 23.4533 14.3733 21.1867 13.0666L15.6533 9.86664L10.12 6.67998C7.85334 5.37331 5.01334 6.99998 5.01334 9.62664Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <div class="repeat-track"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.98666 2.66669L4.77333 6.88002L8.98666 11.0934M27.2267 25.12H8.77333C6.56 25.12 4.77333 23.3334 4.77333 21.12V16.6934" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#progress{
  -webkit-appearance: none;
  width: 80%;
  height: 5px;
  background: #c2c1c2;
  cursor: pointer;
  margin: 40px 0;
}
#progress::-webkit-slider-thumb{
  -webkit-appearance: none;

}
#music-name{
  font-size: 15px;
  font-weight: bold;
}
#music{
  font-size: 10px;
}
.time-font-size{
  font-size: 8px;
}

</style>
