<script setup>
defineProps({
  post: Object
})
</script>

<template>
  <div class="card">
    <h2 class="card-title">{{ post.title }}</h2>
    <p class="card-body">{{ post.body }}</p>
    <div class="card-footer">
      <span class="card-date">{{ new Date(post.created_at).toLocaleDateString() }}</span>
      <button class="card-btn">Read more</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: transform 0.15s, box-shadow 0.15s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1a2e;
}

.card-body {
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-date {
  font-size: 0.8rem;
  color: #aaa;
}

.card-btn {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.card-btn:hover { background: #2d2d4e; }
</style>
