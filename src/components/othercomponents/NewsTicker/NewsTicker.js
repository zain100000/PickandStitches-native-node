import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class NewsTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: [
        'Due To Increasing Rates in Petrol The Delivery Charges Will Be Applicable From Now And The Delivery Charges Will Be 300 Rs/- Only!',
      ],
      translateX: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    const {newsItems} = this.state;
    const itemWidth = screenWidth * 3; // Adjust the item width as needed

    Animated.loop(
      Animated.timing(this.state.translateX, {
        toValue: -itemWidth,
        duration: 15000, // Adjust the duration for the marquee speed
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      {onFinish: () => this.startAnimation()},
    ).start();
  }

  render() {
    return (
      <View className="flex flex-col">
        <View className="flex-row items-center w-100 overflow-hidden ">
          <View className="bg-yellow-500 p-9 w-42 z-10">
            <Text
              className="text-dark text-base"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Latest News
            </Text>
          </View>
          <View className="flex-1 border-2 border-b-black border-t-0 border-l-0 border-r-0 bg-black p-9 z-index:1">
            <Animated.View
              style={[
                styles.marqueeItem,
                {
                  transform: [{translateX: this.state.translateX}],
                  width: screenWidth * 3,
                },
              ]}>
              {this.state.newsItems.map((item, index) => (
                <Text
                  key={index}
                  className="text-[16px] text-light"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item}
                </Text>
              ))}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marqueeItem: {
    flexDirection: 'row',
  },
});

export default NewsTicker;
