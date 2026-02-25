<script setup>
import AppNav from './components/AppNav.vue'
</script>

<template>
  <div class="app">
    <AppNav />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f4f6f9;
  color: #1a1a2e;
}
.app { min-height: 100vh; }
.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}
</style>
