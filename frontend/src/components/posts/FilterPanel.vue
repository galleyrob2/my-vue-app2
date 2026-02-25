<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const filters = computed(() => store.state.posts.filters)
const categories = computed(() => store.getters['posts/allCategories'])

function setFilter(key, value) {
  store.commit('posts/SET_FILTER', { key, value })
}

function reset() {
  store.commit('posts/RESET_FILTERS')
}
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Filters</h3>
      <button class="reset-btn" @click="reset">Reset</button>
    </div>

    <div class="field">
      <label>Keyword</label>
      <input
        type="text"
        placeholder="Search title or body..."
        :value="filters.keyword"
        @input="setFilter('keyword', $event.target.value)"
      />
    </div>

    <div class="field">
      <label>From date</label>
      <input
        type="date"
        :value="filters.dateFrom"
        @input="setFilter('dateFrom', $event.target.value)"
      />
    </div>

    <div class="field">
      <label>To date</label>
      <input
        type="date"
        :value="filters.dateTo"
        @input="setFilter('dateTo', $event.target.value)"
      />
    </div>

    <div class="field">
      <label>Category</label>
      <select :value="filters.category" @change="setFilter('category', $event.target.value)">
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="field">
      <label>Sort by</label>
      <select :value="filters.sortBy" @change="setFilter('sortBy', $event.target.value)">
        <option value="created_at">Date</option>
        <option value="title">Title</option>
      </select>
    </div>

    <div class="field">
      <label>Direction</label>
      <select :value="filters.sortDir" @change="setFilter('sortDir', $event.target.value)">
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 24px; height: 100%; }

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-header h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; }

.reset-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #666;
}

.reset-btn:hover { border-color: #1a1a2e; color: #1a1a2e; }

.field {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field input,
.field select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #fafafa;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus,
.field select:focus { border-color: #1a1a2e; background: white; }
</style>
