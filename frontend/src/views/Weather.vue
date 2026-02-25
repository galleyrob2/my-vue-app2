<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = computed(() => store.state.weather.loading)
const error = computed(() => store.state.weather.error)
const selectedCity = computed(() => store.state.weather.selectedCity)
const current = computed(() => store.getters['weather/current'])
const forecast = computed(() => store.getters['weather/forecast'])
const postCount = computed(() => store.state.posts.posts.length)

const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin']

function changeCity(city) {
  store.commit('weather/SET_SELECTED_CITY', city)
  store.dispatch('weather/fetchWeather')
}

function weatherEmoji(desc) {
  const d = desc.toLowerCase()
  if (d.includes('sun') || d.includes('clear')) return '☀️'
  if (d.includes('cloud')) return '☁️'
  if (d.includes('rain')) return '🌧️'
  if (d.includes('snow')) return '❄️'
  if (d.includes('thunder')) return '⛈️'
  if (d.includes('fog') || d.includes('mist')) return '🌫️'
  return '🌤️'
}

onMounted(() => {
  store.dispatch('weather/fetchWeather')
  if (store.state.posts.posts.length === 0) {
    store.dispatch('posts/fetchPosts')
  }
})
</script>

<template>
  <div class="weather-page">

    <div class="page-header">
      <div>
        <h1 class="title">Weather</h1>
        <p class="subtitle">You have <strong>{{ postCount }} posts</strong> in the blog</p>
      </div>
    </div>

    <div class="city-bar">
      <button
        v-for="city in cities"
        :key="city"
        class="city-btn"
        :class="{ active: selectedCity === city }"
        @click="changeCity(city)"
      >
        {{ city }}
      </button>
    </div>

    <div v-if="loading" class="status">Loading weather...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>

    <div v-else-if="current" class="weather-content">

      <div class="current-card">
        <div class="current-top">
          <div>
            <div class="city-name">{{ selectedCity }}</div>
            <div class="description">{{ current.description }}</div>
          </div>
          <div class="emoji">{{ weatherEmoji(current.description) }}</div>
        </div>
        <div class="temp">{{ current.temp }}°C</div>
        <div class="stats">
          <div class="stat">
            <span class="stat-label">Feels like</span>
            <span class="stat-value">{{ current.feelsLike }}°C</span>
          </div>
          <div class="stat">
            <span class="stat-label">Humidity</span>
            <span class="stat-value">{{ current.humidity }}%</span>
          </div>
          <div class="stat">
            <span class="stat-label">Wind</span>
            <span class="stat-value">{{ current.windSpeed }} km/h</span>
          </div>
          <div class="stat">
            <span class="stat-label">Visibility</span>
            <span class="stat-value">{{ current.visibility }} km</span>
          </div>
        </div>
      </div>

      <div class="forecast">
        <div v-for="day in forecast" :key="day.date" class="forecast-card">
          <div class="forecast-emoji">{{ weatherEmoji(day.description) }}</div>
          <div class="forecast-date">{{ new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) }}</div>
          <div class="forecast-desc">{{ day.description }}</div>
          <div class="forecast-temps">
            <span class="max">{{ day.maxTemp }}°</span>
            <span class="min">{{ day.minTemp }}°</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.weather-page { width: 100%; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.title { font-size: 1.8rem; font-weight: 700; color: #1a1a2e; }
.subtitle { color: #888; font-size: 0.9rem; margin-top: 4px; }

.city-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }

.city-btn {
  padding: 8px 18px;
  border-radius: 100px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.15s;
}

.city-btn:hover { border-color: #1a1a2e; color: #1a1a2e; }
.city-btn.active { background: #1a1a2e; color: white; border-color: #1a1a2e; }

.weather-content { display: flex; flex-direction: column; gap: 20px; }

.current-card {
  background: linear-gradient(135deg, #1a1a2e, #2d2d4e);
  color: white;
  border-radius: 16px;
  padding: 32px;
}

.current-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.city-name { font-size: 1.5rem; font-weight: 700; }
.description { color: #aab4c8; font-size: 0.95rem; margin-top: 4px; }
.emoji { font-size: 3.5rem; }
.temp { font-size: 4rem; font-weight: 700; margin-bottom: 24px; }

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
}

.stat { display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 0.75rem; color: #aab4c8; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-value { font-size: 1rem; font-weight: 600; }

.forecast { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

.forecast-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  text-align: center;
}

.forecast-emoji { font-size: 2rem; margin-bottom: 8px; }
.forecast-date { font-weight: 600; font-size: 0.9rem; color: #1a1a2e; margin-bottom: 6px; }
.forecast-desc { font-size: 0.8rem; color: #888; margin-bottom: 12px; }
.forecast-temps { display: flex; justify-content: center; gap: 12px; }
.max { font-weight: 700; color: #1a1a2e; }
.min { color: #aaa; }

.status { padding: 60px; text-align: center; color: #999; }
.status.error { color: #e74c3c; }

@media (max-width: 600px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .forecast { grid-template-columns: 1fr; }
}
</style>