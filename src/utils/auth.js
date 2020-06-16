/* eslint-disable consistent-return */
import AsyncStorage from '@react-native-community/async-storage';
import Auth from '../services/api/resources/auth';
import { SUCCESS_STATUS } from '../constants/api';
import { loadData } from './storage';
import { USER, LOGIN_DETAILS } from '../constants';

const AUTH_TOKEN = 'auth_token';
const AUTH_TOKEN_EXPIRY = 'auth_token_expiry';
const AUTH_TOKEN_LIFESPAN = 900;
const REFRESH_TOKEN = 'refresh_token';

function currentTimestamp() {
  const currentDate = new Date();
  const currentTimestamp = currentDate.valueOf() / 1000;
  return currentTimestamp;
}

export async function refreshAuthToken() {
  const refreshToken = await retrieveRefreshToken();

  const user = JSON.parse(await loadData(USER));
  const userEmail = user.email;

  const auth = new Auth();
  const { status, response, code } = await auth.login(
    refreshToken,
    userEmail,
  );

  console.log(status, response, code);

  if (status === SUCCESS_STATUS) {
    await saveAuthToken(response.data);
  } else {
    return;
    await refreshAuthToken();
  }
}

export async function deleteAuthToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN);
  await AsyncStorage.removeItem(AUTH_TOKEN_EXPIRY);
}

export async function isAuthTokenExpired() {
  return false;

  const rawAuthTokenExpiry = await AsyncStorage.getItem(AUTH_TOKEN_EXPIRY);

  if (rawAuthTokenExpiry === null) {
    return null;
  }

  const authTokenExpiry = parseInt(rawAuthTokenExpiry);
  if (authTokenExpiry && currentTimestamp() < authTokenExpiry) {
    return false;
  }

  return true;
}

export function isSessionActive() {
  return SyncStorage.get(AUTH_TOKEN) !== null;
}

export async function retrieveAuthToken() {
  const authToken = await AsyncStorage.getItem(AUTH_TOKEN);
  const authTokenExpiry = await AsyncStorage.getItem(AUTH_TOKEN_EXPIRY);

  return {
    authToken,
    authTokenExpiry,
  };
}

export async function retrieveRefreshToken() {
  return await AsyncStorage.getItem(REFRESH_TOKEN);
}

export async function saveAuthToken(token) {
  const tokenLifespan = AUTH_TOKEN_LIFESPAN;

  AsyncStorage.setItem(AUTH_TOKEN, token);
  AsyncStorage.setItem(AUTH_TOKEN_EXPIRY, JSON.stringify(currentTimestamp() + tokenLifespan));
}

export async function saveRefreshToken(token) {
  AsyncStorage.setItem(REFRESH_TOKEN, token);
}

export const storeData = async (payload) => {
  try {
    await AsyncStorage.setItem('item',
      JSON.stringify(payload),
    );
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('item');
    if (value !== null) {
      // We have data!!
      const response = JSON.parse(value);

      console.log(value);
      return response;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
