import {
  DISMISS_ERROR_MESSAGE, DISMISS_SUCCESS_MESSAGE, FLASH_ERROR_MESSAGE,
  FLASH_SUCCESS_MESSAGE, UPDATE_LOADING,
} from '../../../constants/action-types/tunnel';

export function dismissErrorMessage() {
  return {
    type: DISMISS_ERROR_MESSAGE,
  };
}

export function dismissSuccessMessage() {
  return {
    type: DISMISS_SUCCESS_MESSAGE,
  };
}

export function flashErrorMessage(payload) {
  return {
    type: FLASH_ERROR_MESSAGE,
    payload,
  };
}

export function flashSuccessMessage(payload) {
  return {
    type: FLASH_SUCCESS_MESSAGE,
    payload,
  };
}

export function updateLoading(payload) {
  return {
    type: UPDATE_LOADING,
    payload,
  };
}
