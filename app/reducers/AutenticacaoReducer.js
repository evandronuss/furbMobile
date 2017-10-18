const INITIAL_STATE = {
  email: '',
  login: '',
  hasToken: false,
  isMinistrante: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'modifica_token': {
      return {
        ...state,
        hasToken: action.payload
      };
    }

    case 'modifica_email': {
      return {
        ...state,
        email: action.payload
      };
    }
    
    case 'modifica_login': {
      return {
        ...state,
        login: action.payload
      };
    }

    case 'modifica_isMinistrante': {
      return {
        ...state,
        isMinistrante: action.payload
      };
    }

    default:
      return state;
  }
};
