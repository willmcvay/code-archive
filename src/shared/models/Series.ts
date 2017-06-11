import { ISeries } from '../interfaces/shared'

export class Series {
  id: number
  name: string
  shortName: string
  shieldImageUrl: string

  constructor (data: ISeries) {
    this.id = data.id
    this.name = data.name
    this.shortName = data.shortName
    this.shieldImageUrl = data.shieldImageUrl
  }
}
