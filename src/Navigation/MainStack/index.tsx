import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../BottomStack/BottomTabsNavigator';
import UserSignUp from '../../Screens/UserSignUpScreen/UserSignUp';
import VideoDetailScreen from '../../Screens/VideoDetailScreen/VideoDetailScreen';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
