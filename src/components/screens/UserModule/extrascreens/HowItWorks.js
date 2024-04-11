import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';

const HowItWorks = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-1 items-center">
          <View className="flex-1 items-center border-b-primary border-4 border-t-0 border-l-0 border-r-0 mt-10">
            <Text
              className="text-[30px] text-primary"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              How Pick & Stitches Works
            </Text>
          </View>

          <Text
            className="text-gray-500 text-sm text-center mt-5"
            style={{fontFamily: 'Montserrat-Medium'}}>
            We offer quality & convenient factory finished sewing services for
            man & women. Kurtas, Shalwar Suits & Trousers stitched to perfection
            as per your measurements. We collect your fabric, sew, finish &
            deliver within Islamabad & Rawalpindi.
          </Text>

          <View className="flex-1 mt-5 p-5">
            <View className="items-center p-5">
              <Image
                source={require('../../../../assets/howitwork/01.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center top-2"
                style={{fontFamily: 'Montserrat-Bold'}}>
                01. Place Your Order Online
              </Text>
              <Text
                className="text-gray-500 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Place your order online or give us a call to schedule a free
                pickup.we are always ready to serve you
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../../assets/howitwork/02.jpg')}
                className="w-48 h-48 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center top-2"
                style={{fontFamily: 'Montserrat-Bold'}}>
                02.Pick Stuff From Your Door Step
              </Text>
              <Text
                className="text-gray-500 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Your dress material and the sample garment that fits you
                perfectly will be picked up by our representative as soon as you
                place an order. Your custom tailored outfit and the sample
                garment will be properly packaged and securely delivered at your
                doorstep within 3 to 5 working days. You will avail both pickup
                and delivery services.
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../../assets/howitwork/03.jpg')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center top-2"
                style={{fontFamily: 'Montserrat-Bold'}}>
                03.Stitch Your Stuff
              </Text>
              <Text
                className="text-gray-500 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Our highly skilled and professional tailors have years of
                experience of making custom made dresses with the trendiest
                designs for men, women and children alike. Our experts work
                closely with the customers to ensure that they get to enjoy
                perfectly fitting dresses having the best and latest designs.
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../../assets/howitwork/04.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center top-2"
                style={{fontFamily: 'Montserrat-Bold'}}>
                04.Deliver Your Order At Your Door Step
              </Text>
              <Text
                className="text-gray-500 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Enjoy a hassle experience of getting your desired outfit
                stitched and delivered at your doorstep.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowItWorks;
