/* eslint-disable */
import Requester from '../requester'

// const API_BASE_URL = 'http://167.99.237.136:8070/api';
const API_BASE_URL = 'https://smes-app.herokuapp.com/api/v1';

export default class SME {
  constructor(props) {
    this.apiRequester = props ? props.apiRequester || new Requester({
      apiBaseUrl: API_BASE_URL,
    }) : new Requester({
      apiBaseUrl: API_BASE_URL,
    });
  }

  getSMEs() {
    return this.apiRequester.get({
      endpoint: 'sme',
    });
  }

  listParameters() {
    return this.apiRequester.get({
      endpoint: 'domains',
    });
  }

  createSME(payload) {
    return this.apiRequester.post({
      endpoint: 'sme',
      body: payload,
    });
  }

  editSME(smeId, payload) {
    return this.apiRequester.put({
      endpoint: `smes/${smeId}`,
      body: payload,
    });
  }

}
