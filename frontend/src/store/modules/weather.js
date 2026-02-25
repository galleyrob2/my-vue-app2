export default {
  namespaced: true,

  state: () => ({
    weather: null,
    loading: false,
    error: null,
    selectedCity: 'London'
  }),

  getters: {
    current(state) {
      if (!state.weather) return null
      const c = state.weather.current_condition[0]
      return {
        temp: c.temp_C,
        feelsLike: c.FeelsLikeC,
        humidity: c.humidity,
        windSpeed: c.windspeedKmph,
        description: c.weatherDesc[0].value,
        visibility: c.visibility
      }
    },

    forecast(state) {
      if (!state.weather) return []
      return state.weather.weather.map(day => ({
        date: day.date,
        maxTemp: day.maxtempC,
        minTemp: day.mintempC,
        description: day.hourly[4]?.weatherDesc[0]?.value || ''
      }))
    }
  },

  mutations: {
    SET_WEATHER(state, data) { state.weather = data },
    SET_LOADING(state, val) { state.loading = val },
    SET_ERROR(state, err) { state.error = err },
    SET_SELECTED_CITY(state, city) { state.selectedCity = city }
  },

  actions: {
    async fetchWeather({ commit, state }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const res = await fetch(
          `https://wttr.in/${encodeURIComponent(state.selectedCity)}?format=j1`
        )
        const data = await res.json()
        commit('SET_WEATHER', data)
      } catch (e) {
        commit('SET_ERROR', 'Could not load weather data')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
