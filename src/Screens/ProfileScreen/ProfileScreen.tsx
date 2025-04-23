import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Pressable
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [initialName, setInitialName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedName = await AsyncStorage.getItem('NAME');
      const storedEmail = await AsyncStorage.getItem('EMAIL');
      const storedImage = await AsyncStorage.getItem('PROFILE_IMAGE');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedImage) setProfileImage(storedImage);
    };
    fetchData();
  }, []);

  const handleEditProfile = () => {
    setModalVisible(true);
    setNewName(name);
    setNewEmail(email);
    setInitialName(name);
    setInitialEmail(email);
  };

  const handleSaveChanges = async () => {
    setName(newName);
    setEmail(newEmail);
    setModalVisible(false);

    await AsyncStorage.setItem('NAME', newName);
    await AsyncStorage.setItem('EMAIL', newEmail);
    await AsyncStorage.setItem('PROFILE_IMAGE', profileImage);

    firestore()
      .collection('users')
      .doc(await AsyncStorage.getItem('USERID'))
      .update({ name: newName, email: newEmail, profileImage })
      .then(() => console.log('Profile updated in Firestore'));
  };

  const handleCancelChanges = () => {
    setNewName(initialName);
    setNewEmail(initialEmail);
    setModalVisible(false);
  };

  const handleSelectImage = () => {
    setImagePickerVisible(true);
  };

  const handleLaunchCamera = () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
      setImagePickerVisible(false);
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setProfileImage(imageUri);
          await AsyncStorage.setItem('PROFILE_IMAGE', imageUri);
        }
      }
    });
  };

  const handleLaunchImageLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      setImagePickerVisible(false);
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setProfileImage(imageUri);
          await AsyncStorage.setItem('PROFILE_IMAGE', imageUri);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: profileImage || 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/' }}
          style={styles.profilePicture}
        />
        <TouchableOpacity style={styles.iconOverlay} onPress={handleSelectImage}>
          <Icon name="camera-alt" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton,{backgroundColor:"red"} ]}
                onPress={handleCancelChanges}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={handleSaveChanges}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={isImagePickerVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Image</Text>

            <Pressable style={[styles.modleButton2, styles.cameraButton]} onPress={handleLaunchCamera}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </Pressable>

            <Pressable style={[styles.modleButton2, styles.galleryButton]} onPress={handleLaunchImageLibrary}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </Pressable>

            <Pressable style={[styles.modleButton2, styles.cancelButton]} onPress={() => setImagePickerVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>

        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
