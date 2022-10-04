import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { getUserState } from '@/firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes),
})

router.beforeEach(async (to, from, next) => {
  const isAuth = await getUserState()
  const atLoginAndAuthenticated = to.matched.some(
    r => r.name === 'login' && isAuth
  )
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

  // If the route requires the user to be authenticated and it is not,
  // route to the login page.
  if (requiresAuth && !isAuth) {
    next({ name: 'login' })
    return
  }

  // If the user navigates to the login page and it's already authenticated,
  // route to the profile page instead.
  if (atLoginAndAuthenticated) {
    next({ path: '/account/overview' })
    return
  }

  next()
})

const install = app => {
  app.use(router)
}

export { install, router }