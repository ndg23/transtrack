// src/screens/AddUserScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddUserScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');

  const handleAddUser = () => {
    // TODO: Implement user addition logic
    console.log('Ajout d\'utilisateur:', { nom, prenom, email, telephone, adresse });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity style={styles.photoContainer}>
          <Icon name="add-a-photo" size={40} color="#007AFF" />
          <Text style={styles.photoText}>Ajouter une photo</Text>
        </TouchableOpacity>
        
        <View style={styles.formContainer}>
          <InputField icon="person" placeholder="Nom" value={nom} onChangeText={setNom} />
          <InputField icon="person" placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
          <InputField icon="email" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField icon="phone" placeholder="Téléphone" value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" />
          <InputField icon="home" placeholder="Adresse" value={adresse} onChangeText={setAdresse} />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Ajouter l'utilisateur</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ icon, placeholder, value, onChangeText, keyboardType }) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={24} color="#BDBDBD" style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flexGrow: 1,
    padding: 24,
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  photoText: {
    color: '#007AFF',
    marginTop: 8,
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    alignItems: 'center',
    margin: 24,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddUserScreen;
