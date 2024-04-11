import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const LadiesOrders = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleting, setDeleting] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Consolidated loading state
  const navigation = useNavigation();

  const getApiData = async () => {
    const url =
      'https://pickandstitches-deployment-server.onrender.com/api/ladies?';

    try {
      const response = await axios.get(url);
      const result = response.data.LadiesOrders;
      setData(result);
      setIsLoading(false); // Set loading to false after data is fetched
      setSelectAll(false); // Uncheck the main checkbox when data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const filterData = () => {
    return data
      ? data.filter(
          item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.mobile.includes(searchText),
        )
      : [];
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        'https://pickandstitches-deployment-server.onrender.com/api/ladies',
      );
      const result = response.data.LadiesOrders;
      setData(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

  const handleViewOrderDetails = selectedOrder => {
    navigation.navigate('LadiesOrderInfo', {selectedOrder});
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(!selectAll ? data.map(item => item._id) : []);
  };

  const handleIndividualCheckbox = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleIndividualDelete = async id => {
    Alert.alert('Delete Order', 'Are you sure you want to delete this order?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            setIsLoading(true); // Set loading to true before deletion
            await axios.delete(
              `https://pickandstitches-deployment-server.onrender.com/api/ladies/${id}`,
            );
            setData(prevData => prevData.filter(item => item._id !== id));
          } catch (error) {
            console.error('Error deleting Ladies Order:', error);
          } finally {
            setIsLoading(false); // Set loading to false after deletion
          }
        },
      },
    ]);
  };

  const handleDeleteSelected = async () => {
    Alert.alert(
      'Delete Orders',
      'Are you sure you want to delete selected orders?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsLoading(true); // Set loading to true before bulk deletion
              await Promise.all(
                selectedItems.map(async id => {
                  await axios.delete(
                    `https://pickandstitches-deployment-server.onrender.com/api/ladies/${id}`,
                  );
                }),
              );
              setData(prevData =>
                prevData.filter(item => !selectedItems.includes(item._id)),
              );
              setSelectedItems([]);
              setSelectAll(false);
            } catch (error) {
              console.error('Error deleting selected Gents Orders:', error);
            } finally {
              setIsLoading(false); // Set loading to false after bulk deletion
            }
          },
        },
      ],
    );
  };

  function formatDate(dateString) {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options,
    );
    return formattedDate;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={handleDeleteSelected}
          disabled={selectedItems.length === 0}
          className="left-4">
          <FontAwesome5 name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>

        <TextInput
          placeholder="Search by name or cell number"
          value={searchText}
          placeholderTextColor={'#00bcd4'}
          onChangeText={text => setSearchText(text)}
          className="border-2 border-gray-400 w-80 border-l-2 border-r-0 border-t-0 p-2 text-primary"
          style={{fontFamily: 'Montserrat-SemiBold'}}
        />
      </View>

      <View className="flex-row justify-around items-center p-5 border-b-2 border-b-gray-400">
        <TouchableOpacity onPress={handleSelectAll}>
          <FontAwesome5
            name={selectAll ? 'check-square' : 'square'}
            size={18}
            color={selectAll ? 'blue' : '#000'}
          />
        </TouchableOpacity>
        <Text className="text-dark" style={{fontFamily: 'Montserrat-Medium'}}>
          Name
        </Text>
        <Text className="text-dark" style={{fontFamily: 'Montserrat-Medium'}}>
          Cell
        </Text>
        <Text className="text-dark" style={{fontFamily: 'Montserrat-Medium'}}>
          Address
        </Text>
        <Text className="text-dark" style={{fontFamily: 'Montserrat-Medium'}}>
          Date
        </Text>
        <Text className="text-dark" style={{fontFamily: 'Montserrat-Medium'}}>
          Actions
        </Text>
      </View>

      <View className="flex-1">
        <FlatList
          data={filterData()}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({item}) => (
            <View className="flex-row justify-around items-center p-5 border-b-2 border-b-gray-400 ">
              <View className="w-14 px-3">
                <TouchableOpacity>
                  <FontAwesome5
                    name={
                      selectedItems.includes(item._id)
                        ? 'check-square'
                        : 'square'
                    }
                    size={20}
                    color={selectedItems.includes(item._id) ? 'blue' : 'black'}
                    onPress={() => handleIndividualCheckbox(item._id)}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-1 flex-row justify-around items-center">
                <Text
                  className="flex-1"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.name}
                </Text>
                <Text
                  className="flex-1 pr-5"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.mobile}
                </Text>
                <Text
                  className="flex-1"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  {item.address}
                </Text>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text>{formatDate(item.date)}</Text>
                  <Text>{item.time}</Text>
                </View>
              </View>
              <View className="w-16 flex-row item-center justify-between flex-wrap left-4">
                <TouchableOpacity onPress={() => handleViewOrderDetails(item)}>
                  <FontAwesome5 name="eye" size={20} color={'#000'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleIndividualDelete(item._id)}
                  className="right-5">
                  <FontAwesome5 name={'trash'} size={20} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {/* Render ActivityIndicator based on isLoading */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="blue"
            className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-opacity-50 bg-white"
          />
        )}
        {!data && !isLoading && (
          <Text
            className="flex-1 text-center text-xl text-gray-600"
            style={{fontFamily: 'Montserrat-SemiBold'}}>
            No Ladies Orders Yet
          </Text>
        )}
      </View>

      {deleting && (
        <ActivityIndicator
          size="large"
          color="blue"
          className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-opacity-50 bg-white"
        />
      )}
    </SafeAreaView>
  );
};

export default LadiesOrders;
