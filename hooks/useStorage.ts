import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageConfig {
  key: string;
  initialValue: any;
}

export function useStorage<T>(config: StorageConfig) {
  const [value, setValue] = useState<T>(config.initialValue);

  useEffect(() => {
    loadValue();
  }, []);

  useEffect(() => {
    saveValue(value);
  }, [value]);

  const loadValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(config.key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saveValue = async (newValue: T) => {
    try {
      await AsyncStorage.setItem(config.key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  return [value, setValue] as const;
}
