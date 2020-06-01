import { combineReducers } from 'redux';
import tunnelReducer from './tunnel';

export default combineReducers({
  tunnel: tunnelReducer,
});
