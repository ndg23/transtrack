// src/components/FeedbackComponent.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useFeedback } from '../context/feedback';

const FeedbackComponent: React.FC = () => {
  const { feedback } = useFeedback();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (feedback) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2400),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();
    }
  }, [feedback]);

  if (!feedback) return null;

  const backgroundColor = {
    info: '#007AFF',
    success: '#4CD964',
    error: '#FF3B30'
  }[feedback.type];

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <Text style={styles.text}>{feedback.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default FeedbackComponent;