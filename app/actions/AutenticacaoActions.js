export const modificaToken = (hasToken) => ({
  type: 'modifica_token',
  payload: hasToken
});

export const modificaEmail = (email) => ({
  type: 'modifica_email',
  payload: email
});

export const modificaIsMinistrante = (isMinistrante) => ({
  type: 'modifica_isMinistrante',
  payload: isMinistrante
});
