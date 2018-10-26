import { ITeam } from '../interfaces/shared'

export class Team {
  isBatting: boolean
  id: number
  name: string
  shortName: string
  logoUrl: string
  teamColor: string

  constructor (data: ITeam) {
    this.isBatting = data.isBatting
    this.id = data.id
    this.name = data.name
    this.shortName = data.shortName
    this.logoUrl = data.logoUrl
    this.teamColor = data.teamColor
  }
}
