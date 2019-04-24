import React, { Component } from 'react';
import { AppRegistry, Alert, View, Text, StyleSheet, Image } from 'react-native';
import AppIntro from 'rn-falcon-app-intro';
import { Font } from 'expo';

export default class Home extends Component {
    // load Arial Font 
    async componentDidMount(){
        await Font.loadAsync({
          'Arial': require('../assets/fonts/ArialCE.ttf')
        });
        this.setState({ fontLoaded: true });
      }

    
    onSkipBtnHandle = (index) => {
        this.props.history.push("/home")
    }
    doneBtnHandle = () => {
        this.props.history.push("/home")
    }
    nextBtnHandle = (index) => {
        // Alert.alert('Next');
        // console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        // console.log(index, total);
    }
    render() {
        const pageArray = [{
            title: 'Page 1',
            description: 'Description 1',
            img: require('../assets/Start/dashboard.jpg'),
            imgStyle: {
                height: 120 * 2.5,
                width: 109 * 2.5,
                borderRadius: 30,
                marginTop: 100,
            },
            backgroundColor: '#fa931d',
            fontColor: '#fff',
            level: 10,
        }, {
            title: 'Page 3',
            description: 'Description 1',
            img: 'https://goo.gl/Bnc3XP',
            imgStyle: {
                height: 80 * 2.5,
                width: 109 * 2.5,
            },
            backgroundColor: '#fa931d',
            fontColor: '#fff',
            level: 10,
        }, {
            title: 'Page 3',
            description: 'Description 1',
            img: 'https://goo.gl/Bnc3XP',
            imgStyle: {
                height: 80 * 2.5,
                width: 109 * 2.5,
            },
            backgroundColor: '#fa931d',
            fontColor: '#fff',
            level: 10,
        }, {
            title: 'Page 2',
            description: 'Description 2',
            img: 'https://goo.gl/Bnc3XP',
            imgStyle: {
                height: 93 * 2.5,
                width: 103 * 2.5,
            },
            backgroundColor: '#a4b602',
            fontColor: '#fff',
            level: 10,
        }];
        return (
            //   <AppIntro

            //     pageArray={pageArray}
            //     style={{paddingTop: 900}}
            //   />
            <AppIntro
            onNextBtnClick={this.nextBtnHandle}
            onDoneBtnClick={this.doneBtnHandle}
            onSkipBtnClick={this.onSkipBtnHandle}
            onSlideChange={this.onSlideChangeHandle}
            nextButton={<Text>&gt;</Text>} prevButton={<Text>&lt;</Text>} 
            >
                <View style={[styles.slide, { backgroundColor: '#FFBE0B' }]}>
                    <View level={10} style={styles.viewStyle}>
                        <Image source={require("../assets/Start/dashboard.jpg")} style={styles.imgStyle} />
                        <Text style={styles.text}>Real-Time Dashboard</Text>
                        <Text style={styles.subText}>Equipping chefs with real-time notification system to monitor the progress of each dish</Text>
                    </View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#F75C03' }]}>
                    <View level={10} style={styles.viewStyle}>
                        <Image source={require("../assets/Start/menu.jpg")} style={styles.imgStyle} />
                        <Text style={styles.text}>Customized Menu</Text>
                        <Text style={styles.subText}>Alert notifications based on time it takes to prepare each dish</Text>
                    </View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#8EA604' }]}>
                    <View level={10} style={styles.viewStyle}>
                        <Image source={require("../assets/Start/analytics.jpg")} style={styles.imgStyle} />
                        <Text style={styles.text}>Visual Analytics</Text>
                        <Text style={styles.subText}>Live display of the trends over the past week and month</Text>
                    </View>
                </View>
                <View style={[styles.slide, { backgroundColor: '#D90368' }]}>
                    <View level={10} style={styles.viewStyle}>
                        <Image source={require("../assets/Start/insights.jpg")} style={styles.imgStyle} />
                        <Text style={styles.text}>Fresh Insights</Text>
                        <Text style={styles.subText}>Actionable Insights that can bring tangible change based on real-time conditions</Text>
                    </View>
                </View>
            </AppIntro>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        color: 'white',
        height: "100%"
    },
    text: {
        color: 'white',
        fontSize: 40
    },
    imgStyle: {
        height: 170 * 2.5,
        width: 156 * 2.5,
        borderRadius: 30,
        marginBottom: 30,
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subText: {
        fontSize: 28,
        paddingTop: 8,
        paddingHorizontal: 180,
        textAlign: 'center',
        color: 'white',
    }
})
