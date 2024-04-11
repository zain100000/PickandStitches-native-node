import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

const UpdateProductInfo = ({route}) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const {selectedProduct} = route.params;
  const [updatedProduct, setUpdatedProduct] = useState(selectedProduct);

  const imageHandler = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImage(res.uri); // Update the image state here
      setUpdatedProduct({...updatedProduct, image: res.uri});
    } catch (err) {
      console.log(err);
    }
  };

  const productHandler = (name, value) => {
    setUpdatedProduct({...updatedProduct, [name]: value});
  };

  const clearFields = () => {
    setUpdatedProduct({
      title: '',
      price: '',
      category: '',
      image: '',
    });
    setImage('');
  };

  const handleUpdateProduct = async e => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);

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

      const productData = {
        ...updatedProduct,
        image: imageUrl,
      };

      const updateProductResponse = await axios.patch(
        `https://pickandstitches-deployment-server.onrender.com/api/products/updateProduct/${selectedProduct._id}`,
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (updateProductResponse.data.success) {
        alert('Your Product Has Been Updated Successfully!');
        clearFields();
      } else {
        alert('Error Occurred During Product Updation');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        console.error('Server error response:', error.response);
      }
      alert('Error updating product: ' + error.message);
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
            value={updatedProduct.title}
            onChangeText={text => productHandler('title', text)}
            style={{fontFamily: 'Montserrat-SemiBold'}}
            className="border-2 rounded-md text-[18px] text-black pl-3 mt-3 border-t-0 border-l-0 border-r-0"
          />

          <TextInput
            placeholder="Price"
            placeholderTextColor="black"
            value={`${updatedProduct.price}`} // Convert to string
            onChangeText={text => productHandler('price', text)}
            style={{fontFamily: 'Montserrat-SemiBold'}}
            className="border-2 border-b-black-200 rounded-md text-[18px] text-black pl-3 mt-3 border-t-0 border-l-0 border-r-0"
          />

          <View className="border-2 border-b-black-200 rounded-md pl-3 mt-3 border-t-0 border-l-0 border-r-0">
            <Picker
              selectedValue={updatedProduct.category}
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
                source={{uri: image}}
                className="w-52 h-52 object-contain left-3 aspect-auto"
              />
            ) : selectedProduct.image ? (
              <Image
                source={{uri: selectedProduct.image}}
                className="w-52 h-52 object-contain left-3 aspect-auto"
              />
            ) : (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                }}
                className="w-52 h-52 object-contain left-3 aspect-auto"></View>
            )}
          </View>

          <TouchableOpacity
            className="flex-1 justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-[#000] rounded-xl"
            onPress={handleUpdateProduct}>
            {loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text
                className="text-white text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Update Product
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProductInfo;
