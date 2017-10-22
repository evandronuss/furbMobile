import React, { Component } from 'react';
import {
  Text,
  DrawerLayoutAndroid,
  //Image,
  Dimensions,
  ToolbarAndroid,
  ScrollView,
  StyleSheet
} from 'react-native';
import Image from 'react-native-transformable-image';
//import PinchZoomView from 'react-native-pinch-zoom-view';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerMenu from './components/Menu';

const LogoFurb = require('./imagens/matricula-calouros.png');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [0],
      drawerClosed: true,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    //this._onActionSelected = this._onActionSelected.bind(this);
    //this.navigateTo = this.navigateTo.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);
    //this.handlesBackButton = this.handlesBackButton.bind(this);
  }
  
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
  }

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed
    });
  }

  toggleDrawer() {
    if (this.state.drawerClosed) {
      this.DRAWER.openDrawer();
    } else {
      this.DRAWER.closeDrawer();
    }
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(drawerElement) => { this.DRAWER = drawerElement; }}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        onDrawerOpen={this.setDrawerState}
        onDrawerClose={this.setDrawerState}
        renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}
      >
        <Icon.ToolbarAndroid
          titleColor='#fff'
          // title='Lighthouses'
            //--> Remove the View child of the Toolbar if you
            // don't need a Icon.
          navIconName='md-menu'
          onIconClicked={this.toggleDrawer}
          //actions={toolbarActions}
          //onActionSelected={this._onActionSelected}
          style={styles.appBar}
          overflowIconName="md-more"
        />
        <Text>teste</Text>
        {/*<PinchZoomView>
          <Image
            style={{ width: 350, height: 495 }}
            //source={{ uri: 'https://raw.githubusercontent.com/yoaicom/resources/master/images/game_of_thrones_1.jpg' }}
            source={LogoFurb}
          />
        </PinchZoomView>*/}
        <ScrollView style={{ flex: 1 }} onLayout={this.onLayout.bind(this)}>
          {<Image
            style={{ width: this.state.width, height: (this.state.width * 1.4141) }}
            //source={{ uri: 'https://raw.githubusercontent.com/yoaicom/resources/master/images/game_of_thrones_1.jpg' }}
            source={LogoFurb}
            pixels={{ width: this.state.width, height: (this.state.width * 1.4141) }}
          />}
        </ScrollView>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    backgroundColor: '#2196F3',
    elevation: 4
  },
  appBarLogo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  appBarTitle: {
    fontSize: 20,
    color: '#fff',
    paddingLeft: 10
  }
});
