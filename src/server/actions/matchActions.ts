import testData from '../../../tests/stubs/test';
import apiConstants, {headers} from '../../shared/constants/apiConstants';
import get from 'axios';

export default {
  getMatch() {
    return new Promise((resolve) => {
      return resolve(testData);
    });
  },
  getUpcomingMatches() {
    return get(`${apiConstants.BASE_API_URL}${apiConstants.MATCHES}`, {
      headers
    });
  }
};
