import { IScore } from '../interfaces/shared'

export class Score {
  homeScore: string
  homeOvers: string
  awayScore: string
  awayOvers: string

  constructor (data: IScore) {
    if (data) {
      this.homeScore = data.homeScore
      this.homeOvers = data.homeOvers
      this.awayScore = data.awayScore
      this.awayOvers = data.awayOvers
    }
  }
}
