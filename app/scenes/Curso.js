import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import Topic from '../components/Topic';
import Loading from '../components/Loading';
import file from '../../data/cursos/artes_visuais.json';

export default class Curso extends Component {
	constructor(props) {
    super(props);

    this.state = { contentPanels: [], visible: true };
	}

  componentWillMount() {
    this.setState({
      contentPanels: file.contentPanels,
      visible: false
    });

    /*axios.get(`http://localhost:8081/data/cursos/${this.props.id}.json`)
      .then(response => this.setState({
        contentPanels: response.data.contentPanels,
        visible: false
      }))
      .catch(() => console.log('Erro ao recuperar os dados'));*/
  }

	setSection(section) {
    this.setState({ activeSection: section });
  }

	renderHeader(section, i, isActive) {
    return (
			<Animatable.View
				duration={300}
				style={[styles.header, isActive ? styles.active : styles.inactive]}
				transition={['marginLeft', 'marginRight']}
			>
				<Text
					style={styles.headerText}
				>
					{section.title}
				</Text>
			</Animatable.View>
    );
  }

	renderTextContent(content, key) {
		return (
      <HTMLView
        key={key}
        value={`<p>${content}</p>`}
      />
		);
  }

  renderTopicContent(topics, title, key) {
		return (
      <Topic
        key={key}
        title={title}
        topics={topics}
      />
		);
	}

  renderContentPanel(section, i, isActive) {
    if (
      !this.state.contentPanels ||
      !this.state.contentPanels[i] ||
      !this.state.contentPanels[i].contentPanel
    ) {
      return (
        <Animatable.View
          duration={300}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition={['marginLeft', 'marginRight']}
        />
      );
    }

    return (
			<Animatable.View
				duration={300}
				style={[styles.content, isActive ? styles.active : styles.inactive]}
				transition={['marginLeft', 'marginRight']}
			>
        {this.state.contentPanels[i].contentPanel.map((item, index) => {
          const key = `contentPanel_${i}_${index}`;

          if (item.topics) {
            return this.renderTopicContent(item.topics, item.title, key);
          }

          return this.renderTextContent(item.content, key);
        })}
      </Animatable.View>
    );
  }

	render() {
    return (
			<ScrollView style={styles.container}>
        <Loading visible={this.state.visible} />
				<Accordion
					activeSection={this.state.activeSection}
					sections={this.props.panels}
					renderHeader={this.renderHeader}
					renderContent={this.renderContentPanel.bind(this)}
					onChange={this.setSection.bind(this)}
					initiallyActiveSection={0}
					duration={300}
					touchableProps={{ activeOpacity: 1, underlayColor: '#FFF' }} 
				/>
			</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
		backgroundColor: '#005FA4',
		marginTop: 15,
    padding: 8
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
		fontWeight: 'bold',
		color: '#FFF'
  },
  content: {
    padding: 20,
		backgroundColor: '#fff',
		borderColor: '#007ED8',
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1
  },
  active: {
    marginLeft: 10,
		marginRight: 10
  },
  inactive: {
    marginLeft: 25,
    marginRight: 25
  }
});
