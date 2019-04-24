import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sidemenu from '../Sidemenu'
import { LineChart } from 'react-native-chart-kit'
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 3,
    };
    this.datesAppetizer = [1, 5, 10, 15, 20, 25, 30]
    this.valuesAppetizer1 = [60, 67, 64, 63, 70, 77, 79, 82, 68, 67, 69, 64, 62, 60, 65, 70, 78, 82, 83, 90, 91, 92, 83, 84, 82, 80, 78, 77, 74, 72]
    this.valuesAppetizer2 = [60, 61, 62, 63, 60, 65, 66, 64, 68, 70, 71, 72, 75, 76, 77, 78, 74, 72, 67, 64, 65, 62, 68, 64, 69, 73, 74, 74, 77, 73]
    this.valuesAppetizer3 = [68, 70, 71, 72, 75, 76, 77, 78, 74, 72, 70, 68, 69, 65, 62, 63, 61, 64, 69, 65, 65, 70, 72, 73, 77, 78, 80, 81, 79, 82]
    this.valuesAppetizer4 = [82, 83, 82, 84, 82, 83, 84, 82, 80, 78, 77, 74, 72, 60, 67, 64, 63, 70, 77, 79, 82, 68, 67, 69, 64, 62, 60, 65, 70, 78]
  }
  handleIndexChange = (index) => {
    options = ['Today', 'Yesterday', 'Week', 'Month']
    urlTab = options[index]
    // console.log(urlTab)
    urlTab = urlTab.substring(0, 3).toLowerCase()
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
            <View style={{ marginHorizontal: 100 }}>
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
