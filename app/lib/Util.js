import {
  AsyncStorage
} from 'react-native';
import Moment from 'moment';

const urlPaises = 'http://www.furb.br/web/4858/cursos/intercambio-academico/instituicoes-conveniadas/!/';
const imgAlemanha = require('../images/alemanha.png');
const imgArgentina = require('../images/argentina.png');
const imgAustria = require('../images/austria.png');
const imgCanada = require('../images/canada.png');
const imgChile = require('../images/chile.png');
const imgChina = require('../images/china.png');
const imgColombia = require('../images/colombia.png');
const imgCostaRica = require('../images/costa_rica.png');
const imgDinamarca = require('../images/dinamarca.png');
const imgEquador = require('../images/equador.png');
const imgEspanha = require('../images/espanha.png');
const imgFranca = require('../images/franca.png');
const imgGana = require('../images/gana.png');
const imgHolanda = require('../images/holanda.png');
const imgIndia = require('../images/india.png');
const imgItalia = require('../images/italia.png');
const imgMexico = require('../images/mexico.png');
const imgMocambique = require('../images/mocambique.png');
const imgParaguai = require('../images/paraguai.png');
const imgPortugal = require('../images/portugal.png');
const imgSuecia = require('../images/suecia.png');

const paises = {
  alemanha: {
    image: imgAlemanha,
    idPais: 4859
  },
  argentina: {
    image: imgArgentina,
    idPais: 4860
  },
  austria: {
    image: imgAustria,
    idPais: 4861
  },
  canada: {
    image: imgCanada,
    idPais: 4862
  },
  chile: {
    image: imgChile,
    idPais: 4863
  },
  china: {
    image: imgChina,
    idPais: 4864
  },
  colombia: {
    image: imgColombia,
    idPais: 4865
  },
  costa_rica: {
    image: imgCostaRica,
    idPais: 4866
  },
  dinamarca: {
    image: imgDinamarca,
    idPais: 4867
  },
  equador: {
    image: imgEquador,
    idPais: 4868
  },
  espanha: {
    image: imgEspanha,
    idPais: 4869
  },
  franca: {
    image: imgFranca,
    idPais: 4913
  },
  gana: {
    image: imgGana,
    idPais: 4870
  },
  holanda: {
    image: imgHolanda,
    idPais: 4871
  },
  india: {
    image: imgIndia,
    idPais: 4872
  },
  italia: {
    image: imgItalia,
    idPais: 4873
  },
  mexico: {
    image: imgMexico,
    idPais: 4874
  },
  mocambique: {
    image: imgMocambique,
    idPais: 4875
  },
  paraguai: {
    image: imgParaguai,
    idPais: 4876
  },
  portugal: {
    image: imgPortugal,
    idPais: 4877
  },
  suecia: {
    image: imgSuecia,
    idPais: 4878
  }
};

const removerAcentos = (texto) => texto.replace(/[áàâãª]/gi, 'a')
                                        .replace(/[éèêë]/gi, 'e')
                                        .replace(/[íìî]/gi, 'i')
                                        .replace(/[óòôõº]/gi, 'o')
                                        .replace(/[úùû]/gi, 'u')
                                        .replace(/[ç]/gi, 'c');

const gerarNomeArquivo = (texto) => removerAcentos(texto)
                                      .replace(/ /g, '_')
                                      .replace(/([^a-z0-9_])/gi, '')
                                      .toLowerCase();

const buscarImagemPais = (pais) => {
  const nomeArquivo = gerarNomeArquivo(pais);

  if (!paises[nomeArquivo]) {
    return;
  }

  return paises[nomeArquivo].image;
};

const buscarUrlPais = (pais) => {
  const nomeArquivo = gerarNomeArquivo(pais);

  if (!paises[nomeArquivo]) {
    return;
  }

  return urlPaises + paises[nomeArquivo].idPais;
};

const removerObjetosDuplicados = (array, atributo) => {
  const hash = {};

  return array.filter((current) => {
    const exists = !hash[current[atributo]] || false;
    hash[current[atributo]] = true;
    return exists;
  });
};

const ordenarObjetos = (array, atributo) =>
  array.sort((a, b) => {
    if (a[atributo] < b[atributo]) {
      return -1;
    } else if (a[atributo] > b[atributo]) {
      return 1;
    }

    return 0;
  });

const saveItem = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify({
      date: Moment().format('DD/MM/YYYY H:mm'),
      value: selectedValue
    }));
  } catch (error) {
    console.error(`AsyncStorage error: ${error.message}`);
  }
};

const getItem = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    return JSON.parse(value); 
  } catch (error) {
    console.error(`AsyncStorage error: ${error.message}`);
  }
};

const removeItem = async (item) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (error) {
    console.error(`AsyncStorage error: ${error.message}`);
  }
};

const formatMoney = (valor) => 
  valor.toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const isObject = (object) =>
  Object.prototype.toString.call(object) === '[object Object]';

  const isArray = (object) =>
  Object.prototype.toString.call(object) === '[object Array]';

export {
    removerAcentos,
    gerarNomeArquivo,
    buscarImagemPais,
    buscarUrlPais,
    removerObjetosDuplicados,
    ordenarObjetos,
    saveItem,
    getItem,
    removeItem,
    formatMoney,
    isObject,
    isArray
};
