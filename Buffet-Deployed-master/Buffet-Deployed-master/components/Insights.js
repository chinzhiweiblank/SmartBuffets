

import React, { Component } from 'react';
import Sidemenu from "./Sidemenu"
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import Carousel from 'simple-carousel-react-native';
import FadeInView from 'react-native-fade-in-view'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      nameTest: 'tues',
      dayName: new Date().toLocaleString('en-us', {  weekday: 'long' }),
      customerFlow: [62,65,75,70,80,92,90],
      dayNumber: new Date().getDay() -1
    }
    
  }
  componentDidMount(){
    // // this.
    // console.log(this.state.dayName);
    // console.log(new Date().getDay() -1)


  }

  render() {
    // const data = 

    
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Insights'} />
        <FadeInView duration={900} style={{width: '69%'}}>

        <View style={styles.bodyContainer}>
          <Text style={styles.headerText}>Insights</Text>
          <Carousel
            color='rgba(184,35,64,0.7)'
            // style={{height: 1500, width: 1500}}
            height="76.5%"
            width={690}
            bubbleWidth={100}
            backgroundColor='FF0000'
            >

            <View style={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
              <Image style={{height: 470, width: 470}} source={require('../assets/Insight/dailyInsight.png')} />
              <Text style={{color:"white", paddingTop: 20, paddingHorizontal: 90, fontSize: 25, textAlign: "center",fontWeight: '200',}}>
              Predicted customer flow today ({this.state.dayName}) is {this.state.customerFlow[this.state.dayNumber]} customers every hour
                {/* Given that today is {this.state.dayName}, demand forecast from previous week indicates that each hour will average 80 customers */}
              </Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
              <Image style={{height: 470, width: 470}} source={require('../assets/Insight/weatherInsight.png')} />
              <Text style={{color:"white", paddingTop: 20, paddingHorizontal: 90, fontSize: 25, textAlign: "center",fontWeight: '200',}}>
              Weather is likely to be stormy today. Demand for soups projected to 18% more than usual 
                {/* Given that today is {this.state.dayName}, demand forecast from previous week indicates that each hour will average 80 customers */}
              </Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
              <Image style={{height: 470, width: 470}} source={require('../assets/Insight/dessertInsight.png')} />
              <Text style={{color:"white", paddingTop: 20, paddingHorizontal: 90, fontSize: 25, textAlign: "center",fontWeight: '200',}}>
                Revamp the recipes for pies and pavlova to suit the customer's tastebuds
                {/* Given that today is {this.state.dayName}, demand forecast from previous week indicates that each hour will average 80 customers */}
              </Text>
            </View>
          </Carousel>
          {/* <View style={{ marginLeft: 50, }}>
            <BarChart
              // style={graphStyle}
              data={{
                labels: ['Cheesecake', 'Cakes', 'Cupcakes', 'Tarts', 'Macaroons', 'Pies', 'Pavlova'],
                datasets: [{
                  data: [396,372,366,341,307,286,276,245,233,212] 
                }]
              }}
              style={{
              marginVertical: 8,
              borderRadius: 16
            }}
              width={600}
              height={600}
              yAxisLabel={' '}
              chartConfig={{
                backgroundColor: '#26872a',
                backgroundGradientFrom: '#43a047',
                backgroundGradientTo: '#66b66a',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  margin: 50,
                }
              }}
            />
          </View> */}
        </View>
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
    paddingBottom: '1.5%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
})
