<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to My Blog</h1>
      <p>A simple blog built with Rails API and Vue 3.</p>
      <router-link to="/posts" class="btn">View Posts</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.hero {
  text-align: center;
  max-width: 480px;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 16px;
}

.hero p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 32px;
  line-height: 1.6;
}

.btn {
  background: #1a1a2e;
  color: white;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.15s;
}

.btn:hover { background: #2d2d4e; }
</style>
