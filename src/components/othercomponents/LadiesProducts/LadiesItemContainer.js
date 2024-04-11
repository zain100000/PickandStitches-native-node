import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LadiesItemsContainer = ({image, product, price, onwards}) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    // Navigate to the Ladies Order screen and pass the image source as a parameter
    navigation.navigate('LadiesOrderDetails', {image, product, price});
  };

  return (
    <TouchableOpacity
      className="flex-1 items-center mt-5 mb-3"
      onPress={handleItemPress}>
      <Image
        source={{uri: image}}
        className="object-contain rounded-md mt-2 w-[200px] h-[285px]"
      />

      {product ? (
        <>
          <View className="flex-1 items-center p-2">
            <Text
              className="text-[#c3497d] text-xl px-2 mt-2"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {product}
            </Text>
            <Text
              className="text-dark text-lg "
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Rs.{price}
            </Text>
            <Text
              className="text-primary text-lg "
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {onwards}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default LadiesItemsContainer;
