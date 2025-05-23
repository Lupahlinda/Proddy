import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

export default function PomodoroScreen() {
  const [time, setTime] = useStorage<number>({
    key: 'pomodoroTime',
    initialValue: 25 * 60
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Timer Pomodoro</ThemedText>
      <ThemedText style={styles.timer}>{formatTime(time)}</ThemedText>
      <TouchableOpacity
        style={[styles.button, isRunning ? styles.pauseButton : styles.startButton]}
        onPress={() => setIsRunning(!isRunning)}
      >
        <ThemedText style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar'}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setTime(25 * 60)}
      >
        <ThemedText style={styles.buttonText}>Reiniciar</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adjustButton}
        onPress={() => {
          const input = prompt('Digite o tempo em minutos:');
          const minutes = Number(input);
          if (!isNaN(minutes)) {
            setTime(minutes * 60);
          }
        }}
      >
        <ThemedText style={styles.buttonText}>Ajustar Tempo</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timer: {
    fontSize: 48,
    fontWeight: '600',
    color: '#333',
    marginVertical: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 120,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#dc3545',
  },
  resetButton: {
    backgroundColor: '#ffc107',
  },
  adjustButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
