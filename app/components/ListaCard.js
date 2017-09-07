import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Card from '../components/Card';
import { gerarNomeArquivo } from '../lib/Util';

const cardSize = 150;

export default class ListaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleCard: {
        marginLeft: 0,
        marginTop: 0
      }
    };
  }

  componentWillMount() {
    this.calcularQuantidadeCards();
  }

  onLayout() {
    this.calcularQuantidadeCards();
  }

  calcularQuantidadeCards() {
    const { width } = Dimensions.get('window');
    const qtdItemColuna = Math.floor(width / cardSize);
    const margin = ((width - (cardSize * qtdItemColuna)) / (qtdItemColuna + 1));

    this.setState({
      qtdItemColuna,
      styleCard: {
        marginLeft: margin,
        marginTop: margin
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.menu}>
        <View onLayout={this.onLayout.bind(this)} style={styles.menuGrupo}>
          {this.props.listaCards.map((card) => (
              <Card
                key={card.text}
                style={this.state.styleCard}
                cardSize={cardSize}
                icon={card.icon}
                type={card.type}
                text={card.text}
                onPress={
                  (card.onPress || this.props.onPressDefault).bind(this, {
                    id: gerarNomeArquivo(card.text)
                  })
                }
              />
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    marginBottom: 15
  },
  menuGrupo: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
