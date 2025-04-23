import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  profilePictureContainer: {
    marginBottom: 20,
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
    paddingHorizontal: 20, 
    paddingTop: 20,
    paddingBottom: 30, 
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },  
  cameraButton: {
    backgroundColor: '#007BFF',
    marginBottom:5
  },
  galleryButton: {
    backgroundColor: '#28A745',
    marginBottom:5
  },
  cancelButton: {
    backgroundColor: '#FF4D4D', 
    marginBottom:5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  iconOverlay: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: '#e1e3e1',
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  iconText: {
    fontSize: 18,
    color: '#007BFF',
  },
  modalButtons: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    width: '100%',  
  },
  modalButton: {
    backgroundColor: '#007BFF',  
    paddingVertical: 12, 
    borderRadius: 8,  
    width: '48%',  
    alignItems: 'center',  
    justifyContent: 'center', 
  },
  modalButtonText: {
    color: '#fff',  
    fontSize: 16,  
    fontWeight: '600',  
  },
  modleButton2:{
    backgroundColor: '#007BFF',  
    paddingVertical: 16, 
    borderRadius: 8,  
    width: '60%',  
    alignItems: 'center',  
    justifyContent: 'center', 
  },
});
