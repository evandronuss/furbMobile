export const modificaToken = (hasToken) => {
  return {
    type: 'modifica_token',
    payload: hasToken
  };
};

export const modificaEmail = (email) => {
  return {
    type: 'modifica_email',
    payload: email
  };
};