import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import ConnectionReducer from './ConnectionReducer';
import CheckinReducer from './CheckinReducer';

export default combineReducers({
  AutenticacaoReducer,
  ConnectionReducer,
  CheckinReducer
});
