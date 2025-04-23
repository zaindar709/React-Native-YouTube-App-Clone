import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import CustomButton from '../../componenets/CustomButton';
import { styles } from './styles';
const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const signIn = async () => {
    setModalVisible(true);
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .where('name', '==', name)
        .get();
      if (querySnapshot.empty) {
        setModalVisible(false);
        Alert.alert('Error', 'No user found with this email and name.');
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password === password) {
        await AsyncStorage.setItem('USERID', userDoc.id); 
        await AsyncStorage.setItem('EMAIL', email); 
        await AsyncStorage.setItem('NAME', name); 

        navigation.replace('BottomTabs');
      } else {
        setModalVisible(false);
        Alert.alert('Error', 'Incorrect password.');
      }
    } catch (error) {
      setModalVisible(false);
      console.error('Error during sign-in:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  const handleSubmit = () => {
    if (!email || !name || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    signIn();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.youTubeText}>YouTube</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} 
      />
      <CustomButton
        iconName="login"
        iconSize={22}
        title={'Login'}
        style={styles.loginButton}
        onPress={handleSubmit}
        textStyle={styles.loginButtonText}
      />
      <Text style={{flexDirection: 'row'}}>
        Create Account or
        <Text
          style={{color: 'blue'}}
          onPress={() => navigation.navigate('UserSignUp')}>
          {' '}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
