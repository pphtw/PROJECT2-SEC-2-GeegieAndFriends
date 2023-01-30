<script>

export default{
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      repeat: true,
      tracks: [
        {
          name: "Matsuri",
          artist: "Fuji Kaze",
          cover: "https://e.snmc.io/i/600/s/5126c31850a2de84d4d561c1c45cdeac/9808581/%E8%97%A4%E4%BA%95%E9%A2%A8-fujii-kaze-%E3%81%BE%E3%81%A4%E3%82%8A-matsuri-Cover-Art.jpg",
          source: "/tracks/matsuri.mp3",
          favorited: false
        },
        {
          name: "Double take",
          artist: "dhruv",
          cover: "https://i.scdn.co/image/ab67616d0000b273834f16100678d3e800fb5fb9",
          source: "/tracks/double_take.mp3",
          favorited: false
        },
        {
          name: "Recall",
          artist: "bowkylion",
          cover: "https://e.snmc.io/i/600/s/8551a37b85a88cff3cd699d7b0bd74f2/10164638/bowkylion-%E0%B8%A7%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A7%E0%B9%89-recall-Cover-Art.jpg",
          source: "/tracks/recall.mp3",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    }
  },
  methods: {

    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    stop(){
      this.isTimerPlaying = false;
    },
    playLoop() {
      this.repeat = !this.repeat
      if (this.repeat) {
        this.currentTrackIndex = this.currentTrackIndex;
      } else if (this.currentTrackIndex !== this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    playRandom() {
      this.stop();
      let randomIndex = Math.floor(Math.random() * this.tracks.length);
      if (randomIndex === this.currentTrackIndex) {
        randomIndex = this.playRandom();

      } else {
        this.currentTrackIndex = randomIndex;
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
        this.play()
      }
      console.log(this.currentTrackIndex);
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      // console.log(this.tracks[this.currentTrackIndex].favorited);
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
      console.log(this.tracks[this.currentTrackIndex].favorited);
    },
  },

  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };
  },

  //Progress Bar

  updateBar(x){
    let progress = this.$refs.progress
    let maxduration = this.audio.duration
    let position = x - progress.offsetLeft
    let percentage = (100*position) / progress.offsetWidth;
    percentage = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage
    this.barWidth = percentage + "%"
    this.circleLeft = percentage + "%"
    this.audio.currentTime = (maxduration * percentage) / 100
    this.audio.play()
    
  },
  clickProgress(event) {
    this.isTimerPlaying = true;
    this.audio.pause();
    this.updateBar(event.pageX);
  }
}

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-700">

    <!-- Song Card -->
    <div id="card" class="w-72 h-128 rounded-md bg-gray-300 flex flex-col">

      <!-- Song Image -->
      <div class="flex justify-center items-center w-full h-3/5 bg-cover rounded-t-md"
           :style="{'backgroundImage': `url(${tracks.cover})})`}">
        <img id="song-cover" class="rounded-md"
        v-if="currentTrackIndex !== null"
         :src="tracks[currentTrackIndex].cover">
      </div>

      <!-- Song Details -->
      <div class="h-2/5 bg-gray-300 rounded-b-md p-4">
        <div class="flex justify-around">
          <div class="w-10 invisible"></div>

          <div class="text-center" v-if="currentTrack">
            <h2 id="music-name" >{{currentTrack.name}}</h2>
            <p id="music">{{currentTrack.artist}}</p>
          </div>

          <!-- Song favorited -->
          <div class="w-10 flex justify-center">
            <!-- favorited -->
            <svg v-if="tracks[currentTrackIndex].favorited" width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="self-center" @click="favorite">
              <path d="M16.8267 27.7467C16.3734 27.9067 15.6267 27.9067 15.1734 27.7467C11.3067 26.4267 2.66669 20.92 2.66669 11.5867C2.66669 7.46666 5.98669 4.13333 10.08 4.13333C12.5067 4.13333 14.6534 5.30666 16 7.12C16.6851 6.1945 17.5773 5.4423 18.6053 4.92366C19.6334 4.40501 20.7686 4.13434 21.92 4.13333C26.0134 4.13333 29.3334 7.46666 29.3334 11.5867C29.3334 20.92 20.6934 26.4267 16.8267 27.7467Z" fill="#C493E1" stroke="#C493E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <!-- not favorite -->
            <svg v-else width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="self-center" @click="favorite">
              <path d="M16.8267 27.7467C16.3734 27.9067 15.6267 27.9067 15.1734 27.7467C11.3067 26.4267 2.66669 20.92 2.66669 11.5867C2.66669 7.46666 5.98669 4.13333 10.08 4.13333C12.5067 4.13333 14.6534 5.30666 16 7.12C16.6851 6.1945 17.5773 5.4423 18.6053 4.92366C19.6334 4.40501 20.7686 4.13434 21.92 4.13333C26.0134 4.13333 29.3334 7.46666 29.3334 11.5867C29.3334 20.92 20.6934 26.4267 16.8267 27.7467Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

      <!-- Track Time -->
        <div class="flex justify-around pl-6 pr-6 pt-3 pb-3">
          <div class="time-font-size">{{ currentTime }}</div>

          <!-- Progress Bar -->
          <div class="progress-bar self-center" @click="clickProgress">
            <div class="progress-current" :style="{ width : barWidth }"></div>
          </div>

          <div class="time-font-size">{{ duration }}</div>

        </div>

        <div class="flex justify-around items-center pl-3 pr-3"> 
        <!-- random tag -->
       <div class="random-track" @click="playRandom">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 23.9733L7.4 23.9867C8.61333 23.9867 9.74667 23.3867 10.4133 22.3867L18.9333 9.61332C19.2632 9.11738 19.7115 8.71142 20.2376 8.43208C20.7637 8.15274 21.351 8.00882 21.9467 8.01332L28.0133 8.03999M25.3333 26.64L28 23.9733M11.8533 11.4933L10.4133 9.49332C10.0803 9.0271 9.63983 8.64798 9.12924 8.38803C8.61864 8.12809 8.05293 7.99499 7.48 7.99999L4 8.01332M17.2933 20.5067L18.92 22.6C19.6 23.48 20.6667 24 21.7867 24L28.0133 23.9733M28 8.02665L25.3333 5.35999" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- previous track -->
        <div class="prev-track" @click="prevTrack">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.01336 7.77156L5.01336 24.2516M26.9867 22.3849L26.9867 9.62489C26.9867 7.01156 24.1467 5.37156 21.88 6.67823L16.3467 9.86489L10.8134 13.0649C8.54669 14.3716 8.54669 17.6382 10.8134 18.9449L16.3467 22.1449L21.88 25.3316C24.1467 26.6382 26.9867 25.0116 26.9867 22.3849Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- play / pause  -->
          <div @click="play" class="flex content-center">
            <button v-if="isTimerPlaying">
              <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="25" fill="#C493E1"/>
                <path d="M19.3041 33.2143C19.3041 33.4257 19.3085 33.6363 19.3128 33.8377L19.3129 33.8444C19.3172 34.0453 19.3212 34.2365 19.3212 34.4207C19.3212 34.798 19.3036 35.1123 19.2474 35.3647C19.1918 35.6148 19.1085 35.7574 19.0126 35.8413C18.9226 35.92 18.7611 36 18.4348 36C18.0271 36 17.8017 35.9123 17.6703 35.8154C17.5421 35.7207 17.4456 35.5746 17.3796 35.3386C17.3114 35.0947 17.2852 34.7879 17.2804 34.4143C17.2776 34.1967 17.2813 33.9929 17.2853 33.7784C17.2886 33.6022 17.292 33.4188 17.292 33.2143L17.292 16.7857C17.292 16.5813 17.2886 16.3978 17.2853 16.2217C17.2813 16.0071 17.2776 15.8034 17.2804 15.5857C17.2852 15.2121 17.3114 14.9053 17.3796 14.6614C17.4456 14.4254 17.5421 14.2793 17.6704 14.1846C17.8017 14.0877 18.0271 14 18.4348 14C18.8463 14 19.0396 14.0891 19.1353 14.168C19.227 14.2438 19.3012 14.3697 19.3417 14.6099C19.3835 14.8578 19.3798 15.1675 19.3591 15.5525C19.3543 15.6423 19.3485 15.7365 19.3426 15.8339C19.3242 16.1333 19.3041 16.4623 19.3041 16.7857V33.2143ZM30.7084 33.2143V16.7857C30.7084 16.5205 30.6972 16.2404 30.6868 15.9802C30.681 15.834 30.6754 15.6941 30.6722 15.5667C30.6627 15.1866 30.6718 14.8782 30.725 14.6324C30.7763 14.3946 30.8593 14.2598 30.9666 14.1756C31.0775 14.0884 31.285 14 31.6947 14C32.1044 14 32.3118 14.0884 32.4228 14.1756C32.5301 14.2598 32.613 14.3946 32.6644 14.6324C32.7176 14.8782 32.7267 15.1866 32.7172 15.5667C32.714 15.6941 32.7084 15.834 32.7026 15.9802C32.6922 16.2404 32.681 16.5205 32.681 16.7857L32.681 33.2143C32.681 33.4795 32.6922 33.7596 32.7026 34.0198C32.7084 34.166 32.714 34.3059 32.7172 34.4333C32.7267 34.8134 32.7176 35.1218 32.6644 35.3676C32.613 35.6054 32.5301 35.7402 32.4228 35.8244C32.3118 35.9116 32.1044 36 31.6947 36C31.285 36 31.0775 35.9116 30.9666 35.8244C30.8593 35.7402 30.7763 35.6054 30.725 35.3676C30.6718 35.1218 30.6627 34.8134 30.6722 34.4333C30.6754 34.3059 30.681 34.166 30.6868 34.0198C30.6972 33.7596 30.7084 33.4795 30.7084 33.2143Z" fill="#E5E5E5" stroke="#E5E5E5"/>
              </svg>
            </button>

            <button v-else>
              <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="50" height="50" rx="25" fill="#C493E1"/>
                <path d="M23.1398 15.4316L23.1402 15.4318L27.5787 17.8336L32.0166 20.2351C32.0168 20.2352 32.0169 20.2353 32.0171 20.2354C34.6396 21.657 35.75 23.4178 35.75 25C35.75 26.5823 34.6395 28.3432 32.0166 29.7649L27.5787 32.1664L23.1402 34.5682L23.1398 34.5684C20.5247 35.9859 18.3068 36.0327 16.7934 35.2113C15.2957 34.3984 14.25 32.6039 14.25 29.8036V25V20.1964C14.25 17.3961 15.2957 15.6016 16.7934 14.7887C18.3068 13.9673 20.5247 14.0141 23.1398 15.4316Z" stroke="#E5E5E5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>


        <!-- next track -->
        <div class="next-track" @click="nextTrack">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9867 24.24L26.9867 7.75998M5.01334 9.62664L5.01334 22.3866C5.01334 25 7.85334 26.64 10.12 25.3333L15.6533 22.1466L21.1867 18.9466C23.4533 17.64 23.4533 14.3733 21.1867 13.0666L15.6533 9.86664L10.12 6.67998C7.85334 5.37331 5.01334 6.99998 5.01334 9.62664Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

        <!-- loop track -->
        <div class="repeat-track">
          <svg v-if="!repeat" width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" @click="playLoop">
            <path d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.98666 2.66669L4.77333 6.88002L8.98666 11.0934M27.2267 25.12H8.77333C6.56 25.12 4.77333 23.3334 4.77333 21.12V16.6934" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067" stroke="black" stroke-opacity="0.7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <svg v-else width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" @click="playLoop">
            <path d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067" stroke="#C493E1" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.98668 2.66667L4.77335 6.88L8.98668 11.0933M27.2267 25.12H8.77335C6.56001 25.12 4.77335 23.3333 4.77335 21.12V16.6933" stroke="#C493E1" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067" stroke="#C493E1" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        
        </div>

        


        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.progress-bar{
  height: 0.3em;
  width: 70%;
  cursor: pointer;
  background-color: #b9b9b9;
  /* display: inline-block; */
  border-radius: 2em;
}

.progress-current{
  height: inherit;
  width: 0%;
  background-color: #C493E1;
  border-radius: 2em;
}

#music-name{
  font-size: 1.3em;
  font-weight: bold;
}
#music{
  font-size: 1em;
}
.time-font-size{
  font-size: 0.7em;
}

</style>
