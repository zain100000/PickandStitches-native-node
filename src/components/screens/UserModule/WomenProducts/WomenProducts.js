import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import LadiesItemsContainer from '../../../othercomponents/LadiesProducts/LadiesItemContainer';

const WomenProducts = () => {
  const [ladiesProducts, setLadiesProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://pickandstitches-deployment-server.onrender.com/api/products/getProducts',
      )
      .then(response => {
        const ladiesProducts = response.data.Product.filter(
          product => product.category === 'Ladies',
        );
        setLadiesProducts(ladiesProducts);
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
      const ladiesProducts = response.data.Product.filter(
        product => product.category === 'Ladies',
      );
      setLadiesProducts(ladiesProducts);
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
      ) : ladiesProducts.length > 0 ? (
        <FlatList
          data={ladiesProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <LadiesItemsContainer
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
          <Text className="text-xl" style={{fontFamily: 'Montserrat-SemiBold'}}>
            No Ladies Products
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WomenProducts;
