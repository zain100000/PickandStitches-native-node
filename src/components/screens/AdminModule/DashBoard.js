import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {format} from 'date-fns';

const DashBoard = () => {
  // Get the current date
  const currentDate = new Date();

  // Format the date in the desired format
  const formattedDate = format(currentDate, 'dd-MMMM-yyyy');

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-white">
      <View className="flex-row top-2">
        <Text
          className="text-center text-lg text-dark right-2"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Current Day:
        </Text>
        <Text
          className="text-center text-lg text-ternary"
          style={{fontFamily: 'Montserrat-Bold'}}>
          {formattedDate}
        </Text>
      </View>

      <View className="w-96 items-center p-6 mt-10 shadow-md shadow-gray-400">
        <Text
          className="text-lg text-[#8B0000]"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Welcome Back Admin
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;
