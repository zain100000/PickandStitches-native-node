import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  const imageHandler = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImage(res);
      setProductDetails({...productDetails, image: res});
    } catch (err) {
      console.log(err);
    }
  };

  const productHandler = (name, value) => {
    setProductDetails({...productDetails, [name]: value});
  };

  const clearFields = () => {
    setProductDetails({
      title: '',
      price: '',
      category: '',
      image: '',
    });
    setImage(null);
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });

      const uploadImageResponse = await axios.post(
        'https://pickandstitches-deployment-server.onrender.com/api/products/uploads',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const imageUrl = uploadImageResponse.data.img_url;

      const productData = {...productDetails, image: imageUrl};

      const addProductResponse = await axios.post(
        'https://pickandstitches-deployment-server.onrender.com/api/products/addProduct',
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (addProductResponse.data.success) {
        alert('Your Product Has Been Added Successfully!');
        clearFields(); // Clear fields on success
      } else {
        alert('Error Occurred During Product Addition');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="jutify-center p-4 gap-8 mt-5">
          <TextInput
            placeholder="Title"
            placeholderTextColor="black"
            value={productDetails.title}
            onChangeText={text => productHandler('title', text)}
            style={{fontFamily: 'Montserrat-SemiBold'}}
            className="border-2 rounded-md text-[18px] text-black pl-3 mt-3 border-t-0 border-l-0 border-r-0"
          />

          <TextInput
            placeholder="Price"
            placeholderTextColor="black"
            value={productDetails.price}
            onChangeText={text => productHandler('price', text)}
            style={{fontFamily: 'Montserrat-SemiBold'}}
            className="border-2 border-b-black-200 rounded-md text-[18px] text-black pl-3 mt-3 border-t-0 border-l-0 border-r-0"
          />

          <View className="border-2 border-b-black-200 rounded-md pl-3 mt-3 border-t-0 border-l-0 border-r-0">
            <Picker
              selectedValue={productDetails.category}
              onValueChange={itemValue =>
                productHandler('category', itemValue)
              }>
              <Picker.Item
                label="Select Category"
                value=""
                style={{color: 'black'}}
              />
              <Picker.Item label="Gents" value="Gents" />
              <Picker.Item label="Ladies" value="Ladies" />
            </Picker>
          </View>

          <View className="flex-row w-100">
            <TouchableOpacity onPress={imageHandler} className="mt-3">
              <View className="flex-row">
                <View className="text-black text-[20px]">
                  <MaterialCommunityIcons name="upload-outline" size={45} />
                </View>
                <Text
                  className="text-black text-[20px] mt-2"
                  style={{fontFamily: 'Montserrat-SemiBold'}}>
                  Upload Image
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1 flex-row">
            {image ? (
              <Image
                source={{uri: image.uri}}
                className="w-32 h-32 object-contain left-3 aspect-auto"
              />
            ) : (
              <Text
                className="text-black text-[20px] ml-2"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                No Files Selected
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="flex-1 justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-[#000] rounded-xl"
            onPress={handleAddProduct}>
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text
                className="text-white text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Add Product
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;
