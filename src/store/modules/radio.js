export default {
  state: {
    stationHistory: [],
    countries: [],
    countryStations: [],
    selectedStation: {},
    selectedStationAltUrl: {},
    selectedCountry: {},
    player: {},
    interval: null,
    paused: true,
  },
  mutations: {
    updateStationHistory (state, stationHistory) {
      state.stationHistory = stationHistory
    },
    updateCountries (state, countries) {
      state.countries = countries
    },
    updateCountryStations (state, stations) {
      state.countryStations = stations
    },
    updateSelectedStation (state, station) {
      state.selectedStation = station
      state.paused = false
      state.selectedStation.altUrl = "https://pawka.ru/api/retranslator?id=" + station.id
      console.log(state.selectedStationAltUrl)
    },
    updateselectedCountry (state, country) {
      state.selectedCountry = country
    },
    updatePlayer (state, player) {
      state.player = player
    }
  },
  actions: {
    setSelectedStation (context, station) {
      context.commit('updateSelectedStation', station)
    },
    setSelectedCountry (context, country) {
      context.commit('updateselectedCountry', country)
    },
    setPlayer(context, player) {
      context.commit('updatePlayer', player)
    },
    async fetchHistory (context, stationId = 15016) {
      let answer = await fetch('https://pawka.ru/api/history?id=' + stationId)
      let answerJson = await answer.json()
        .catch((e) => {
          console.log(e)
          return [{title: 'program_error', id: 0}]
        })
      context.commit('updateStationHistory', answerJson)
    },
    async fetchCountries (context) {
      let countriesCodes = await fetch('https://pawka.ru/api/countries')
        .then((res) => res.json())
        .catch((e) => {
          console.log(e)
          return []
        })
      context.commit('updateCountries', countriesCodes)
    },
    async fetchCountryStations (context, code = 'RECORD') {
      let stations = await fetch('https://pawka.ru/api/countriesStations?code=' + code)
        .then((res) => res.json())
        .catch((e) => {
          console.log(e)
          return []
        })
      context.commit('updateCountryStations', stations)
    }
  },
  getters: {
    stationHistory: (state) => state.stationHistory,
    countries: (state) => state.countries,
    countryStations: (state) => state.countryStations,
    selectedStateStation: (state) => state.selectedStation,
    selectedStateCountry: (state) => state.selectedCountry,
    statePlayer: (state) => state.player,
    stateInterval: (state) => state.interval,
    statePaused: (state) => state.paused
  }
}
