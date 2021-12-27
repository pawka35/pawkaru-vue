<template>
  <v-container class="mt-5">
    <v-row class="ma-5 justify-center">
      <v-col class="col-7">
        <v-stepper v-model="e1" vertical class="elevation-24">
          <v-stepper-step :complete="e1 > 1" step="1">
            <v-row class="font-weight-black align-center">
              <span
                v-if="Object.keys(selectedCountry).length !== 0"
                class="ml-3 mr-3"
              >
                <v-icon>mdi-google-maps</v-icon>
                {{ selectedCountry.name }}
              </span>
              <span v-else class="ml-3 mr-3">
                Please, select coutry from list below.
              </span>
              <img :src="selectedCountry.flag" height="30px" />
              <span class="ml-3 mr-3">
                 {{ countryTime }}
              </span>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card color="grey lighten-1" height="200px">
              <v-card-text>
                <v-autocomplete
                  rounded
                  solo
                  @change="countryChanged"
                  v-model="selectedCountry"
                  :hint="`${selectedCountry.stationscount}`"
                  :items="countries"
                  item-text="name"
                  item-value="flag"
                  return-object
                  single-line
                  label="Select country"
                >
                  <template slot="item" slot-scope="data">
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-spacer></v-spacer>
                    {{ data.item.stationscount }}
                    <v-spacer></v-spacer>
                    <v-list-item-icon>
                      <img :src="data.item.flag" width="30" />
                    </v-list-item-icon>
                  </template>
                </v-autocomplete>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-step :complete="e1 > 2" step="2">
            <v-row
              class="pl-3 font-weight-black align-center"
              v-if="!isStationSelected"
            >
              Please, select station from list below.
            </v-row>
            <v-row class="font-weight-black align-center" v-else>
              <v-col class="col-8">
                <v-row class="pl-3 align-center">
                  <v-icon class="mr-1">mdi-access-point</v-icon>
                  {{ selectedStation.title }}

                  <img
                    class="pl-3"
                    v-if="isStationSelected"
                    :src="selectedStation.icon_fill_colored"
                    height="30"
                  />
                </v-row>
              </v-col>

              <v-col class="col-4">
                <v-row>
                  <v-btn
                    fab
                    dark
                    small
                    color="pink"
                    @click="musicPlay"
                    class="mr-2"
                  >
                    <v-icon dark>mdi-play</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="pink"
                    @click="musicPause"
                    class="mr-2"
                  >
                    <v-icon dark> mdi-pause </v-icon>
                  </v-btn>
                  <!-- <v-btn
                    fab
                    dark
                    small
                    color="pink"
                    @click="musicPause"
                    class="mr-2"
                  >
                    <v-icon dark> mdi-cards-heart-outline </v-icon>
                  </v-btn> -->
                </v-row>
              </v-col>
            </v-row>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-1">
              <v-card-title>
                <v-autocomplete
                  dense
                  rounded
                  solo
                  @change="stationChanged"
                  v-model="selectedStation"
                  :hint="`${selectedStation.tooltip}`"
                  :items="countryStations"
                  item-text="title"
                  item-value="stream_320"
                  persistent-hint
                  return-object
                  single-line
                  label="Select station"
                >
                  <template slot="item" slot-scope="data">
                    <v-list-item-title
                      v-html="data.item.title"
                    ></v-list-item-title>
                    <v-spacer></v-spacer>
                    <v-list-item-icon>
                      <img :src="data.item.icon_fill_colored" width="30px" />
                    </v-list-item-icon>
                  </template>
                </v-autocomplete>
              </v-card-title>
              <v-card-text v-if="isStationSelected">
                <!-- карточка трека -->
                <v-card
                  dark
                  v-if="selectedCountry.code === 'RECORD' && stationHistory[0]"
                >
                  <v-row>
                    <v-col>
                      <v-card-title>
                        <v-icon>mdi-microphone</v-icon>
                        {{ stationHistory[0].artist }}
                      </v-card-title>
                      <v-card-subtitle>
                        <v-icon>mdi-music-note</v-icon>
                        {{ stationHistory[0].song }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col>
                      <v-avatar class="ma-3" size="200" tile>
                        <v-img :src="stationHistory[0].image200"></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card dark v-else-if="selectedCountry.code !== 'RECORD'">
                  <v-row>
                    <v-col>
                      <v-card-title v-if="selectedStation.homepage">
                        <v-icon class="mr-3">mdi-home-outline</v-icon>
                        <a :href="selectedStation.homepage" target="_blank">
                          {{ selectedStation.homepage }}</a
                        >
                      </v-card-title>
                      <v-card-subtitle>
                        <v-icon>mdi-account-voice</v-icon>
                        {{ selectedStation.language }}
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card>
                <div v-else>
                  <v-card dark>
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </v-card>
                </div>
              </v-card-text>
              <div v-show="isStationSelected" class="mt-3 pl-4">
                <canvas id="output">Push me</canvas>
              </div>
              <v-card-actions class="justify-center">
                <v-btn elevation="2" outlined @click="e1 = 1">Select another</v-btn>
              </v-card-actions>

            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedStation: {},
      selectedCountry: {},
      timer: null,
      isCountryReady: false,
      isStationsReady: false,
      isStationSelected: false,
      e1: 1,
    };
  },
  computed: {
    ...mapGetters([
      "stationHistory",
      "countries",
      "countryStations",
      "selectedStateStation",
      "selectedStateCountry",
      "statePlayer",
  ]),
    countryTime: function () {
      if (!!this.selectedCountry.timezone) {
        var now = new Date(); // get the current time
        var currentTzOffset = -now.getTimezoneOffset() / 60 // in hours, i.e. -4 in NY
        var deltaTzOffset = this.selectedCountry.timezone - currentTzOffset; // timezone diff

        var nowTimestamp = now.getTime(); // get the number of milliseconds since unix epoch 
        var deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
        var outputDate = new Date(nowTimestamp + deltaTzOffsetMilli) // your new Date object with the timezone offset applied.
        return 'Local capital time: ' + outputDate.getHours() + ':' + outputDate.getMinutes()
      }
    },
  },
  methods: {
    ...mapActions([
      "fetchHistory",
      "fetchCountries",
      "fetchCountryStations",
      "setSelectedStation",
      "setSelectedCountry",
    ]),
    async countryChanged() {
      this.e1 = 2;
      this.isStationsReady = false;
      this.isStationSelected = false;
      await this.fetchCountryStations(this.selectedCountry.code);
      this.setSelectedCountry(this.selectedCountry);
      this.isStationsReady = true;
    },
    musicPlay() {
      this.statePlayer.load();
      this.statePlayer.play();
    },
    musicPause() {
      this.statePlayer.pause();
    },
    async stationChanged(station) {
      this.isStationSelected = false;
      this.setSelectedStation(this.selectedStation);
      clearInterval(this.timer);
      this.timer = null;
      if (this.selectedCountry.code == "RECORD") {
        await this.fetchHistory(this.selectedStation.id);
        this.timer = setInterval(async () => {
          let result = await this.fetchHistory(this.selectedStation.id);
          return result;
        }, 5000);
      }
      this.statePlayer.load();
      this.statePlayer.play();
      this.isStationSelected = true;
    },
  },
  async mounted() {
    if (Object.keys(this.selectedStateCountry).length !== 0) {
      this.e1 = 2;
      this.selectedCountry = this.selectedStateCountry;
      if (Object.keys(this.selectedStateStation).length !== 0) {
        this.selectedStation = this.selectedStateStation;
        this.isStationSelected = true;
        if (this.selectedCountry.code == "RECORD") {
          await this.fetchHistory(this.selectedStation.id);
          this.timer = setInterval(async () => {
            let result = await this.fetchHistory(this.selectedStation.id);
            return result;
          }, 5000);
        }
      }
    }
    await this.fetchCountries();
    this.isCountryReady = true;
    setTimeout(() => {
      MakeWave();
    }, 30)
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};

// setTimeout(() => {
//   MakeWave();
// }, 30)

function MakeWave() {
  let wave = new Wave();
  let options = {type:"dualbars", colors: ['#1e1e1e', 'black']};
  wave.fromElement("auidioplayer","output", options);
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#output {
  /* border: 1px solid green; */
  width: 97%; 
  height: 150px;
}
</style>
