export const adicionarPresenca = (presenca) => ({
  type: 'adicionar_presenca',
  payload: presenca
});

export const apagarPresencas = (presencas) => ({
  type: 'apagar_presencas',
  payload: presencas
});

export const modificaPresencas = (presencas) => ({
  type: 'modifica_presencas',
  payload: presencas
});
