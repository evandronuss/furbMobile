import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview';

const teste = '<p>A FURB reúne os três aspectos que definem uma Universidade: <b>ENSINO</b>, <b>PESQUISA E EXTENSÃO. O que isso quer dizer?</b></p>';
const teste1 = '<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>';


export default class FURB extends Component {
	render() {
		return (
			<HTMLView
				value={teste1}
			/>
		);
	}
}
