export interface IStringMapToString {
  [key: string]: string
}

export interface IRoutes {
  [key: string]: string
  DEFAULT: string
  MATCHES_UPCOMING: string
}

export interface IUpcomingStats {
  upcomingMatchCount: number
  inProgressMatchCount: number
  completedMatchCount: number
}

export interface ISeries {
  id: number
  name: string
  shortName: string
  shieldImageUrl: string
}

export interface IVenue {
  name: string
  location: string
}

export interface ITeam {
  isBatting: boolean
  id: number
  name: string
  shortName: string
  logoUrl: string
  teamColor: string
}

export interface IScore {
  homeScore: string
  homeOvers: string
  awayScore: string
  awayOvers: string
}

export interface IMatch {
  id: number
  matchTypeId: number
  series: ISeries
  name: string
  status: string
  venue: IVenue
  homeTeam: ITeam
  awayTeam: ITeam
  currentMatchState: string
  isMultiDay: boolean
  matchSummaryText: string
  scores: IScore
  isMatchDrawn: boolean
  isMatchAbandoned: boolean
  winningTeamId: number
  startDateTime: string
  endDateTime: string
  localStartDate: string
  localStartTime: string
  isWomensMatch: boolean
}
