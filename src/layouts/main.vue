<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import RouterViewTransition from '@/components/RouterViewTransition.vue'
</script>

<template>
  <Navbar></Navbar>

  <main>
    <RouterViewTransition></RouterViewTransition>
  </main>
</template>
