import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TimerScreen() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTime(0);
    alert('Cronômetro reiniciado!');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Cronômetro</ThemedText>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={() => setIsRunning(!isRunning)} />
      <Button title="Reiniciar" onPress={resetTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
  },
  timer: {
    fontSize: 48,
    marginVertical: 16,
  },
});
