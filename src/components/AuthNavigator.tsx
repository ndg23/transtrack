import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigation, useSegments } from 'expo-router';
import { useAuth } from '@/context/auth-context';
import { useRoute } from '@react-navigation/native';

const AuthNavigator = () => {
  const navigation = useNavigation();
  const segments = useSegments();
  const {authState } = useAuth();
  const navigationPerformedRef = useRef(false);
const router=useRoute()
  useEffect(() => {
    if (!navigationPerformedRef.current) {
      const inAuthGroup = segments?.[0] === '(auth)';

      console.log('authState?.authenticated:', authState?.authenticated);
      console.log('Is in Auth Group:', inAuthGroup);
      navigation.navigate('/login/index'); // Utilisez navigate pour changer l'écran
      if (!authState?.authenticated) {
      
          navigationPerformedRef.current = true;
          console.log("is in auth");
          
          navigation.navigate('login'); // Utilisez navigate pour changer l'écran
        }
      } else {
       
          navigationPerformedRef.current = true;
          console.log("is");
          
          navigation.navigate('/(tabs)');
        
      
    }
  }, [navigation, authState?.authenticated, segments]);

  return null; // Ce composant ne rend rien lui-même
};

export default AuthNavigator;
