import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';

const GentsOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const image = route.params?.image;
  const product = route.params?.product;
  const price = route.params?.price;

  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const [adress, setAdress] = useState('');
  const [neck, setNeck] = useState('');
  const [Pocket, setPocket] = useState('');
  const [Daman, setDaman] = useState('');
  const [wrist, setWrist] = useState('');
  const [comments, setComments] = useState('');
  const [sample, setSample] = useState('');
  const [singleKanta, setSingleKanta] = useState(false);
  const [doubleKanta, setDoubleKanta] = useState(false);
  const [Tob_double_stitch, setTobDoubleStitch] = useState(false);
  const [embroideryFull, setEmbroideryFull] = useState(false);
  const [embroideryNormal, setEmbroideryNormal] = useState(false);
  const [availTime, setAvailTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify other types as needed
      });

      const uri = result[0].uri; // Get the URI of the selected document
      setSample([uri]); // Replace the existing sample array with the new URI
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Handle cancel
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  };

  // Declare and initialize refs
  const nameRef = useRef();
  const cellRef = useRef();
  const adressRef = useRef();

  const ValidInput = () => {
    const namePattern = /^[a-zA-Z\s]*$/;
    const cellPattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const adressPattern = /^[\w\s,'-]*$/;

    return (
      namePattern.test(name) &&
      cellPattern.test(cell) &&
      adressPattern.test(adress)
    );
  };

  const validateName = () => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!name.match(regex)) {
      return 'Special Characters Not Allowed';
    }
    return '';
  };
  const nameError = validateName();

  const handleCellChange = value => {
    setCell(value);
  };
  const validateCell = () => {
    if (!cell) {
      return '';
    }
    const cellRegex = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    if (!cellRegex.test(cell)) {
      return 'Invalid Cell Format';
    }
    return '';
  };
  const cellError = validateCell();

  const handleAdressChange = value => {
    setAdress(value);
  };
  const validateAdress = () => {
    if (!adress) {
      return '';
    }
    const adressRegex = /^[\w\s,'-]*$/;
    if (!adressRegex.test(adress)) {
      return 'Invalid Address Format';
    }
    return '';
  };
  const adressError = validateAdress();

  const handleCheckOut = () => {
    if (!name) {
      alert('Fullname field is empty');
      nameRef.current.focus();
      return;
    }
    if (!cell) {
      alert('Cell field is empty');
      cellRef.current.focus();
      return;
    }
    if (!adress) {
      alert('Address field is empty');
      adressRef.current.focus();
      return;
    }

    if (!ValidInput()) {
      alert('Please fill in the fields correctly');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('GentsCheckOut', {
        image,
        product,
        name,
        cell,
        adress,
        neck,
        Pocket,
        Daman,
        wrist,
        comments,
        sample,
        price,
        puncha: singleKanta
          ? 'Single Kanta'
          : doubleKanta
          ? 'Double Kanta'
          : '',

        Tob_double_stitch: Tob_double_stitch ? 'Tob Double Stitch' : null,

        Embroidery: embroideryFull
          ? 'Embroidery Full'
          : embroideryNormal
          ? 'Embroidery Normal'
          : '',
        availTime,
      });

      setName('');
      setCell('');
      setAdress('');
      setNeck('');
      setPocket('');
      setDaman('');
      setWrist('');
      setComments('');
      setSample('');
      setSingleKanta('');
      setDoubleKanta('');
      setTobDoubleStitch('');
      setEmbroideryFull('');
      setEmbroideryNormal('');
      setSample('');
      setAvailTime('');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}>
        {/* Image Start */}
        <Image source={{uri: image}} className="w-36 h-56 bg-contain" />

        {/* Check-Out Form */}
        <View className="flex-1 mt-14">
          {/* Product Name */}
          <View>
            <Text className="text-sm mb-2">Product Name:-</Text>
            <View className="border-2 border-gray-500 mb-3">
              <TextInput
                className="text-sm text-black left-2"
                placeholder={product}
                placeholderTextColor={'#539165'}
                style={{fontFamily: 'Montserrat-SemiBold'}}
              />
            </View>
          </View>
          {/* FullName */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Full Name"
              placeholderTextColor={'#539165'}
              value={name}
              onChangeText={setName}
              ref={nameRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {nameError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {nameError}
            </Text>
          ) : null}

          {/* Mobile */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Mobile"
              keyboardType="number-pad"
              placeholderTextColor={'#539165'}
              value={cell}
              onChangeText={handleCellChange}
              ref={cellRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {cellError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {cellError}
            </Text>
          ) : null}

          {/* Address */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-sm text-primary left-3"
              placeholder="Complete Address"
              placeholderTextColor={'#539165'}
              value={adress}
              onChangeText={handleAdressChange}
              ref={adressRef}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>
          {adressError ? (
            <Text
              className="text-red-600 text-sm left-3"
              style={{fontFamily: 'Montserrat-SemiBold'}}>
              {adressError}
            </Text>
          ) : null}

          {/* Neck */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={neck}
              onValueChange={setNeck}
              style={{color: '#539165'}}>
              <Picker.Item
                label="Select Neck Type"
                value=""
                style={{
                  color: '#539165',
                  fontSize: 15,
                  fontWeight: '800',
                }}
              />
              <Picker.Item
                label="Collar"
                value="Collar"
                style={{
                  color: '#539165',
                  fontSize: 18,
                  fontWeight: '800',
                }}
              />
              <Picker.Item
                label="Ban"
                value="Ban"
                style={{
                  color: '#539165',
                  fontSize: 18,
                  fontWeight: '800',
                }}
              />
              <Picker.Item
                label="Ban Round Cut"
                value="Ban Round Cut"
                style={{
                  color: '#539165',
                  fontSize: 18,
                  fontWeight: '800',
                }}
              />
            </Picker>
          </View>

          {/* Pocket */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={Pocket}
              onValueChange={setPocket}
              style={{color: '#539165'}}>
              <Picker.Item
                label="Select Pocket Type"
                value=""
                style={{color: '#539165', fontSize: 15}}
              />
              <Picker.Item
                label="Front Single"
                value="Front Single"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Front Double"
                value="Front Double"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Side Single"
                value="Side Single"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Side Double"
                value="Side Double"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Front Single, Side Single"
                value="Front Single, Side Single"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Front Double, Side Double"
                value="Front Double, Side Double"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Front Single, Side Double"
                value="Front Single, Side Double"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Front Double, Side Single"
                value="Front Double, Side Single"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
            </Picker>
          </View>

          {/* Daman */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={Daman}
              onValueChange={setDaman}
              style={{color: '#539165'}}>
              <Picker.Item
                label="Select Daman Type"
                value=""
                style={{color: '#539165', fontSize: 15, fontWeight: '800'}}
              />
              <Picker.Item
                label="Round"
                value="Round"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Straight"
                value="Straight"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
            </Picker>
          </View>

          {/* Wrist */}
          <View className="mb-3 border-b-2 border-b-gray-500">
            <Picker
              selectedValue={wrist}
              onValueChange={setWrist}
              style={{color: '#539165'}}>
              <Picker.Item
                label="Select Wrist Type"
                value=""
                style={{color: '#539165', fontSize: 15, fontWeight: '800'}}
              />
              <Picker.Item
                label="Open"
                value="Open"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
              <Picker.Item
                label="Cuff"
                value="Cuff"
                style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
              />
            </Picker>
          </View>

          {/* Comment */}
          <View className="border-b-2 border-b-gray-500 mb-3">
            <TextInput
              className="text-primary left-3 text-sm"
              placeholder="Describe Anything Further In Your Mind"
              placeholderTextColor="gray"
              multiline={true}
              numberOfLines={6}
              value={comments}
              onChangeText={setComments}
              style={{fontFamily: 'Montserrat-SemiBold'}}
            />
          </View>

          {/* Puncha */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Leg Opening (Puncha)
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => {
                    setSingleKanta(!singleKanta);
                    setDoubleKanta(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {singleKanta && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Single Kanta
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.100)
                  </Text>
                </View>
              </View>

              <View className="flex-row">
                <View className="flex-row mb-3 ml-8">
                  <TouchableOpacity
                    onPress={() => {
                      setDoubleKanta(!doubleKanta);
                      setSingleKanta(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {doubleKanta && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Double Kanta
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.200)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Top Stitch */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Tob Stitch
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => setTobDoubleStitch(!Tob_double_stitch)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {Tob_double_stitch && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Tob Double Stitch
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.300)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Embroidery */}
          <View>
            <View className="left-3 mt-8">
              <Text
                className="text-primary text-lg"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Embroidery
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="flex-row mb-3">
                <TouchableOpacity
                  onPress={() => {
                    setEmbroideryFull(!embroideryFull);
                    setEmbroideryNormal(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderWidth: 2,
                      borderColor: '#539165',
                      marginRight: 10,
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {embroideryFull && (
                      <Text style={{color: '#539165'}}>&#10003;</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mt-5">
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Embroidery
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    Full
                  </Text>
                  <Text
                    className="text-[15px] text-black"
                    style={{fontFamily: 'Montserrat-SemiBold'}}>
                    (Rs.500)
                  </Text>
                </View>
              </View>

              <View className="flex-row">
                <View className="flex-row mb-3 ml-8">
                  <TouchableOpacity
                    onPress={() => {
                      setEmbroideryNormal(!embroideryNormal);
                      setEmbroideryFull(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#539165',
                        marginRight: 10,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {embroideryNormal && (
                        <Text style={{color: '#539165'}}>&#10003;</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View className="mt-5">
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Embroidery
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      Normal
                    </Text>
                    <Text
                      className="text-[15px] text-black"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      (Rs.300)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Pickup Time */}
          <View>
            <View className="mb-3 border-b-2 border-b-gray-500">
              <Picker
                selectedValue={availTime}
                onValueChange={setAvailTime}
                style={{color: '#539165'}}>
                <Picker.Item
                  label="Select Available Time for Picking"
                  value=""
                  style={{color: '#539165', fontSize: 15, fontWeight: '800'}}
                />
                <Picker.Item
                  label="1AM TO 3AM"
                  value="1AM TO 3AM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="3AM TO 5AM"
                  value="3AM TO 5AM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="5AM TO 7AM"
                  value="5AM TO 7AM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="7AM TO 9AM"
                  value="7AM TO 9AM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="9AM TO 12AM"
                  value="9AM TO 12AM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="12AM TO 2PM"
                  value="12AM TO 2PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="2PM TO 4PM"
                  value="2PM TO 4PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="4PM TO 6PM"
                  value="4PM TO 6PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="6PM TO 8PM"
                  value="6PM TO 8PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="8PM TO 10PM"
                  value="8PM TO 10PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
                <Picker.Item
                  label="10PM TO 12PM"
                  value="10PM TO 12PM"
                  style={{color: '#539165', fontSize: 18, fontWeight: '800'}}
                />
              </Picker>
            </View>
          </View>

          {/* Attachments */}
          <View className="flex-1 flex-row p-5">
            {sample.length > 0 ? (
              <Image
                source={{uri: sample[0]}}
                className="w-32 h-32 right-3 mr-3"
              />
            ) : (
              <Text
                className="text-gray-400 text-sm"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Any Sample
              </Text>
            )}
          </View>

          {/* Attachment Button */}
          <View className="flex-row left-2 mb-5">
            <TouchableOpacity
              onPress={handlePickDocument}
              className="pl-5 pr-5 pt-4 pb-4 rounded-md bg-primary">
              <Text
                className="text-white text-[16px]"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Choose File
              </Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="flex-1 justify-center left-3 mb-5 mr-5 items-center mt-8 p-4 bg-primary rounded-xl"
            onPress={handleCheckOut}>
            {loading ? (
              <ActivityIndicator color={'#fff'} /> // Show loader while loading
            ) : (
              <Text
                className="text-white text-xl"
                style={{fontFamily: 'Montserrat-SemiBold'}}>
                Proceed To CheckOut
              </Text> // Show Submit text when not loading
            )}
          </TouchableOpacity>
        </View>

        {/* Check-Out Form */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GentsOrderDetails;
