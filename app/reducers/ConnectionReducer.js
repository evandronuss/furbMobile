const INITIAL_STATE = {
  isConnected: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'altera_status_conexao': {
      console.log('conexão: ' + action.payload);
      return {
        ...state,
        isConnected: action.payload
      };
    }

    default:
      return state;
  }
};
