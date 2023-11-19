import React, {useEffect, useState} from 'react';
import axios from '../local-api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children: any;
};

export type ContextType = {
  logout: () => void;
  login: (email: string, password: string) => void;
  getCurrentStatus: () => void;
  token: string | null;
  status: any;
  isLoading: boolean;
};

export const AuthContext = React.createContext<ContextType>({
  login: (email: string, password: string) => undefined,
  logout: () => undefined,
  getCurrentStatus: () => undefined,
  token: ``,
  status: {},
  isLoading: true,
});

const AuthProvider = ({children}: Props) => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const {data} = await axios.post(`/api/auth/local`, {
        identifier: email,
        password: password,
      });

      setToken(data?.jwt);
      setStatus(data?.user);
      await AsyncStorage.setItem('@authentication-poc-API_TOKEN', data?.jwt);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getCurrentStatus = async () => {
    if (!token || !status) return null;

    const {data} = await axios.get(`/api/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStatus(data);
    return data;
  };

  const logout = async () => {
    setToken(null);
    setStatus(null);
    await AsyncStorage.setItem('@authentication-poc-API_TOKEN', '');
  };

  useEffect(() => {
    async function hydrate() {
      try {
        // get token logic
        const currentToken = await AsyncStorage.getItem(
          '@authentication-poc-API_TOKEN',
        );

        if (currentToken == null) {
          await AsyncStorage.setItem('@authentication-poc-API_TOKEN', '');
          setIsLoading(false);
          return;
        }
        setToken(currentToken);
        const {data} = await axios.get('/api/users/me?populate=*', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        setStatus(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
    hydrate();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, token, status, isLoading, getCurrentStatus}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
