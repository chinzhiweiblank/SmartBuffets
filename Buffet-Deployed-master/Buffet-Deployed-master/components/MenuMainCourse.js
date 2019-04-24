import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import Sidemenu from './Sidemenu';
import FadeInView from 'react-native-fade-in-view'



export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          title: 'Bolognese',
          pngName: require('../assets/Menu/MainCourse/Bolognese.png'),
          preparationTime: 21,
        },
        {
          id: 2,
          title: 'Breaded Fish',
          pngName: require('../assets/Menu/MainCourse/BreadedFish.png'),
          preparationTime: 17,
        },
        {
          id: 3,
          title: 'Cordon Bleu',
          pngName: require('../assets/Menu/MainCourse/CordonBleu.png'),
          preparationTime: 25,
        },
        {
          id: 4,
          title: 'Lamb Chop',
          pngName: require('../assets/Menu/MainCourse/LambChop.png'),
          preparationTime: 29,
        },
        {
          id: 5,
          title: 'Lasagne',
          pngName: require('../assets/Menu/MainCourse/Lasagne.png'),
          preparationTime: 26,
        },
        {
          id: 6,
          title: 'Mexican Chorizo',
          pngName: require('../assets/Menu/MainCourse/MexicanChorizo.png'),
          preparationTime: 21,
        },
        {
          id: 7,
          title: 'Paella',
          pngName: require('../assets/Menu/MainCourse/Paella.png'),
          preparationTime: 18,
        },
        {
          id: 8,
          title: 'Risotto',
          pngName: require('../assets/Menu/MainCourse/Risotto.png'),
          preparationTime: 24,
        },
        {
          id: 9,
          title: 'Teriyaki Chicken',
          pngName: require('../assets/Menu/MainCourse/TeriyakiChicken.png'),
          preparationTime: 19,
        },
      ]

    };
  }

  renderCategories = (info) => {
    let currentItem = info.item
    return (
      <View style={{height: 130}}>
      <View >
        <ImageBackground
          style={styles.imageBackgroundFood}
          source={currentItem.pngName}
        >
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View style={{width: '84%'}}> 
            <Text style={styles.categoryText}>{currentItem.title}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop: '4.8%'}}>
            <Icon name='timer' size={40} style={{paddingTop: '0.5%'}} />
            <Text style={styles.preparationTiming}>{currentItem.preparationTime}</Text>
          </View>
        </View>   
        </ImageBackground>
      </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Menu'} />
        <FadeInView duration={3000} style={{width: '69%'}}>

        <ScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.headerText}>Main Course</Text>
          <View style={{justifyContent: 'flex-start'}}>
            <FlatList
              renderItem={this.renderCategories}
              data={this.state.categories}
              keyExtractor={(item) => item.id.toString()}            />
          </View>
        </View>
        </ScrollView>
        </FadeInView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    backgroundColor: '#0C2336',
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    flex: 1,

  },
  headerText: {
    paddingTop: '4%',
    paddingBottom: '4%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
  imageBackgroundFood: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: 42,
    paddingLeft: '6%',
    paddingTop: '4.9%',
    fontWeight: '200',
  },
  preparationTiming: {
    fontSize: 42,
    // paddingTop: '1%',
    paddingLeft: '1%',
    fontWeight: '100',
  },

});
