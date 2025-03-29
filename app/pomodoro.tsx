import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function PomodoroScreen() {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Timer Pomodoro</ThemedText>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={() => setIsRunning(!isRunning)} />
      <Button title="Reiniciar" onPress={() => setTime(25 * 60)} />
      <Button title="Ajustar Tempo" onPress={() => setTime(prompt('Digite o tempo em minutos:') * 60)} />
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
