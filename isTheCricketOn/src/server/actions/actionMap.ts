import matchActions from './matchActions'
import { IStringMapToPromiseList } from '../../shared/interfaces/server'
import { routes } from '../../shared/routes/routes'

export const actionMap: IStringMapToPromiseList = {
  [routes.DEFAULT as string]: () => [
    matchActions.getUpcomingMatches()
  ],
  [routes.MATCHES_UPCOMING as string]: () => [
    matchActions.getUpcomingMatches()
  ]
}
