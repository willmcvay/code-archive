import matchActions from './matchActions'
import { IStringMapToPromise } from '../../shared/interfaces/shared'

const actionMap: IStringMapToPromise = {
  GET_MATCH: () => matchActions.getMatch(),
  GET_UPCOMING_MATCHES: () => matchActions.getUpcomingMatches()
}

export default actionMap
