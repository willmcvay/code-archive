import testData from '../../../tests/stubs/test';
import apiConstants from '../../shared/constants/apiConstants';
import env from '../../shared/constants/env';
import fetch from 'node-fetch';

export default {
  getMatch() {
    return new Promise((resolve) => {
      return resolve(testData);
    });
  },
  getUpcomingMatches() {
    return fetch(`
      ${apiConstants.BASE_API_URL}
      ${apiConstants.MATCHES}
    `, {
      headers: {
        'X-Mashape-Key': env.API_KEY
      }
    });
  }
};
