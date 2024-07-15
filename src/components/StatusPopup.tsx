// src/components/StatusPopup.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatusPopup = ({ visible, type, message, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const getTypeConfig = () => {
    switch (type) {
      case 'success': return { icon: 'check-circle', color: '#1DB954' };
      case 'error': return { icon: 'error-outline', color: '#D93025' };
      case 'warning': return { icon: 'warning', color: '#F9AB00' };
      case 'info': return { icon: 'info-outline', color: '#1A73E8' };
      case 'achievement': return { icon: 'emoji-events', color: '#AA00FF' };
      default: return { icon: 'info-outline', color: '#1A73E8' };
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
          tension: 30,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(hide, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  const { icon, color } = getTypeConfig();

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity, backgroundColor: color }]}>
      <View style={styles.content}>
        <Icon name={icon} size={24} color="white" style={styles.icon} />
        <Text style={styles.message} numberOfLines={2}>{message}</Text>
      </View>
      <TouchableOpacity onPress={hide} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
});

export default StatusPopup;