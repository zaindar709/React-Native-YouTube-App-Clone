import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    videoContainer: {
      marginBottom: 15,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    videoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
    },
    savedText:{
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 30,
      textAlign: 'center',
    }
  });
  
  