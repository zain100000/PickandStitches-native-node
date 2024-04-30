import React, {useEffect} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('UserHome');
    }, 2000);
  }, []);

  return (
    <View className="flex-1 justify-center left-3">
      <View className="items-center">
        <Animatable.Image
          source={require('../../assets/logo.png')}
          animation={'fadeIn'}
          duration={1500}
          className="w-[142px] h-[140px] object-contain shadow-black mb-5"
        />
      </View>
    </View>
  );
};

export default Splash;
