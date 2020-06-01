/* eslint-disable */
import Requester from '../requester'

// const API_BASE_URL = 'http://167.99.237.136:8070/api/auth';
const API_BASE_URL = 'http://api.smedanregister.ng/api/auth';

export default class Auth {
  constructor(props) {
    this.apiRequester = props ? props.apiRequester || new Requester({
      apiBaseUrl: API_BASE_URL
    }) : new Requester({
      apiBaseUrl: API_BASE_URL
    })
  }

  login (email, password) {
    return this.apiRequester.post({
      endpoint: 'login',
      body: {
        email,
        password
      }
    })
  }

  listParameters () {
    return this.apiRequester.get({
      endpoint: 'domains'
    })
  }

  createSME (payload) {
    return this.apiRequester.post({
      endpoint: 'smes',
      body: payload
    })
  }

}
