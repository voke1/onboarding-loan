import {
  DISMISS_ERROR_MESSAGE, DISMISS_SUCCESS_MESSAGE, FLASH_ERROR_MESSAGE,
  FLASH_SUCCESS_MESSAGE, UPDATE_LOADING,
} from '../../../constants/action-types/tunnel';

const initialState = {
  errorMessage: null,
  isLoading: false,
  loadingPercentage: 66,
};

export default function tunnelReducer(state = initialState, action) {
  switch (action.type) {
    case DISMISS_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };

    case DISMISS_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };

    case FLASH_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case FLASH_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };

    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: (
          action.payload.isLoading !== undefined ? action.payload.isLoading : action.payload
        ),
        loadingPercentage: action.payload.percentage || 66,
      };

    default:
      return state;
  }
}
