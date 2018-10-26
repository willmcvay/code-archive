import { IAction } from '../../shared/interfaces/client'
import { IMatch, IUpcomingStats } from '../../shared/interfaces/shared'
import { Match } from '../../shared/models/Match'

export class MatchesUpcomingState {
  matches: IMatch[]
  stats: IUpcomingStats

  constructor (data: any) {
    console.log(data)
    this.matches = data.matchList.matches.map((match: IMatch) => new Match(match))
    this.stats = data.meta
  }
}

export const MatchesUpcomingReducer = ((
  state: MatchesUpcomingState,
  action?: IAction<any>): MatchesUpcomingState => {
  if (!action) return state
  switch (action.type) {
    default:
      return state
  }
})
