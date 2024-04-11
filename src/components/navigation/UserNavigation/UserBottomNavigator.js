import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHome from '../../screens/UserModule/UserHome';
import MenProducts from '../../screens/UserModule/MenProducts/MenProducts';
import WomenProducts from '../../screens/UserModule/WomenProducts/WomenProducts';
import HowItWorks from '../../screens/UserModule/extrascreens/HowItWorks';
import FeedBack from '../../screens/UserModule/extrascreens/FeedBack';

const Tab = createBottomTabNavigator();

const UserBottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: true,
        tabBarLabel: '',
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
          color: '#fff',
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#908e8c',
        tabBarStyle: {
          height: 55,
          paddingTop: 5,
          backgroundColor: '#000',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 25,
          fontFamily: 'Montserrat-Bold',
        },
        headerStyle: {
          backgroundColor: '#539165',
          height: 65,
        },
      })}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium',
            bottom: 3,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home-outline' : 'home-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={25}
            />
          ),
        }}
        name="Home"
        component={UserHome}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium',
            bottom: 3,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'man-outline' : 'man-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={25}
            />
          ),
        }}
        name="Gents Products"
        component={MenProducts}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium',
            bottom: 3,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'woman-outline' : 'woman-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={25}
            />
          ),
        }}
        name="Ladies Products"
        component={WomenProducts}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium',
            bottom: 3,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'alert-circle-outline' : 'alert-circle-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={25}
            />
          ),
        }}
        name="How It Works"
        component={HowItWorks}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            color: '#fff',
            fontFamily: 'Montserrat-Medium',
            bottom: 3,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'chatbubble-outline' : 'chatbubble-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={25}
            />
          ),
        }}
        name="FeedBack"
        component={FeedBack}
      />
    </Tab.Navigator>
  );
};

export default UserBottomNavigator;
