import { useEndureStore } from '~/composables/useEndureStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useEndureStore()
  if (to.path === '/dashboard') {
    if (store.currentRole.value === 'coach') {
      return navigateTo('/coach')
    } else {
      return navigateTo('/client')
    }
  }
})
