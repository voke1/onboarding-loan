/* eslint-disable */
import Requester from '../requester'

// const API_BASE_URL = 'http://167.99.237.136:8070/api';
const API_BASE_URL = 'https://smes-app.herokuapp.com/api/v1';

export default class Profile {
  constructor(props) {
    this.apiRequester = props ? props.apiRequester || new Requester({
      apiBaseUrl: API_BASE_URL
    }) : new Requester({
      apiBaseUrl: API_BASE_URL
    })
  }

  getProfile(id) {
    console.log('GET PROFILE EMAIL: ', id)
    return this.apiRequester.get({
      endpoint: `profile/${id}`,
      args: id
    })
  }

  updateProfile(payload) {
    return this.apiRequester.put({
      endpoint: `profile/${payload.id}`,
      body: payload
    })
  }

  updatePassword(payload, email) {
    console.log('PROFILE UPDATE PAYLOAD: ', payload)
    return this.apiRequester.put({
      endpoint: `profile/update/${email}`,
      body: payload
    })
  }

}
