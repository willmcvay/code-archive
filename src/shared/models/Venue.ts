import { IVenue } from '../interfaces/shared'

export class Venue {
  name: string
  location: string

  constructor (data: IVenue) {
    this.name = data.name
    this.location = data.location
  }
}
