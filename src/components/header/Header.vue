<template>
  <header class="app-header">
    <div class="logo">
      <h1>FileManager</h1>
    </div>
    <nav class="nav-menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/filemanager">File Manager</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Header component logic can be added here
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2f2f2f;
  color: #f6f6f6;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-left: 1.5rem;
}

.nav-menu a {
  color: #f6f6f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #24c8db;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    padding: 0.5rem;
  }

  .nav-menu {
    margin-top: 0.5rem;
  }

  .nav-menu li {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>