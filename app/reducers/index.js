import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import ConnectionReducer from './ConnectionReducer';

export default combineReducers({
  AutenticacaoReducer,
  ConnectionReducer
});
