import { createStore } from 'vuex'
import posts from './modules/posts.js'
import weather from './modules/weather.js'

export default createStore({
  modules: {
    posts,
    weather
  }
})
