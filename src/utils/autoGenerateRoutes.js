import { routeModifier } from '../../src/config/route-settings'

export default routes => {
  const routeConfig = routeModifier()
  const allRoutes = JSON.parse(JSON.stringify(routes))

  allRoutes.forEach(route => {
    // Injet meta  defined in @/config/route-settings.
    const { component } = route
    for (const rule of routeConfig) {
      const { keyword, meta } = rule
      if (component.includes(keyword)) {
        // Adds component full route path string and meta.
        route.meta = { ...meta, fullPath: component }
      }
    }
  })
  //Paresed routes with meta injected.
  return allRoutes
}
