import { useEndureStore } from '~/composables/useEndureStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useEndureStore()
  // Authenticated check
  if (!store.currentUser.value) {
    return navigateTo('/')
  }
})
