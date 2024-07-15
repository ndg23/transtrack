import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from '.';
import { AuthProvider } from './src/context/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OfflineIndicator from './src/components/OffLine';
import LanguageContextProvider from './src/context/language';
import { ModalProvider } from './src/context/modal-context';
import { StatusProvider } from './src/context/status';
import UserContextProvider from './src/context/user-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/utils/queryclient';
import Routes from './src/router';
import {PaperProvider} from 'react-native-paper';


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
   <AuthProvider>
        <StatusProvider>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <GestureHandlerRootView style={styles.container}>
                <PaperProvider>
                  <NavigationContainer>
                    <UserContextProvider>
                      <Routes />
                      <OfflineIndicator />
                    </UserContextProvider>
                  </NavigationContainer>
                </PaperProvider>
              </GestureHandlerRootView>
            </ThemeProvider>
        </QueryClientProvider>
        </StatusProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F8FF',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Adjust the value accordingly
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
