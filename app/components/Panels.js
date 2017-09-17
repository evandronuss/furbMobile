import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import HTMLView from 'react-native-htmlview';
import Topic from '../components/Topic';
import IconTitle from '../components/IconTitle';

export default class Panels extends Component {
	constructor(props) {
    super(props);

    this.state = { activeSection: 0 };
  }

	setSection(section) {
    this.setState({ activeSection: section });
  }
  
  filterPanels(panels) {
    return panels.filter((panel) => this.props.contentPanels &&
                                    (
                                      this.props.contentPanels[panel.ref] ||
                                      !panel.ref
                                    ));
  }

	renderHeader(section) {
    return (
			<View
				style={[styles.header]}
			>
				<Text
					style={styles.headerText}
				>
					{section.title}
				</Text>
			</View>
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

  renderTopicContent(topics, key) {
		return (
      <Topic
        key={key}
        topics={topics}
      />
		);
  }
  
  renderIconTitle(iconTitle, key/*, align*/) {
    return (
      <IconTitle
        key={key}
        iconTitle={iconTitle}
        //styles={(align && align.toLowerCase() === 'row' ? { marginRight: 10 } : undefined)}
      />
    );
  }

  renderHorarios(horarios, key) {
    return (
      <View key={key}>
        <Text />
        <Text
          style={{ fontWeight: 'bold' }}
        >
          Horários:
        </Text>
        {horarios.map((item, index) => (
          <View
            key={`contentHorarios_${index}`}
            style={{ flexDirection: 'row' }}
          >
            <Text>
              {item.horario}
            </Text>
            {item.esgotado && <Text
              style={{ fontWeight: 'bold', color: 'red' }}
            >
              {' (Esgotado)'}
            </Text>}
          </View>
        ))}
      </View>
    );
  }

  renderContentPanel(section, i) {
    if (
      !this.props.contentPanels ||
      (
        !this.props.contentPanels[section.ref] &&
        !this.props.contentPanels[i].contentPanel
      )
    ) {
      return;
    }

    return (
			<View
				style={[styles.content, (
          section.align && section.align.toLowerCase() === 'row' ?
          styles.directionRow :
          undefined
        )]}
			>
        {(
          this.props.contentPanels[section.ref] ||
          this.props.contentPanels[i].contentPanel
        ).map((item, index) => {
          const key = `contentPanel_${i}_${index}`;

          if (item.horarios) {
            return this.renderHorarios(item.horarios, key);
          }

          if (item.iconTitle) {
            return this.renderIconTitle(item.iconTitle, key/*, section.align*/);
          }

          if (item.topics) {
            return this.renderTopicContent(item.topics, key);
          }

          return this.renderTextContent(item.content, key);
        })}
      </View>
    );
  }

	render() {
    return (
			<ScrollView style={styles.container}>
				<Accordion
					activeSection={this.state.activeSection}
					sections={this.filterPanels(this.props.panels)}
					renderHeader={this.renderHeader.bind(this)}
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
    backgroundColor: '#FFF',
    marginBottom: 15
  },
  header: {
		backgroundColor: '#005FA4',
		marginTop: 15,
    padding: 8,
    marginLeft: 15,
		marginRight: 15
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
		fontWeight: 'bold',
		color: '#FFF'
  },
  content: {
    padding: 15,
		backgroundColor: '#fff',
		borderColor: '#007ED8',
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
    marginLeft: 15,
		marginRight: 15
  },
  directionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
