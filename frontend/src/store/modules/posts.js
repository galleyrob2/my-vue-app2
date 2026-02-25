import client from '../../api/client.js'

export default {
  namespaced: true,

  state: () => ({
    posts: [],
    loading: false,
    error: null,
    filters: {
      keyword: '',
      dateFrom: '',
      dateTo: '',
      category: '',
      sortBy: 'created_at',
      sortDir: 'desc'
    }
  }),

  getters: {
    filteredPosts(state) {
      let posts = [...state.posts]

      if (state.filters.keyword) {
        const kw = state.filters.keyword.toLowerCase()
        posts = posts.filter(p =>
          p.title.toLowerCase().includes(kw) ||
          p.body.toLowerCase().includes(kw)
        )
      }

      if (state.filters.dateFrom) {
        posts = posts.filter(p =>
          new Date(p.created_at) >= new Date(state.filters.dateFrom)
        )
      }

      if (state.filters.dateTo) {
        posts = posts.filter(p =>
          new Date(p.created_at) <= new Date(state.filters.dateTo)
        )
      }

      if (state.filters.category) {
        posts = posts.filter(p =>
          p.category === state.filters.category
        )
      }

      posts.sort((a, b) => {
        const dir = state.filters.sortDir === 'asc' ? 1 : -1
        if (a[state.filters.sortBy] < b[state.filters.sortBy]) return -1 * dir
        if (a[state.filters.sortBy] > b[state.filters.sortBy]) return 1 * dir
        return 0
      })

      return posts
    },

    allCategories(state) {
      return [...new Set(state.posts.map(p => p.category).filter(Boolean))]
    }
  },

  mutations: {
    SET_POSTS(state, posts) { state.posts = posts },
    SET_LOADING(state, val) { state.loading = val },
    SET_ERROR(state, err) { state.error = err },
    SET_FILTER(state, { key, value }) { state.filters[key] = value },
    RESET_FILTERS(state) {
      state.filters = {
        keyword: '',
        dateFrom: '',
        dateTo: '',
        category: '',
        sortBy: 'created_at',
        sortDir: 'desc'
      }
    }
  },

  actions: {
    async fetchPosts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await client.get('/posts')
        commit('SET_POSTS', data)
      } catch (e) {
        commit('SET_ERROR', 'Failed to load posts')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
