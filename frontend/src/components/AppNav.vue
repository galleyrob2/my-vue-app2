<template>
  <nav class="nav">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">📝 My Blog</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/weather">Weather</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background: #1a1a2e;
  padding: 16px 24px;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-links a {
  color: #aab4c8;
  text-decoration: none;
  margin-left: 24px;
  font-size: 0.95rem;
  transition: color 0.15s;
}

.nav-links a:hover { color: white; }
.nav-links a.router-link-active { color: white; }
</style>
