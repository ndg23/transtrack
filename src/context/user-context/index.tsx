import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserService } from '../../../api/user.api';
import { useAuthContext } from '../auth-context';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from '../../../..';

interface UserContextProviderProps {
  children: ReactNode;
}

interface User {
  id: number;
  // Add other properties of User interface here
}

interface UserContextType {
  message: string | undefined;
  load: boolean;
  error: boolean;
  user: any;
  onUpdate: (data: any) => void;
  UpdatePassword: (data: any) => void;
  onGet: () => void;
}

export const UserContext = createContext<UserContextType>({
  message: undefined,
  load: false,
  error: false,
  user: undefined,
  onUpdate: () => {},
  UpdatePassword: () => {},
  onGet: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [message, setMessage] = useState<string>();
  const [session, setSession] = useMMKVObject<any>('session', storage);

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const onUpdate = async (data: any) => {
    setLoad(true);
    try {
      const res = await UserService.update(data);
      setUser(res.data);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      setError(true);
      setMessage('Mise à jour impossible');
    }
  };

  const UpdatePassword = async (data: any) => {
    setLoad(true);
    try {
      const {data} = await UserService.update(data);
      setUser(data);
    //   storeData('user', JSON.stringify(user));
      setLoad(false);
      setMessage('Compétence ajoutée');
      setError(false);
    } catch (err) {
      setLoad(false);
      setError(true);
      setMessage('Mise à jour impossible');
    }
  };

  const onGet = async () => {
    setLoad(true);
    try {
      const res= await UserService.getUser(session?.id as string);
        setUser(res);
        // storeData('user', JSON.stringify(user));
      setSession(res)
      setLoad(false);
    } catch (err) {
      
      setLoad(false);
      setError(true);
      setMessage('Mise à jour impossible');
    }
  };


  useEffect(() => {
    onGet();
  }, [session?.id]);

  const userContextValue: UserContextType = {
    message,
    load,
    error,
    user,
    onUpdate,
    UpdatePassword,
    onGet,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
