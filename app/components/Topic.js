import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

export default class Topic extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.topics.map((topic, index) => (
          <View
            key={`contentTopic_${index}`}
            style={styles.topic}
          >
            {topic.marker && topic.marker.toLowerCase() === 'arrow' && <Icon
              name='navigate-next'
              size={20}
              color='#757575'
              containerStyle={styles.containerIconSimpleTopic}
            />}
            {(!topic.marker || topic.marker.toLowerCase() !== 'arrow') && <Icon
              name='lens'
              size={7}
              color='#757575'
              containerStyle={styles.containerIconTopic}
            />}
            <HTMLView
              value={`<p>${topic.content}</p>`}
            />
          </View>))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topic: {
    flex: 1,
    flexDirection: 'row'
  },
  containerIconSimpleTopic: {
    justifyContent: 'flex-start',
    marginLeft: -7,
    marginRight: -1
  },
  containerIconTopic: {
    justifyContent: 'flex-start',
    marginTop: 7,
    marginRight: 5
  }
});
