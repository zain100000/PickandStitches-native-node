import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const FeedBack = () => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Declare and initialize refs
  const fullnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const formTranslateY = new Animated.Value(200);

  const animateScreen = () => {
    Animated.parallel([
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animateScreen();
  }, []);

  const handleFeedBack = async () => {
    try {
      setLoading(true);
      const feedbackData = {
        name: fullname, // Use fullname instead of name
        email,
        mobile,
        subject,
        message,
      };

      console.log('Feedback data:', feedbackData); // Log feedback data before sending the request

      const FeedBackApiUrl =
        'https://pickandstitches-deployment-server.onrender.com/api/feedback/uploadFeedBack';
      const response = await axios.post(FeedBackApiUrl, feedbackData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Thank You! Your FeedBack Has Been Submitted!');
        navigation.navigate('Home');
      } else {
        alert('Error Submitting Feedback!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error during submitting feedback:', error); // Log any errors that occur
      alert('Error During Submitting Feedback!');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); // Start the refreshing indicator

    // Simulate a delay to show the refreshing indicator
    setTimeout(() => {
      // Clear the form by resetting the state variables
      setFullName('');
      setEmail('');
      setMobile('');
      setSubject('');
      setMessage('');
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay (adjust as needed)
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Animated.View
          style={[
            styles.container,
            {transform: [{translateY: formTranslateY}]},
          ]}>
          {/* Form Start */}

          <View className="flex-1 inset-y-0 mt-16 px-3">
            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <AntDesign name="user" size={25} color={'#000'} />
              </View>
              <TextInput
                className="text-sm px-5 text-black w-full"
                placeholder="Your Name"
                placeholderTextColor={'#000'}
                value={fullname}
                onChangeText={setFullName}
                ref={fullnameRef}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <AntDesign name="mail" size={25} color={'#000'} />
              </View>
              <TextInput
                className="text-sm px-5 text-black w-full"
                keyboardType="email-address"
                placeholder="Your Email"
                placeholderTextColor={'#000'}
                value={email}
                onChangeText={setEmail}
                ref={emailRef}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <AntDesign name="mobile1" size={25} color={'#000'} />
              </View>
              <TextInput
                className="text-sm px-5 text-black w-full"
                keyboardType="number-pad"
                placeholder="Your Phone"
                placeholderTextColor={'#000'}
                value={mobile}
                onChangeText={setMobile}
                ref={mobileRef}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <AntDesign name="book" size={25} color={'#000'} />
              </View>
              <TextInput
                className="text-sm px-5 text-black w-full"
                placeholder="Subject"
                placeholderTextColor={'#000'}
                value={subject}
                onChangeText={setSubject}
                ref={subjectRef}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="justify-center">
                <AntDesign name="message1" size={25} color={'#000'} />
              </View>
              <TextInput
                className="text-sm px-5 text-dark border-b-2 border-b-black w-full"
                placeholder="Message"
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
                ref={messageRef}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>

            {/* Button Start */}
            <TouchableOpacity
              className="justify-center items-center rounded-lg p-3 mt-5 mb-5 bg-primary"
              onPress={handleFeedBack}>
              {loading ? (
                <ActivityIndicator color={'#000'} /> // Show loader while loading
              ) : (
                <Text
                  className="text-black text-xl"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  Submit
                </Text> // Show login text when not loading
              )}
            </TouchableOpacity>
            {/* Button End */}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
