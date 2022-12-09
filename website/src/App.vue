<script setup lang="ts">
import TopNav from "./components/nav/TopNav.vue";
</script>

<template>
  <top-nav />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
