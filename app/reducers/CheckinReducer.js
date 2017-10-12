import { saveItem, removeItem } from '../lib/Util';

const INITIAL_STATE = {
  presencas: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'adicionar_presenca': {
      const presencas = state.presencas;

      presencas.push(action.payload);

      saveItem('Presencas', presencas);

      return {
        ...state,
        presencas
      };
    }

    case 'apagar_presencas': {
      let presencas = state.presencas;
      const presencasRemover = action.payload;

      presencas = presencas.filter(p =>
        presencasRemover.filter(r =>
          r.nome === p.nome &&
          r.curso === p.curso &&
          r.oficina === p.oficina
        ).length === 0
      );

      if (presencas.length > 0) {
        saveItem('Presencas', presencas);
      } else {
        removeItem('Presencas');
      }

      return {
        ...state,
        presencas
      };
    }

    case 'modifica_presencas': {
      return {
        ...state,
        presencas: action.payload
      };
    }

    default:
      return state;
  }
};
