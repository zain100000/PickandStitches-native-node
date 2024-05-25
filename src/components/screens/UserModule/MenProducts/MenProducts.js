import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import axios from 'axios';
import GentsItemsContainer from '../../../othercomponents/GentsProducts/GentsItemContainer';

const MenProducts = () => {
  const [gentsProducts, setGentsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://pickandstitches-deployment-server.onrender.com/api/products/getProducts',
      )
      .then(response => {
        const gentsProducts = response.data.Product.filter(
          product => product.category === 'Gents',
        );
        setGentsProducts(gentsProducts);
        setLoading(false);
      })
      .catch(error => {
        // Error handling
        setLoading(false);
      });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const timestamp = new Date().getTime(); // Generate a unique timestamp
      const response = await axios.get(
        `https://pickandstitches-deployment-server.onrender.com/api/products/getProducts?timestamp=${timestamp}`,
      );
      const gentsProducts = response.data.Product.filter(
        product => product.category === 'Gents',
      );
      setGentsProducts(gentsProducts);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : gentsProducts.length > 0 ? (
        <FlatList
          data={gentsProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <GentsItemsContainer
              product={item.title}
              image={item.image ? item.image : 'default_image_source'}
              price={item.price.toString()}
              onwards={'Onwards'}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            className="text-xl text-dark"
            style={{fontFamily: 'Montserrat-SemiBold'}}>
            No Gents Products
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MenProducts;
