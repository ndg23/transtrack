import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './../../../i18n/en.json';
import fr from './../../../i18n/fr.json';
import ar from './../../../i18n/ar.json';
import es from './../../../i18n/es.json';
import ru from './../../../i18n/ru.json';
import sw from './../../../i18n/sw.json';

// Define interface for language context type
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: en,
});

// Custom hook for using language context
export const useLanguageContext = () => useContext(LanguageContext);

// Language context provider component
const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  const translationFiles: { [key: string]: any } = { en, fr, ar, es, ru, sw };

  // Function to set language
  const changeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      setLanguage(lang);
      setTranslations(translationFiles[lang]);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  // Function to get stored language
  const getStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('userLanguage');
      if (storedLanguage) {
        setLanguage(storedLanguage);
        setTranslations(translationFiles[storedLanguage]);
      }
    } catch (error) {
      console.error('Error getting stored language:', error);
    }
  };

  // UseEffect to get stored language when the component mounts
  useEffect(() => {
    getStoredLanguage();
  }, []);

  // Context value
  const languageContextValue: LanguageContextType = {
    language,
    setLanguage: changeLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;