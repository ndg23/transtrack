// FeedbackModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useModal } from '../context/modal-context';

const FeedbackModal: React.FC = () => {
  const { modalState, hideModal } = useModal();

  const { visible, type, message } = modalState;

  const iconName = type === 'success' ? 'checkmark-circle' : 'alert-circle';
  const color = type === 'success' ? '#4CAF50' : '#DE1A1A';
  const title = type === 'success' ? 'Succès' : 'Une erreur est survenue';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons name={iconName} size={50} color={color} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={hideModal}
          >
            <Text style={styles.buttonText}>
              {type === 'success' ? 'OK' : 'Réessayer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#202124',
  },
  modalText: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#5f6368',
  },
  button: {
    borderRadius: 24,
    padding: 12,
    elevation: 2,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default FeedbackModal;