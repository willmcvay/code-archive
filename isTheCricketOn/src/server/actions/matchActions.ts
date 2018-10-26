import testData from '../../../tests/stubs/test'
import apiConstants, { headers } from '../../shared/constants/apiConstants'
import get, { AxiosResponse } from 'axios'
// import { MatchesUpcoming } from '../../shared/models/MatchesUpcoming'
import { MatchesUpcomingState } from '../../client/reducers/MatchesUpcomingReducer'

export default {
  getMatch () {
    return new Promise((resolve) => {
      return resolve(testData)
    })
  },
  getUpcomingMatches () {
    return get(`${apiConstants.BASE_API_URL}${apiConstants.MATCHES}`, {
      headers
    })
    .then((response: AxiosResponse) => {
      console.log(response)
      return new MatchesUpcomingState(response.data)
    })
    .catch((error: Error) => {
      console.error(error)
    })
  }
}
