import { IRoutes } from '../interfaces/shared'

export const routes: IRoutes = {
  DEFAULT: '/',
  MATCHES_UPCOMING: '/matches-upcoming'
}

export const matchRoute = (url: string): boolean => {
  return !!Object.keys(routes).find((route: string) => {
    return routes[route] === url
  })
}
