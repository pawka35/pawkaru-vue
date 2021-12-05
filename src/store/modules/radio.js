export default {
  state: {
    stations: [],
    stationHistory: []
  },
  mutations: {
    updateStations (state, stations) {
      state.stations = stations
    },
    updateStationHistory (state, stationHistory) {
      state.stationHistory = stationHistory
    }
  },
  actions: {
    async fetchStations (context) {
      let answer = await fetch('https://pawka.ru/api/stations')
      let answerAll = await answer.json()
      context.commit('updateStations', answerAll)
    },
    async fetchHistory (context, stationId = 15016) {
      let answer = await fetch('https://pawka.ru/api/history?id=' + stationId)
      let answerJson = await answer.json()
      context.commit('updateStationHistory', answerJson)
    }
  },
  getters: {
    stations: (state) => state.stations,
    stationHistory: (state) => state.stationHistory
  }
}
