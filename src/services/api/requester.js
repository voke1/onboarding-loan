/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import {
  DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD,
} from '../../constants/api';
import {
  deleteAuthToken, isAuthTokenExpired, refreshAuthToken, retrieveAuthToken,
} from '../../utils/auth';


export default class Requester {
  constructor(props) {
    const { apiBaseUrl } = props;
    this.apiBaseUrl = apiBaseUrl;
  }

  _getFullUrl(endpoint) {
    const url = `${this.apiBaseUrl}/${endpoint}`;
    console.log('apibaseurl: ', url);
    return url;
  }

  _handleError(error) {
    return error.response ? error.response.data : {};
  }

  _handleResponse(response) {
    return response.data.responseData || response.data;
  }

  async _makeHttpRequest(params) {
    // check if auth token has expired, refresh token if necessary
    let {
      url, method, headers, args, body, auth,
    } = params;
    // let { authToken } = await retrieveAuthToken();
    // console.log('authToken: ', authToken);

    // const hasAuthTokenExpired = await isAuthTokenExpired();

    // console.log('HAS AUTH TOEKN EXPIRED:', hasAuthTokenExpired);

    // if (hasAuthTokenExpired === true) {
    //   await deleteAuthToken();
    //   await refreshAuthToken();
    //   authTokenObj = await retrieveAuthToken();
    //   authToken = authTokenObj.authToken;
    // }

    // if (headers && !headers['Content-Type']) {
    //   headers['Content-Type'] = 'application/json';
    // } else if (!headers) {
    //   headers = { 'Content-Type': 'application/json' };
    // }

    // if (authToken && !headers.Authorization) {
    //   headers.Authorization = `Bearer ${authToken}`;
    // }

    if (auth === false) {
      delete headers.Authorization;
    }
    const response = await axios({
      url,
      method,
      headers,
      params: args,
      data: body,
      mode: 'no-cors',
    });
    return response;
  }

  async post(params) {
    const {
      endpoint, headers, body, args,
    } = params;
    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: POST_METHOD,
        headers,
        args,
        body,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  async get(params) {
    const {
      endpoint, headers, args, auth, body,
    } = params;
    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: GET_METHOD,
        headers,
        args,
        body,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  async put(params) {
    const {
      endpoint, headers, body, args, auth,
    } = params;

    console.log('BODY: ', body)
    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: PUT_METHOD,
        headers,
        args,
        body,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }

  async delete(params) {
    const {
      endpoint, headers, body, args, auth,
    } = params;

    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: DELETE_METHOD,
        headers,
        args,
        body,
        auth,
      });

      return {
        status: 'SUCCESS',
        response: this._handleResponse(response),
        code: response.status,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        response: this._handleError(error),
        code: error.response ? error.response.status : null,
      };
    }
  }
}
