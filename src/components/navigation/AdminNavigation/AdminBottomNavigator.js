import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashBoard from '../../screens/AdminModule/DashBoard';
import GentsOrders from '../../screens/AdminModule/GentsOrders';
import LadiesOrders from '../../screens/AdminModule/LadiesOrders';
import AddProducts from '../../screens/AdminModule/AddProducts';
import ProductsList from '../../screens/AdminModule/ProductsList';

const Tab = createBottomTabNavigator();

const AdminBottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: true,
        tabBarLabel: '',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#908e8c',
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          backgroundColor: '#00bcd4',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 25,
          fontFamily: 'Montserrat-Bold',
        },
        headerStyle: {
          backgroundColor: '#00bcd4',
          height: 65,
        },
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home-outline' : 'home-outline'}
              color={focused ? '#fff' : '#000'}
              size={30}
            />
          ),
        }}
        name="Admin Home"
        component={DashBoard}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'man-outline' : 'man-outline'}
              color={focused ? '#fff' : '#000'}
              size={30}
            />
          ),
        }}
        name="Gents Orders"
        component={GentsOrders}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'woman-outline' : 'woman-outline'}
              color={focused ? '#fff' : '#000'}
              size={30}
            />
          ),
        }}
        name="Ladies Orders"
        component={LadiesOrders}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'cart-outline' : 'cart-outline'}
              color={focused ? '#fff' : '#000'}
              size={30}
            />
          ),
        }}
        name="Add Products"
        component={AddProducts}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'list-outline' : 'list-outline'}
              color={focused ? '#fff' : '#000'}
              size={30}
            />
          ),
        }}
        name="Products List"
        component={ProductsList}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigator;
