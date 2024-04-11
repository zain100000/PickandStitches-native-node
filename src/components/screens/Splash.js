import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const [isConnected, setIsConnected] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);

      if (netInfoState.isConnected) {
        setTimeout(() => {
          navigation.replace('UserHome');
        }, 2000);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      if (state.isConnected) {
        checkInternetConnection();
      }
    });

    // Check the internet connection status when the component mounts
    checkInternetConnection();

    // Clean up the event listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Animatable.Image
        source={require('../../assets/logo.png')}
        animation={'fadeIn'}
        duration={2000}
        className="w-[285px] h-[130px] object-contain"
      />

      {isConnected === false && (
        <View style={styles.overlay}>
          {/* Image for no internet connection */}
          <Image
            source={require('../../assets/svg_image.webp')}
            className="w-36 h-36 object-contain"
          />

          <Text className="text-red-500 font-semibold text-lg">
            No internet connection
          </Text>
        </View>
      )}

      {isConnected === true && (
        <ActivityIndicator color="green" className="mt-10" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Splash;
