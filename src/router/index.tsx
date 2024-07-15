import React from 'react';
import styled from 'styled-components/native';
import {useAuthContext} from '../context/auth';
import AuthStack from './Authstack';
import AppStack from './Appstack';

const Routes = () => {
  const {signedIn} = useAuthContext();

  return <>{!signedIn ? <AppStack /> : <AuthStack />}</>;
};

const SettingsButton = styled.TouchableOpacity`
  background-color: #617b964a;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export default Routes;
