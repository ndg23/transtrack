import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';

// Styled components
const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ae0404; /* Vert foncé pour le succès */
  padding: 10px;
  justify-content: center;
  align-items: center;
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
  color: #4caf50;
  font-size: 14px;
  font-weight: bold;
`;

const FailedIndicator = ({ message, onRetry }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initialisation de l'animation
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      // Animation d'apparition
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        // Disparaître automatiquement après 3 secondes
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }).start(() => setVisible(false));
        }, 3000);
      });
    }
  }, [message, fadeAnim]);

  if (!visible) return null;

  return (
    <Container style={{ opacity: fadeAnim }}>
      <Message>{message}</Message>
      {/* <Button onPress={onRetry}>
        <ButtonText>OK</ButtonText>
      </Button> */}
    </Container>
  );
};

export default FailedIndicator;
