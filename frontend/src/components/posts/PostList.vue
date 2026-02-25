<script setup>
import { ref, onMounted } from 'vue'
import client from '../../api/client.js'
import PostCard from './PostCard.vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await client.get('/posts')
    posts.value = data
  } catch (e) {
    error.value = 'Could not load posts'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1 class="page-title">Latest Posts</h1>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="posts.length === 0" class="status">No posts yet.</div>

    <div v-else class="post-grid">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a2e;
}

.status {
  color: #666;
  font-size: 1rem;
  padding: 40px 0;
  text-align: center;
}

.status.error { color: #e74c3c; }

.post-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
