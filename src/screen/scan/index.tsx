// src/screens/ScanScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScanScreen = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>({
    nom:"anto ndong",
    email:"anto@gigig",
    telephon:"7777777"
  });
  const cameraRef = useRef(null);
  const modalAnimation = useRef(new Animated.Value(0)).current;
  const iconAnimation = useRef(new Animated.Value(0)).current;

  const onBarCodeRead = (scanResult) => {
    if (!scanning) {
      setScanning(false);
      setScannedData({
        nom:"anto ndong",
        email:"anto@gigig",
        telephon:"7777777"
      });
    }
  };

  useEffect(() => {
    if (!scanning) {
      Animated.parallel([
        Animated.timing(modalAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(iconAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
      ]).start();
    }
  }, [scanning]);

  const handleConfirm = () => {
    // TODO: Implement confirmation logic
    console.log('Confirmed:', scannedData);
    navigation.goBack();
  };

  const handleCancel = () => {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(iconAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
    ]).start(() => {
      setScanning(true);
      setScannedData(null);
    });
  };

  const modalTranslateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const iconScale = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        <Text style={styles.instructions}>
          Placez le code QR dans le cadre
        </Text>
      </RNCamera>

      <Modal
        animationType="none"
        transparent={true}
        visible={!scanning}
        onRequestClose={handleCancel}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalTranslateY }] }
            ]}
          >
            <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
              <Icon name="check-circle" size={60} color="#4CAF50" />
            </Animated.View>
            <Text style={styles.modalTitle}>Information scannée</Text>
            {scannedData && (
              <View style={styles.scannedInfo}>
                <InfoRow icon="person" label="Nom" value={scannedData.nom} />
                <InfoRow icon="email" label="Email" value={scannedData.email} />
                <InfoRow icon="phone" label="Téléphone" value={scannedData.telephone} />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={24} color="#007AFF" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  instructions: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  scannedInfo: {
    width: '100%',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#007AFF',
  },
  confirmButtonText: {
    color: '#FFFFFF',
  },
});

export default ScanScreen;