import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// Styled components
const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #d32f2f; /* Rouge foncé */
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 1000;
`;

const Message = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #d32f2f;
  font-size: 14px;
  font-weight: bold;
`;

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initialisation de l'animation

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isOffline) {
      // Animation d'apparition
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      // Animation de disparition
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, fadeAnim]);

  const handleCheckConnection = () => {
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });
  };

  if (!isOffline) return null;

  return (
    <Container style={{ opacity: fadeAnim }}>
      <Message>Vous êtes hors ligne ou avez épuisé votre forfait de données</Message>
      <Button onPress={handleCheckConnection}>
        <ButtonText>Réessayer</ButtonText>
      </Button>
    </Container>
  );
};

export default OfflineIndicator;
