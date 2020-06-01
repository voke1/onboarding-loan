/* eslint-disable */
import Requester from '../requester'

// const API_BASE_URL = 'http://167.99.237.136:8070/api';
const API_BASE_URL = 'http://api.smedanregister.ng/api';

export default class Profile {
  constructor(props) {
    this.apiRequester = props ? props.apiRequester || new Requester({
      apiBaseUrl: API_BASE_URL
    }) : new Requester({
      apiBaseUrl: API_BASE_URL
    })
  }

  getProfile () {
    return this.apiRequester.get({
      endpoint: 'profile'
    })
  }

  updateProfile (payload) {
    return this.apiRequester.put({
      endpoint: 'profile',
      body: payload
    })
  }

  updatePassword (payload) {
    return this.apiRequester.put({
      endpoint: 'profile/password',
      body: payload
    })
  }

}
