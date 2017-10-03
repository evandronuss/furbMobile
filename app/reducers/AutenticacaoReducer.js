const INITIAL_STATE = {
  email: '',
  hasToken: false
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
    default:
      return state;
  }
}
