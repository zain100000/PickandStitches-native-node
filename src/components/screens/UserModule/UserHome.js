import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from '../../othercomponents/Carousel/CarouselItem';
import NewsTicker from '../../othercomponents/NewsTicker/NewsTicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    title: 'Design Your Suit Online',
    description: 'Stitching services at your doorstep - just a click away!.',
    imageUri: require('../../../assets/slider/slider1.jpg'),
  },
  {
    title: 'Easy Stitching At Your Door Step',
    description:
      'We offer quality & convenient factory finished sewing services for man & women. Kurtas, Shalwar Suits & Trousers stitched to perfection as per your measurements. We collect your fabric, sew, finish & deliver within Islamabad & Rawalpindi.',
    imageUri: require('../../../assets/slider/slider2.jpg'),
  },
  {
    title: 'Refer Your Friends And Get Reward',
    description: 'Refer Your Friends And Get Reward',
    imageUri: require('../../../assets/slider/slider3.jpg'),
  },
];

const UserHome = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Add your refresh logic here, e.g., fetch new data

    // Simulate a delay to show the refreshing indicator
    setTimeout(() => {
      // Update your data or perform any other actions

      // Set refreshing back to false when done
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay (adjust as needed)
  };

  renderItem = ({item}) => (
    <CarouselItem
      item={item}
      onPressButton1={() => console.log('Button 1 pressed')}
      onPressButton2={() => console.log('Button 2 pressed')}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {/* Carousel */}
        <View className="justify-center items-center h-96">
          <Carousel
            data={data}
            renderItem={this.renderItem}
            sliderWidth={500}
            itemWidth={500}
            autoplay={true}
            loop={true}
            onSnapToItem={index => setActiveSlide(index)}
            autoplayInterval={4000}
            animationType={'ease-in-out'}
          />
        </View>
        {/* Carousel */}

        {/* News Ticker */}
        <View className="flex-1">
          <NewsTicker />
        </View>
        {/* News Ticker */}

        {/* Tailor Online */}
        <View className="flex-1 p-5">
          <View className="flex-1">
            <View className="border-b-primary border-4 border-t-0 border-l-0 border-r-0 w-[70%] left-[52px]">
              <Text
                className="text-primary text-[25px] text-center"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Hi! We’re Tailor Online
              </Text>
            </View>

            <Text
              className="text-gray-400 text-[16px] justify-center text-center top-5"
              style={{fontFamily: 'Montserrat-Medium'}}>
              We offer the modern-day woman and man an unparalleled
              made-to-measure online tailoring service. It is a unique
              experience that lets you express your personal sense of style
              without having to worry about design, fit, quality, and delivery
              commitment. Offering free pick-up and delivery service in
              Rawalpindi, Islamabad, the service provides customizable designs
              in blouses, kurtas, suits, and bottoms according to the client's
              individual measurement.
            </Text>
          </View>

          <View className="flex-1 top-16 items-center mb-28">
            <Image
              source={require('../../../assets/tailoronline/tailor-online.png')}
              className="w-[300px] h-[300px] bg-contain object-contain"
            />
          </View>
        </View>
        {/* Tailor Online */}

        {/* Men-Women Products */}
        <View className="flex-1 items-center">
          <View className="flex-1 items-center border-b-primary border-4 border-t-0 border-l-0 border-r-0">
            <Text
              className="text-[25px] text-primary"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Products
            </Text>
          </View>
          <View className="mt-5">
            <Image
              source={require('../../../assets/men-women-products/men.png')}
              className="w-[250px] h-[350px] bg-contain object-contain"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('MenProducts')}>
              <View className="bg-primary pl-10 pr-10 pt-5 pb-5 rounded-xl m-5">
                <Text
                  className="text-center text-light text-[18px]"
                  style={{fontFamily: 'Montserrat-Medium'}}>
                  Gents Products
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={require('../../../assets/men-women-products/women.png')}
              className="w-[250px] h-[350px] bg-contain object-contain"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('WomenProducts')}>
              <View className="bg-primary pl-10 pr-10 pt-5 pb-5 rounded-xl m-5">
                <Text
                  className="text-center text-light text-[18px]"
                  style={{fontFamily: 'Montserrat-Medium'}}>
                  Ladies Products
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Men-Women Products */}

        {/* Tailor Works */}
        <View className="flex-1 items-center">
          <View className="flex-1 items-center border-b-primary border-4 border-t-0 border-l-0 border-r-0 mt-10">
            <Text
              className="text-[25px] text-primary"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              How Tailor Works Online
            </Text>
          </View>

          <View className="flex-1">
            <View className="items-center p-5">
              <Image
                source={require('../../../assets/tailorworks/work1.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center"
                style={{fontFamily: 'Montserrat-Bold'}}>
                CUSTOMISE & PLACE ORDER ONLINE
              </Text>
              <Text
                className="text-gray-600 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-Medium'}}>
                Choose your product and personalize it with custom necklines,
                sleeves, etc.
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../assets/tailorworks/work2.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center"
                style={{fontFamily: 'Montserrat-Bold'}}>
                GIVE US YOUR MEASUREMENT GARMENT
              </Text>
              <Text
                className="text-gray-600 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-Medium'}}>
                While we pick up your dress material, give us a perfectly
                fitting garment to stitch as per your measurements
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../assets/tailorworks/work3.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center"
                style={{fontFamily: 'Montserrat-Bold'}}>
                3 To 5 DAYS TO STITCH & DELIVER
              </Text>
              <Text
                className="text-gray-600 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-Medium'}}>
                Each material is individually hand-cut, stitched, and finished
                by professional tailors and delivered to your doorstep
              </Text>
            </View>

            <View className="items-center p-5">
              <Image
                source={require('../../../assets/tailorworks/work4.png')}
                className="w-36 h-36 bg-contain object-contain"
              />
              <Text
                className="text-dark text-[20px] text-center"
                style={{fontFamily: 'Montserrat-Bold'}}>
                PAY ON DELIVERY
              </Text>
              <Text
                className="text-gray-600 text-[16px] text-center top-3"
                style={{fontFamily: 'Montserrat-Medium'}}>
                Pay by cash after you receive your newly stitched outfit along
                with the measurement garment.
              </Text>
            </View>
          </View>
        </View>
        {/* Tailor Works */}

        {/* About Us */}
        <View className="flex-1 items-center">
          <View className="flex-1 items-center border-b-primary border-4 border-t-0 border-l-0 border-r-0 mt-10">
            <Text
              className="text-[25px] text-primary"
              style={{fontFamily: 'Montserrat-Bold'}}>
              About Us
            </Text>
          </View>
          <Text
            className="text-gray-500 text-sm text-center top-3"
            style={{fontFamily: 'Montserrat-Medium'}}>
            We offer the modern-day woman and man an unparalleled
            made-to-measure online tailoring service. It is a unique experience
            that lets you express your personal sense of style without having to
            worry about design, fit, quality, and delivery commitment. Offering
            free pick-up and delivery service in Rawalpindi, Islamabad, the
            service provides customizable designs in blouses, kurtas, suits, and
            bottoms according to the client's individual measurement.
          </Text>
        </View>
        {/* About Us */}

        {/* Our Contact */}
        <View className="flex-1 items-center">
          <View className="flex-1 items-center border-b-primary border-4 border-t-0 border-l-0 border-r-0 mt-10 mb-2">
            <Text
              className="text-[25px] text-primary"
              style={{fontFamily: 'Montserrat-Bold'}}>
              Our Contact
            </Text>
          </View>

          <View className="flex-row justify-around items-center">
            <View className="p-3 items-center">
              <View className="p-3">
                <Ionicons
                  name="phone-portrait-outline"
                  size={30}
                  color={'#539165'}
                />
              </View>
              <Text
                className="text-center text-gray-600"
                style={{fontFamily: 'Montserrat-Medium'}}>
                0333-1447770
              </Text>
              <Text
                className="text-center text-gray-600"
                style={{fontFamily: 'Montserrat-Medium'}}>
                0345-8629967
              </Text>
            </View>

            <View className="p-3 items-center top-2">
              <View className="p-3">
                <FontAwesome5 name="heartbeat" size={30} color={'#539165'} />
              </View>
              <Text
                className="w-28 text-center text-gray-600"
                style={{fontFamily: 'Montserrat-Medium'}}>
                support@pickandstitches.com
              </Text>
            </View>

            <View className="p-3 items-center">
              <View className="p-3">
                <Ionicons name="map-outline" size={30} color={'#539165'} />
              </View>
              <Text
                className="w-28 text-center text-gray-600"
                style={{fontFamily: 'Montserrat-Medium'}}>
                Peshawar Road Rawalpindi
              </Text>
            </View>
          </View>
        </View>
        {/* Our Contact */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserHome;
