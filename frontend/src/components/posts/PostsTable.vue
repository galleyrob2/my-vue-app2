<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import FilterPanel from './FilterPanel.vue'

const store = useStore()
const panelOpen = ref(false)

const posts = computed(() => store.getters['posts/filteredPosts'])
const loading = computed(() => store.state.posts.loading)
const error = computed(() => store.state.posts.error)
const filters = computed(() => store.state.posts.filters)

function toggleSort(col) {
  if (filters.value.sortBy === col) {
    store.commit('posts/SET_FILTER', {
      key: 'sortDir',
      value: filters.value.sortDir === 'asc' ? 'desc' : 'asc'
    })
  } else {
    store.commit('posts/SET_FILTER', { key: 'sortBy', value: col })
    store.commit('posts/SET_FILTER', { key: 'sortDir', value: 'asc' })
  }
}

function sortIcon(col) {
  if (filters.value.sortBy !== col) return '↕'
  return filters.value.sortDir === 'asc' ? '↑' : '↓'
}

onMounted(() => store.dispatch('posts/fetchPosts'))
</script>

<template>
  <div class="wrapper">

    <div class="header">
      <h1 class="title">Posts</h1>
      <button class="filter-toggle" @click="panelOpen = !panelOpen">
        {{ panelOpen ? '✕ Close' : '⚙ Filters' }}
      </button>
    </div>

    <div class="layout">

      <Transition name="slide">
        <div v-if="panelOpen" class="filter-panel">
          <FilterPanel />
        </div>
      </Transition>

      <div class="table-wrap">
        <div v-if="loading" class="status">Loading...</div>
        <div v-else-if="error" class="status error">{{ error }}</div>
        <div v-else-if="posts.length === 0" class="status">No posts match your filters.</div>

        <table v-else>
          <thead>
            <tr>
              <th @click="toggleSort('title')">
                Title <span class="sort-icon">{{ sortIcon('title') }}</span>
              </th>
              <th>Body</th>
              <th @click="toggleSort('created_at')">
                Date <span class="sort-icon">{{ sortIcon('created_at') }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td class="td-title">{{ post.title }}</td>
              <td class="td-body">{{ post.body }}</td>
              <td class="td-date">{{ new Date(post.created_at).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<style scoped>
.wrapper { width: 100%; }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
}

.filter-toggle {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.filter-toggle:hover { background: #2d2d4e; }

.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.filter-panel {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
}

.table-wrap {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
  min-width: 0;
}

table { width: 100%; border-collapse: collapse; }
thead { background: #1a1a2e; color: white; }

th {
  padding: 14px 18px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

th:hover { background: #2d2d4e; }
.sort-icon { opacity: 0.7; margin-left: 4px; }

td {
  padding: 14px 18px;
  font-size: 0.9rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
}

tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafbff; }

.td-title { font-weight: 600; color: #1a1a2e; white-space: nowrap; }
.td-body { color: #555; max-width: 400px; }
.td-date { color: #aaa; font-size: 0.8rem; white-space: nowrap; }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateX(-30px); width: 0; }

.status { padding: 60px; text-align: center; color: #999; }
.status.error { color: #e74c3c; }
</style>
