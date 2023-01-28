<script>

// const song = this.$refs.song
// const playpause = this.$refs.playpause
// const progress = this.$refs.progress

// song.onloadedmetadata = function() {
//   progress.max = song.duration;
//   progress.value = song.currentTime;
// }

export default{
  data() {
      return{
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      repeat: true,
      tracks:[
          {
            song : "Matsuri",
            artist : "Fuji Kaze",
            cover : "https://e.snmc.io/i/600/s/5126c31850a2de84d4d561c1c45cdeac/9808581/%E8%97%A4%E4%BA%95%E9%A2%A8-fujii-kaze-%E3%81%BE%E3%81%A4%E3%82%8A-matsuri-Cover-Art.jpg",
            url : "../src/assets/tracks/matsuri.mp3",
            favorited : false
          },
          {
            song : "Double take",
            artist : "dhruv",
            cover : "https://i.ytimg.com/vi/uQiF1yOnzDg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDqtWQ9HmywVnZ739mQlfJhwZJd0w",
            url : "../src/assets/tracks/double_take.mp3",
            favorited : false
          },
          {
            song : "Recall",
            artist : "bowkylion",
            cover : "https://i.ytimg.com/vi/a0M_QUS3kC0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVXzAd6hk7-5FggEjzhrI-6MaZ_Q",
            url : "../src/assets/tracks/recall.mp3",
            favorited : false
          }
        ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
      };
    },
  computed:{
    currentTrackSong(){
      if (this.currentTrackIndex !== null){
        return this.tracks[this.currentTrackIndex].song
      }
    },
    currentTrackArtist(){
      if (this.currentTrackIndex !== null){
        return this.tracks[this.currentTrackIndex].artist
      }
    }
  },
  methods: {
  favorite() {
  },
  play(){
    alert("yeah")
    if(this.audio.paused){
      this.audio.play();
      this.isTimerPlaying = true
    } else {
      this.audio.pause();
      this.isTimerPlaying = false
    }

  },
  playTrack(){
    this.isTimerPlaying = true
  },
  pauseTrack(){
    this.isTimerPlaying = false
  },
  prevTrack(){
    if (this.currentTrackIndex === 0){
      this.currentTrackIndex = this.tracks.length - 1
    }else {
      this.currentTrackIndex--
    }
  },
  nextTrack(){
    if (this.currentTrackIndex === this.tracks.length -1){
      this.currentTrackIndex = 0
    }else {
      this.currentTrackIndex++
    }
  },
  playRandom(){
    let randomIndex = Math.floor(Math.random() * this.tracks.length);
    if (randomIndex === this.currentTrackIndex){
      randomIndex = this.playRandom()
    }else {
      this.currentTrackIndex = randomIndex
    }

  },
  playLoop(){
    if (this.repeat){
      this.currentTrackIndex = this.currentTrackIndex
    }else if (this.currentTrackIndex !== this.tracks.length -1){
      this.currentTrackIndex++
    }
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
        <img id="song-cover" class="w-full h-48 object-cover rounded-t-md"
        v-if="currentTrackIndex !== null"
         :src="tracks[currentTrackIndex].cover">
      </div>

      <!-- Song Details -->
      <div class="text-center pt-7">
        <h2 id="music-name" >{{currentTrackSong}}</h2>
        <p id="music">{{currentTrackArtist}}</p>
      </div>

      <!-- Audio -->
      <!-- <audio controls ref="song">
        <source :src="`${tracks[2].url}`" type="audio/mpeg">
      </audio> -->

      <!-- Track Time -->
      <div class="flex justify-center items-center pt-1">
        <div class="time-font-size flex-none pr-2 pl-10">00:00</div>
          <div class="flex-end w-full bg-gray-200 h-1 mx-1 rounded-full">
            <div class="bg-gray-600 h-1 rounded-full" style="width: 45%"></div>
          </div>
        <div class="time-font-size flex-none pl-2 pr-10">00:00</div>
<!--        <input type="range" value="0" ref="progress" id="progress">-->
      </div>

      <!-- Play Pause -->
      <div class="grid grid-cols-5 gap-5 content-center pt-2 pr-4 pl-4">

        <!-- random tag -->
        <div class="random-track" @click="playRandom">
          <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 23.9733L7.4 23.9867C8.61333 23.9867 9.74667 23.3867 10.4133 22.3867L18.9333 9.61332C19.2632 9.11738 19.7115 8.71142 20.2376 8.43208C20.7637 8.15274 21.351 8.00882 21.9467 8.01332L28.0133 8.03999M25.3333 26.64L28 23.9733M11.8533 11.4933L10.4133 9.49332C10.0803 9.0271 9.63983 8.64798 9.12924 8.38803C8.61864 8.12809 8.05293 7.99499 7.48 7.99999L4 8.01332M17.2933 20.5067L18.92 22.6C19.6 23.48 20.6667 24 21.7867 24L28.0133 23.9733M28 8.02665L25.3333 5.35999" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- previous track -->
        <div class="prev-track" @click="prevTrack"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.01336 7.77156L5.01336 24.2516M26.9867 22.3849L26.9867 9.62489C26.9867 7.01156 24.1467 5.37156 21.88 6.67823L16.3467 9.86489L10.8134 13.0649C8.54669 14.3716 8.54669 17.6382 10.8134 18.9449L16.3467 22.1449L21.88 25.3316C24.1467 26.6382 26.9867 25.0116 26.9867 22.3849Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- play / pause  -->
        <div class="playpause-track" v-if="isTimerPlaying" @click="pauseTrack">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="white"/>
            <path d="M11.278 23.3333C11.278 23.5061 11.2816 23.6779 11.285 23.8413L11.2851 23.8462C11.2886 24.0096 11.2919 24.164 11.2918 24.3125C11.2918 24.6172 11.2775 24.8638 11.2342 25.0582C11.1915 25.2503 11.1308 25.3445 11.0736 25.3945C11.0223 25.4394 10.9156 25.5 10.6666 25.5C10.3488 25.5 10.1877 25.4317 10.1022 25.3686C10.0198 25.3078 9.95077 25.21 9.901 25.032C9.84903 24.8462 9.82784 24.6071 9.82394 24.306C9.82164 24.129 9.82467 23.9673 9.82789 23.7955C9.83056 23.6531 9.83335 23.5039 9.83335 23.3333L9.83334 10C9.83334 9.8295 9.83054 9.68025 9.82788 9.53789C9.82466 9.36609 9.82164 9.20432 9.82393 9.02733C9.82784 8.72625 9.84903 8.48719 9.90101 8.30133C9.95078 8.12334 10.0198 8.02558 10.1022 7.96478C10.1877 7.90167 10.3488 7.83334 10.6667 7.83334C10.9883 7.83334 11.1206 7.90312 11.1752 7.94817C11.226 7.99005 11.2791 8.06758 11.3098 8.24981C11.3418 8.43964 11.3395 8.68166 11.3228 8.99406C11.3189 9.06559 11.3143 9.14111 11.3095 9.21952C11.2946 9.46304 11.278 9.73435 11.278 10V23.3333ZM20.722 23.3333V10C20.722 9.78331 20.7128 9.5516 20.7043 9.33894C20.6996 9.22091 20.6952 9.10875 20.6926 9.00827C20.6849 8.70076 20.6928 8.46004 20.7334 8.27229C20.7722 8.09255 20.8314 8.00612 20.8956 7.9557C20.9634 7.90242 21.1085 7.83334 21.4283 7.83334C21.7481 7.83334 21.8932 7.90242 21.961 7.9557C22.0252 8.00612 22.0844 8.09255 22.1233 8.27229C22.1638 8.46004 22.1717 8.70076 22.164 9.00827C22.1615 9.10875 22.157 9.2209 22.1523 9.33891C22.1438 9.55159 22.1346 9.7833 22.1346 10L22.1346 23.3333C22.1346 23.55 22.1438 23.7817 22.1523 23.9944C22.157 24.1124 22.1615 24.2246 22.164 24.3251C22.1717 24.6326 22.1638 24.8733 22.1233 25.061C22.0844 25.2408 22.0252 25.3272 21.961 25.3776C21.8932 25.4309 21.7481 25.5 21.4283 25.5C21.1085 25.5 20.9634 25.4309 20.8956 25.3776C20.8314 25.3272 20.7722 25.2408 20.7334 25.061C20.6928 24.8733 20.6849 24.6326 20.6926 24.3251C20.6952 24.2246 20.6996 24.1124 20.7043 23.9944C20.7128 23.7817 20.722 23.55 20.722 23.3333Z" fill="black" stroke="black"/>
          </svg>
        </div>
        <div v-else @click="playTrack">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="19" fill="white"/>
            <path ref="playpause" d="M5.33334 16V11.2534C5.33334 5.36002 9.50668 2.94669 14.6133 5.89336L18.7333 8.26669L22.8533 10.64C27.96 13.5867 27.96 18.4134 22.8533 21.36L18.7333 23.7334L14.6133 26.1067C9.50668 29.0534 5.33334 26.64 5.33334 20.7467V16Z" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- next track -->
        <div class="next-track" @click="nextTrack"><svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9867 24.24L26.9867 7.75998M5.01334 9.62664L5.01334 22.3866C5.01334 25 7.85334 26.64 10.12 25.3333L15.6533 22.1466L21.1867 18.9466C23.4533 17.64 23.4533 14.3733 21.1867 13.0666L15.6533 9.86664L10.12 6.67998C7.85334 5.37331 5.01334 6.99998 5.01334 9.62664Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- loop track -->
        <div class="repeat-track" @click="playLoop">
          <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  height: 0.3em;
  border-radius: 5em;
  background: #979797;
  cursor: pointer;
  margin: 5em 0;
}

#progress::-webkit-slider-thumb{
  -webkit-appearance: none;
  background: #646464;
  width: 0.5em;
  height: 0.5em;
  border-radius: 5em;

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
