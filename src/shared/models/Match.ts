import { IMatch } from '../interfaces/shared'
import { Venue } from './Venue'
import { Score } from './Score'
import { Team } from './Team'
import { Series } from './Series'

export class Match {
  id: number
  matchTypeId: number
  series: Series
  name: string
  status: string
  venue: Venue
  homeTeam: Team
  awayTeam: Team
  currentMatchState: string
  isMultiDay: boolean
  matchSummaryText: string
  scores: Score
  isMatchDrawn: boolean
  isMatchAbandoned: boolean
  winningTeamId: number
  startDateTime: string
  endDateTime: string
  localStartDate: string
  localStartTime: string
  isWomensMatch: boolean

  constructor (data: IMatch) {
    this.id = data.id
    this.matchTypeId = data.matchTypeId
    this.series = new Series(data.series)
    this.name = data.name
    this.status = data.status
    this.venue = new Venue(data.venue)
    this.homeTeam = new Team(data.homeTeam)
    this.awayTeam = new Team(data.awayTeam)
    this.currentMatchState = data.currentMatchState
    this.isMultiDay = data.isMultiDay
    this.matchSummaryText = data.matchSummaryText
    this.scores = new Score(data.scores)
    this.isMatchDrawn = data.isMatchDrawn
    this.isMatchAbandoned = data.isMatchAbandoned
    this.winningTeamId = data.winningTeamId
    this.startDateTime = data.startDateTime
    this.endDateTime = data.endDateTime
    this.localStartDate = data.localStartDate
    this.localStartTime = data.localStartTime
    this.isWomensMatch = data.isWomensMatch
  }
}
