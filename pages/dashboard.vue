<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'role']
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
</template>
