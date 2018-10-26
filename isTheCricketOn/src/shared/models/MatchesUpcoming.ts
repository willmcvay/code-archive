import { IMatch, IUpcomingStats } from '../interfaces/shared'
import { Match } from './Match'

export class MatchesUpcoming {
  matches: IMatch[]
  stats: IUpcomingStats

  constructor (data: any) {
    this.matches = data.matchList.matches.map((match: IMatch) => new Match(match))
    this.stats = data.meta
  }
}
