import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Utilisez le jeton d'accès pour obtenir les informations de l'utilisateur
      // ou envoyez-le à votre backend pour validation
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Se connecter avec Google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}