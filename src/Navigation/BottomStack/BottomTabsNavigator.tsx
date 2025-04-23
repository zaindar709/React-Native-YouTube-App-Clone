import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Screens/ProfileScreen/ProfileScreen';
import SavedVideosScreen from '../../Screens/SavedVideoScreen/SavedVideoScreen';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'SavedVideos') {
            iconName = focused ? 'bookmark' : 'bookmark';
          } else if (route.name === 'Login') {
            iconName = focused ? 'sign-in' : 'sign-in';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SavedVideos" component={SavedVideosScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
