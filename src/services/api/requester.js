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
    console.log('apibaseurl: ', this.apiBaseUrl);

    return `${this.apiBaseUrl}/${endpoint}`;
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
    let { authToken } = await retrieveAuthToken();
    console.log('authToken: ', authToken)

    const hasAuthTokenExpired = await isAuthTokenExpired();

    console.log('HAS AUTH TOEKN EXPIRED:', hasAuthTokenExpired);

    if (hasAuthTokenExpired === true) {
      await deleteAuthToken();
      await refreshAuthToken();
      authTokenObj = await retrieveAuthToken();
      authToken = authTokenObj.authToken;
    }

    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    } else if (!headers) {
      headers = { 'Content-Type': 'application/json' };
    }

    if (authToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    if (auth === false) {
      delete headers.Authorization;
    }

    console.log({
      url,
      method,
      headers,
      params: args,
      data: body,
      mode: 'no-cors',
      proxy: {
        host: '172.16.10.20',
        port: 8080,
      },
    });

    const response = axios.method({
      url,
      method,
      headers,
      params: args,
      data: body,
      mode: 'no-cors',
      // proxy: {
      //   host: '172.16.10.20',
      //   port: 8080,
      // },
    });
    console.log('url: ', url, 'method: ', method, 'body: ', body, 'headers: ', headers, 'response: ', response);
    return response;
  }

  async post(params) {
    const {
      endpoint, headers, body, args,
    } = params;
    try {
      const url = this._getFullUrl(endpoint);
      console.log('this is the url: ', url);
      const response = await axios
        .post('https://smes-app.herokuapp.com/api/v1/auth/user/signin', { email: 'testuser@email.com', password: 'password' });

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
      endpoint, headers, args, auth,
    } = params;

    try {
      const response = await this._makeHttpRequest({
        url: this._getFullUrl(endpoint),
        method: GET_METHOD,
        headers,
        args,
        body: null,
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
