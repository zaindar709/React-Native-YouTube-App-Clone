import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomButton = ({ title, onPress,style,textStyle, isGoogleSignIn = false, iconName, iconSize = 20 }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={[styles.button, isGoogleSignIn && styles.googleButton,style]}>
      <View style={styles.buttonContent}>
        {iconName && (
          <AntDesign name={iconName} size={iconSize} color={isGoogleSignIn ? 'white' : 'white'} style={styles.icon} />
        )}
        <Text style={[styles.buttonText, isGoogleSignIn && styles.googleButtonText,textStyle]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 10,
  },
  googleButtonText: {
    color: 'white',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;