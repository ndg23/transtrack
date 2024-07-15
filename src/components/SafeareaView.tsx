import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

const SafeContainer = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    // padding: 16,
  },
});

export default SafeContainer;