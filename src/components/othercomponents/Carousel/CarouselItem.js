import React from 'react';
import {View, Text, Image} from 'react-native';

const CarouselItem = ({item}) => {
  return (
    <View className="flex-1 items-center">
      <Image
        source={item.imageUri}
        className="w-full h-full bg-contain object-contain"
      />
      <View className="absolute w-full h-full items-center justify-center">
        <Text
          className="text-[30px] text-light mb-2 w-[350px] text-center"
          style={{fontFamily: 'Montserrat-SemiBold'}}>
          {item.title}
        </Text>
        <Text
          className="text-[16px] text-center w-[350px]"
          style={{fontFamily: 'Montserrat-Medium'}}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default CarouselItem;
