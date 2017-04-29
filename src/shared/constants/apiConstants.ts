import { IStringMapToString } from '../interfaces/shared'
import env from '../constants/env'

export const headers = {
  'X-Mashape-Key': env.API_KEY,
  'Accept': 'application/json'
}

export default {
  BASE_API_URL: 'https://dev132-cricket-live-scores-v1.p.mashape.com/',
  MATCHES: 'matches.php'
} as IStringMapToString
