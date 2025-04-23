import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
      marginVertical: 20,
    },
    inputStyle: {
      color: '#000',
      height: 50,
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      borderColor: '#ccc',
      backgroundColor: '#f9f9f9',
      marginTop: 30,
    },
    loginBtn: {
      backgroundColor: '#4285f4',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
    youTubeText: {
      alignSelf: 'center',
      fontSize: 36,
      color: '#ff0000',
      fontWeight: 'bold',
      marginBottom: 60,
    },
  });