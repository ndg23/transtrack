import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  useMMKVBoolean,
  useMMKVListener,
  useMMKVObject,
  useMMKVString,
} from 'react-native-mmkv';
import { storage } from '../../..';
import AuthService from '../../api/auth.api';
import { User } from '../../types';

// Define the types for context and auth context value
interface AuthContextValue {
  onSignUp: (data: any) => Promise<any>;

  onSignIn: (email: string, password: string) => Promise<any>;
  onLogOut: () => void;
  loading: boolean;
  signedIn: boolean | undefined;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setSignupError: React.Dispatch<React.SetStateAction<boolean>>;
  signupError: boolean;
  setSignedIn: any;
  session: User | undefined;
  token: string | undefined;
  onCheckEmail:(email:string)=>Promise<Boolean>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC = ({children}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<boolean>(false);
  // const navigation = useNavigation();
  const [session, setSession] = useMMKVObject<User>('session', storage);
  const [token, setToken] = useMMKVString('access_token', storage);
  const [signedIn, setSignedIn] =useMMKVBoolean('is_auth', storage);
  const [exist, setExist] = useState<boolean>(false);

  
  const onSignIn = async (email: string, password: string): Promise<any> => {
    try {
      setLoading(true);
      const res = await AuthService.signin({email, password});
      setLoading(false);
      const {access_token, user} = res.data;
      setSession(user);
      setToken(access_token);

      setSignedIn(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      // console.log(error);

      setError(true);
      setLoading(false);
    }
  };
  const onCheckEmail = async (email: string): Promise<any> => {
    try {
      setLoading(true);
      const res = await AuthService.checkEmail({email});
      setLoading(false);
      const {access_token, isExist} = res.data;
      if (isExist) setExist(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const onSignUp = async (userData: User): Promise<any> => {
    console.log('===============USERDATA=====================');
    console.log(userData);
    console.log('====================================');
    try {      
      setLoading(true);      
      const {data} = await AuthService.signup(userData);
      setLoading(false);
      
      const {access_token, user} = data;
      setSession(user);
      setToken(access_token);
      setLoading(false);
      setSignedIn(true)
      return access_token;
    } catch (error) {
      setSignupError(true);
      setLoading(false);
    }
  };

  const onLogOut = (): void => {
    storage.clearAll();
    setSignedIn(false);
  };


  const authContextValue: AuthContextValue = {
    onSignUp,
    onSignIn,
    onLogOut,
    loading,
    signedIn,
    error,
    setError,
    setSignupError,
    signupError,
    setSignedIn,
    session,
    token,
    onCheckEmail
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuthContext};
