import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArcLoader = ({ size = 50, color = '#DE1A1A', speed = 2 }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 750 / speed,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    return () => spin.stop();
  }, [speed]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const arcSize = size / 2;
  const strokeWidth = arcSize / 12; // Ajusté pour une épaisseur de trait plus équilibrée
  const radius = arcSize - strokeWidth / 2;

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Path
            d={`M${arcSize},${strokeWidth / 2}
               A${radius},${radius} 0 1,1 ${arcSize},${size - strokeWidth / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArcLoader;
