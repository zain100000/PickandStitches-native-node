import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

const LadiesOrderInfo = ({route}) => {
  const {selectedOrder} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: selectedOrder.product_pic}}
          className="w-52 h-96"
        />
        <View>
          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Product Name:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.product}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Name:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.name}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Cell:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.cell}
            </Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Address:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.address}
            </Text>
          </View>
          <View className="flex-row  flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Comments:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.comments}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Piko:
            </Text>
            <Text className="text-lg text-black  style={{ fontFamily: 'Montserrat-SemiBold',}}left-4">
              {selectedOrder.piko}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Top:
            </Text>
            <Text className="text-lg text-black  style={{ fontFamily: 'Montserrat-SemiBold',}}left-6">
              {selectedOrder.Top}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Dupatta:
            </Text>
            <Text className="text-lg text-black  style={{ fontFamily: 'Montserrat-SemiBold',}}left-6">
              {selectedOrder.Dupatta}
            </Text>
          </View>
          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Embroidery:
            </Text>
            <Text
              className="text-lg text-black left-6"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.Embroidery}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Product Price:
            </Text>
            <Text
              className="text-lg text-black left-0"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.product_price}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Delivery Charges:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Rs.{selectedOrder.deliverycharges}
            </Text>
          </View>

          <View className="flex-row flex-wrap border-b-2 border-b-gray-400 p-5 justify-between items-center">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Samples:
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              {selectedOrder.samples ? (
                <Image
                  source={{
                    uri: `https://pickandstitches-deployment-server.onrender.com/api/ladies/${selectedOrder._id}/samples`,
                  }}
                  style={{width: 200, height: 200}}
                />
              ) : (
                <Text>No Samples Attached!</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Picking Time:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.availTime}
            </Text>
          </View>

          <View className="flex-row border-b-2 border-b-gray-400 p-5 justify-between">
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              Total:
            </Text>
            <Text
              className="text-lg text-black"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {selectedOrder.total}Rs/-
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <ImageViewer
          imageUrls={[{url: selectedOrder.sample}]}
          enableSwipeDown
          onSwipeDown={toggleModal}
        />
        <Button title="Close" onPress={toggleModal} />
      </Modal>
    </View>
  );
};

export default LadiesOrderInfo;
