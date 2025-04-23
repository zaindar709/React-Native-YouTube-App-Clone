import React from 'react';
import MainStack from './src/Navigation/MainStack';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
const App = () => {
  return (
      <MainStack />
  );
};

export default App;
