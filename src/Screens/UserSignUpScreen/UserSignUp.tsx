import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { styles } from './style';

  const UserSignup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const saveUser = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        userId: userId,
        cart: [],
      })
      .then(() => {
        Alert.alert('Success', 'User registered successfully!');
        navigation.goBack(); // Navigate to the previous screen
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.youTubeText}>YouTube</Text>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Name"
        placeholderTextColor={'gray'}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginBtn} onPress={saveUser}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <View style={{alignSelf: 'center', marginTop:10}}>
        <Text style={{flexDirection: 'row'}}>
          Already have an Account?
          <Text
            style={{color: 'blue'}}
            onPress={() =>
              navigation.navigate('BottomTabs', {
                screen: 'Login',
              })
            }>
            {' '}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default UserSignup;


