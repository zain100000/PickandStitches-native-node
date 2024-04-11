import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Splash from './src/components/screens/Splash';
import UserBottomNavigator from './src/components/navigation/UserNavigation/UserBottomNavigator';
import MenProducts from './src/components/screens/UserModule/MenProducts/MenProducts';
import WomenProducts from './src/components/screens/UserModule/WomenProducts/WomenProducts';
import GentsCheckOut from './src/components/othercomponents/GentsCheckOut/GentsCheckOut';
import GentsOrderDetails from './src/components/othercomponents/GentsProducts/GentsOrderDetails';
import LadiesOrderDetails from './src/components/othercomponents/LadiesProducts/LadiesOrderDetails';
import LadiesCheckOut from './src/components/othercomponents/LadiesCheckOut/LadiesCheckOut';
import AdminBottomNavigator from './src/components/navigation/AdminNavigation/AdminBottomNavigator';
import LadiesOrderInfo from './src/components/screens/AdminModule/LadiesOrderInfo/LadiesOrderInfo';
import GentsOrderInfo from './src/components/screens/AdminModule/GentsOrderInfo/GentsOrderInfo';
import UpdateProductInfo from './src/components/screens/AdminModule/UpdateProductInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#000'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="UserHome" component={UserBottomNavigator} />
        <Stack.Screen name="MenProducts" component={MenProducts} />
        <Stack.Screen name="WomenProducts" component={WomenProducts} />
        <Stack.Screen
          name="GentsOrderDetails"
          component={GentsOrderDetails}
          options={{
            headerShown: true,
            headerTitle: 'Order Details',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />
        <Stack.Screen
          name="LadiesOrderDetails"
          component={LadiesOrderDetails}
          options={{
            headerShown: true,
            headerTitle: 'Order Details',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="GentsCheckOut"
          component={GentsCheckOut}
          options={{
            headerShown: true,
            headerTitle: 'Check Out',

            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="LadiesCheckOut"
          component={LadiesCheckOut}
          options={{
            headerShown: true,
            headerTitle: 'Check Out',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen name="DashBoard" component={AdminBottomNavigator} />
        <Stack.Screen
          name="LadiesOrderInfo"
          component={LadiesOrderInfo}
          options={{
            headerShown: true,
            headerTitle: 'Order Details',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#00bcd4',
            },
          }}
        />

        <Stack.Screen
          name="GentsOrderInfo"
          component={GentsOrderInfo}
          options={{
            headerShown: true,
            headerTitle: 'Order Details',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#00bcd4',
            },
          }}
        />

        <Stack.Screen
          name="UpdateProductInfo"
          component={UpdateProductInfo}
          options={{
            headerShown: true,
            headerTitle: 'Product Update',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
            },
            headerStyle: {
              backgroundColor: '#00bcd4',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
