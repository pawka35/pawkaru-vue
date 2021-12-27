<template>
  <div>
    <v-navigation-drawer app temporary class="elevation-8" v-model="sideNav">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Menu </v-list-item-title>
          <v-list-item-subtitle> &nbsp; </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="grey darken-1" dark>
      <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="row align-center justify-start">
        <div class="col-2">Pawka.ru</div>
        <div class="col-9" v-show="!statePaused">
          <div class="row align-center justify-start">
            <canvas id="head-music-bar" class="col-2"></canvas>
            <div class="col-2">
              <v-btn fab dark small color="pink" @click="musicPlay" class>
                <v-icon dark>mdi-play</v-icon>
              </v-btn>
              <v-btn fab dark small color="pink" @click="musicPause">
                <v-icon dark> mdi-pause </v-icon>
              </v-btn>
            </div>
            <div class="col subtitle-2">
              <div>
                <span class="font-weight-black">Country</span> :
                {{ selectedStateCountry.name }}
              </div>
              <div>
                <span class="font-weight-black">Station</span>:
                {{ selectedStateStation.title }}
              </div>
            </div>
          </div>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-for="item in items" :key="item.title" :to="item.url">
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <audio controls autoplay id="auidioplayer" crossorigin="anonymous" style="display: None">
      <source
        v-if="selectedStateStation"
        :src="selectedStateStation.stream_320"
      />
      Тег audio не поддерживается вашим браузером.
    </audio> -->
    <audio controls autoplay id="auidioplayer" style="display: None">
      <source
        id="audio_player_ogv"
        :src="selectedStateStation.stream_320"
        type="audio/mpeg"
      />
      //In case that you can't load the ogv file it will try to load test.mp3
      <source
        id="audio_player_mp3"
        :src="selectedStateStation.altUrl"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      sideNav: false,
      items: [
        { title: "Main", icon: "mdi-home", url: "/" },
        { title: "Radio", icon: "mdi-radio", url: "/radio" },
        { title: "Snake", icon: "mdi-snake", url: "/snake" },
      ],
      right: null,
      player: null,
      retranslationLink: '',
    };
  },
  methods: {
    ...mapActions(["setPlayer"]),
    musicPlay() {
      this.statePlayer.load();
      this.statePlayer.play();
    },
    musicPause() {
      this.statePlayer.pause();
    },
  },
  computed: {
    ...mapGetters([
      "selectedStateStation",
      "selectedStateCountry",
      "statePlayer",
      "statePaused",
    ]),
  },
  mounted() {
    this.player = this.setPlayer(document.getElementById("auidioplayer"));
  },
};

setTimeout(() => {
  let wave = new Wave();
  let options = { type: "bars", colors: ["white"] };
  wave.fromElement("auidioplayer", "head-music-bar", options);

  document.getElementById("auidioplayer").addEventListener(
    "error",
    function failed(e) {
      // audio playback failed - show a message saying why
      // to get the source of the audio element use $(this).src
      switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
          alert("You aborted the video playback.");
          break;
        case e.target.error.MEDIA_ERR_NETWORK:
          alert("A network error caused the audio download to fail.");
          break;
        case e.target.error.MEDIA_ERR_DECODE:
          alert(
            "The audio playback was aborted due to a corruption problem or because the video used features your browser did not support."
          );
          break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          alert(
            "The video audio not be loaded, either because the server or network failed or because the format is not supported."
          );
          break;
        default:
          alert("An unknown error occurred.");
          break;
      }
    },
    true
  );
}, 4000);
</script>

<style scoped>
#head-music-bar {
  /* height: 50%; */
  width: 35%;
  /* margin-left: 50px; */
  margin-top: 5px;
}
</style>