import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';


export default class Sidemenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Render the active tab based on the prop passed into the sidemenu component
  render() {
      if (this.props.page == 'Home') {
        homeStyle = styles.activeButtonContainer;
        menuStyle = styles.inactiveButtonContainer;
        analyticsStyle = styles.inactiveButtonContainer;
        insightsStyle = styles.inactiveButtonContainer;
      } else if (this.props.page == 'Menu') {
        homeStyle = styles.inactiveButtonContainer;
        menuStyle = styles.activeButtonContainer;
        analyticsStyle = styles.inactiveButtonContainer;
        insightsStyle = styles.inactiveButtonContainer;
      } else if (this.props.page == 'Analytics') {
        homeStyle = styles.inactiveButtonContainer;
        menuStyle = styles.inactiveButtonContainer;
        insightsStyle = styles.inactiveButtonContainer;
        analyticsStyle = styles.activeButtonContainer;
      } else if (this.props.page == 'Insights') {
        homeStyle = styles.inactiveButtonContainer;
        menuStyle = styles.inactiveButtonContainer;
        analyticsStyle = styles.inactiveButtonContainer;
        insightsStyle = styles.activeButtonContainer;
      }
    return (
        <View>
        <View style={styles.container} >
            <View style={styles.sidebar}>
                <Image style={styles.marriotBackground} source={require('../assets/Home/MarriotBackground.png')} />




                <TouchableOpacity style={homeStyle} onPress={()=> this.props.history.push("/home")}>
                    <View style={styles.homeButton}>
                        <Image resizeMode={'contain'} style={styles.buttonIcon} source={require('../assets/Home/homeIcon.png')} />    
                    </View>           
                    <Text style={styles.buttonText}>Home</Text>

                </TouchableOpacity>  
                <TouchableOpacity style={menuStyle} onPress={()=> this.props.history.push("/menu")}>
                    <View>
                        <Image style={styles.buttonIcon} source={require('../assets/Home/menuIcon.png')} />    
                    </View>               
                    <Text style={styles.buttonText}>Menu</Text>

                </TouchableOpacity>
                <TouchableOpacity style={insightsStyle} onPress={()=> this.props.history.push("/insights")}>
                    <View>
                        <Image style={styles.buttonIcon} source={require('../assets/Home/ideasIcon.png')} />    
                    </View>      
                    <Text style={styles.buttonText}>Insights</Text>
                </TouchableOpacity>      

                <TouchableOpacity style={analyticsStyle} onPress={()=> this.props.history.push("/analytics/tod")}>
                    <View>
                        <Image style={styles.buttonIcon} source={require('../assets/Home/analyticsIcon.png')} />    
                    </View>      
                    <Text style={styles.buttonText}>Analytics</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      backgroundColor: '#0C2336',
      height: '100%',
      width: '100%',      

    },

    sidebar: {
        // height: '100%',
        width: '31%',
        // flexDirection: "row",
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(184,35,64,0.31)',
        justifyContent: 'flex-start',
        // width: '100%',
        flexGrow: 1, 
    },
    body: {
        height: "100%",
        width: 500,
        flex: 1,
    },
    marriotBackground: {
        width: '100%',
        height:'35%',
        marginBottom: '8%',

    },
    activeButtonContainer: {
        flexDirection: 'row',
        paddingLeft: '20%',
        backgroundColor: '#B82340',
        marginTop: 15,
        marginHorizontal: '6%',
        paddingLeft: 20,
        paddingVertical: 10,
        borderRadius: 40,
    },
    inactiveButtonContainer: {
        flexDirection: 'row',
        paddingLeft: '20%',
        marginTop: 15,
        marginHorizontal: '6%',
        paddingLeft: 20,
        paddingVertical: 10,
        borderRadius: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 8
    },
    buttonIcon: {
        marginLeft: 10,
        paddingTop: 20,

        //// CODE TO SHIRNK SIZE OF ICONS
        // borderColor: 'green',
        // borderWidth: 2,
        // flex: 1,
        // width: null,
        // height: null,
        
    },

    homeButton: {
        justifyContent: 'flex-end',
        paddingBottom: 5,

        //// CODE TO SHIRNK SIZE OF ICONS
        // borderColor: 'green',
        // borderWidth: 2,
        // height: 50,
        // width:50
    }
  });