<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h2 style="mt-3">Radio Page 1</h2>
        <v-select
            @change="stationChanged"
            v-model="selectedStation"
            :hint="`${selectedStation.tooltip}`"
            :items="stations"
            item-text="title"
            item-value="id"
            persistent-hint
            return-object
            single-line
        >
          <template slot="item" slot-scope="data">
            <v-list-item-title v-html="data.item.title"></v-list-item-title>
            <v-spacer></v-spacer>
            <v-list-item-icon>
              <img :src="data.item.icon_fill_colored" height="50px"/>
            </v-list-item-icon>
          </template>
        </v-select>
      </v-flex>
        <audio controls autoplay id='auidioplayer' style="display: None;">
          <source :src="selectedStation.stream_320">
            Тег audio не поддерживается вашим браузером.
        </audio>
      <v-flex>
         <v-card
            dark
            v-if="stationHistory[0]"
            class="mx-auto my-12"
            max-width="600"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="stationHistory[0].artist"
                ></v-card-title>
                <v-card-subtitle v-text="stationHistory[0].song"></v-card-subtitle>
                <v-card-actions>
                  <v-btn class="mx-2" fab dark small color="pink" @click="musicPlay">
                    <v-icon dark>mdi-play</v-icon>
                  </v-btn>
                  <v-btn class="mx-2" fab dark small color="pink" @click="musicPause">
                    <v-icon dark> mdi-pause </v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="200" tile>
                <v-img :src="stationHistory[0].image200"></v-img>
              </v-avatar>
            </div>
          </v-card>
          <div  v-else>
            <v-card  dark class="mx-auto my-12 pa-2" max-width="600" >
              <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      player: null,
      selectedStation: {},
      timer: null
    }
  },
  computed: mapGetters(['stations', 'stationHistory']),
  methods: {
    ...mapActions(['fetchStations', 'fetchHistory']),
    async stationChanged () {
      this.player.load()
      this.player.play()
      this.fetchHistory(this.selectedStation.id)
      clearInterval(this.timer)
      this.timer = setInterval(() => this.fetchHistory(this.selectedStation.id), 5000)
    },
    musicPlay () {
      this.player.load()
      this.player.play()
    },
    musicPause () {
      this.player.pause()
    }
  },
  async mounted () {
    await this.fetchStations()
    await this.fetchHistory()
    this.player = document.getElementById('auidioplayer')
    this.selectedStation = this.stations[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
