import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sidemenu from '../Sidemenu'
import { LineChart } from 'react-native-chart-kit'
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    };
    this.datesAppetizer = ['10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm']
    this.valuesAppetizer1 = [20, 68, 72, 70, 77, 70, 68, 70, 73, 75, 78, 74, 70, 69, 68, 61, 55, 32]
    this.valuesAppetizer2 = [40, 54, 76, 75, 55, 50, 52, 55, 65, 78, 82, 95, 94, 87, 65, 61, 54, 31]
    this.valuesAppetizer3 = [37, 52, 77, 77, 79, 75, 66, 60, 52, 48, 64, 82, 93, 89, 89, 68, 57, 33]
    this.valuesAppetizer4 = [15, 37, 61, 75, 68, 54, 49, 45, 45, 56, 57, 61, 73, 80, 90, 94, 80, 74]
  }
  handleIndexChange = (index) => {
    options=['Today', 'Yesterday', 'Week', 'Month']
    urlTab = options[index]
    // console.log(urlTab)
    urlTab = urlTab.substring(0,3).toLowerCase()
    // console.log(urlTab)
    urlTab = '/analytics/' + urlTab
    // console.log(urlTab)
    this.props.history.push(urlTab)
  }

  render() {
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Analytics'} />

        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.headerText}>Analytics </Text>
            <View style={{marginHorizontal: 100}}>
              <SegmentedControlTab
                values={['Today', 'Yesterday', 'Last Seven Days', 'Last Month']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}

              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', width: '50%', height: '85%' }}>
                <Text style={styles.textStyles}>Appetizer</Text>

                <View>

                  <LineChart

                    data={{
                      labels: this.datesAppetizer,
                      datasets: [{
                        data: this.valuesAppetizer1
                      }]
                    }}
                    redraw
                    width={315} // from react-native
                    height={240}
                    yAxisLabel={' '}
                    chartConfig={{
                      backgroundColor: '#26872a',
                      backgroundGradientFrom: '#43a047',
                      backgroundGradientTo: '#66b66a',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center', width: '50%', height: '85%' }}>
                <Text style={styles.textStyles}>Soups</Text>

                <View>

                  <LineChart

                    data={{
                      labels: this.datesAppetizer,
                      datasets: [{
                        data: this.valuesAppetizer2
                      }]
                    }}
                    redraw
                    width={315} // from react-native
                    height={240}
                    yAxisLabel={' '}
                    chartConfig={{
                      backgroundColor: '#ff3e03',
                      backgroundGradientFrom: '#ff3e03',
                      backgroundGradientTo: '#ff3e03',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', width: '50%', height: '85%' }}>
                <Text style={styles.textStyles}>Main Course</Text>
                <View>

                  <LineChart

                    data={{
                      labels: this.datesAppetizer,
                      datasets: [{
                        data: this.valuesAppetizer3
                      }]
                    }}
                    redraw
                    width={315} // from react-native
                    height={240}
                    yAxisLabel={' '}
                    chartConfig={{
                      backgroundColor: '#e26a00',
                      backgroundGradientFrom: '#fb8c00',
                      backgroundGradientTo: '#ffa726',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center', width: '50%', height: '85%' }}>
                <Text style={styles.textStyles}>Dessert</Text>

                <View>

                  <LineChart

                    data={{
                      labels: this.datesAppetizer,
                      datasets: [{
                        data: this.valuesAppetizer4
                      }]
                    }}
                    redraw
                    width={315} // from react-native
                    height={240}
                    yAxisLabel={' '}
                    chartConfig={{
                      backgroundColor: '#022173',
                      backgroundGradientFrom: '#022173',
                      backgroundGradientTo: '#1b3fa0',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
  },
  headerText: {
    paddingTop: '3%',
    paddingBottom: '1.5%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
  activeTabContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,186,51,0.7)'
  },
  inactiveTabContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,186,51,0.35)'
  },
  tabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  textStyles: {
    color: 'white',
    fontSize: 36,
    fontWeight: '200',
    marginBottom: -2,
    marginTop: 10
  },
  imageStyles: {
    width: '80%',

  }
});
