import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, Image, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TasksScreen from './tasks';
import DailyGoalsScreen from './daily-goals';
import PomodoroScreen from './pomodoro';
import NotesScreen from './notes';
import ReportsScreen from './reports';
import TimerScreen from './timer';
import LinkedNotesScreen from './linked-notes';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeTool, setActiveTool] = useState('home');

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'tasks':
        return <TasksScreen />;
      case 'daily-goals':
        return <DailyGoalsScreen />;
      case 'pomodoro':
        return <PomodoroScreen />;
      case 'notes':
        return <NotesScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'timer':
        return <TimerScreen />;
      case 'linked-notes':
        return <LinkedNotesScreen />;
      default:
        return (
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Bem-vindo ao Proddy!</ThemedText>
            <ThemedText style={styles.description}>
              Seja Bem-Vindo ao meu aplicativo voltado à criatividade. Acima temos botões para acessar as ferramentas.
            </ThemedText>
            <Text style={styles.warning}>
              ⚠️ As ferramentas ainda não possuem capacidade de salvar dados. Ao fechar, elas reiniciarão suas mudanças.⚠️
            </Text>
            <HelloWave />
          </ThemedView>
        );
    }
  };

  const onToolPress = (tool) => {
    setActiveTool(tool);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sidebar, { width: width * 0.2 }]}>
        {['home', 'tasks', 'daily-goals', 'pomodoro', 'notes', 'reports', 'timer', 'linked-notes'].map((tool) => (
          <TouchableOpacity
            key={tool}
            style={[
              styles.sidebarButton,
              activeTool === tool && styles.activeSidebarButton,
            ]}
            onPress={() => onToolPress(tool)}
            activeOpacity={0.7} // Garante feedback visual no toque.
          >
            <ThemedText style={[styles.sidebarText, activeTool === tool && styles.activeSidebarText]}>
              {tool.charAt(0).toUpperCase() + tool.slice(1).replace('-', ' ')}
            </ThemedText>
          </TouchableOpacity>
        ))}
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={[styles.content, { width: width * 0.8 }]}>
        {renderActiveTool()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  sidebarButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: '90%',
    alignItems: 'center',
  },
  activeSidebarButton: {
    backgroundColor: '#4CAF50',
  },
  sidebarText: {
    color: '#000',
  },
  activeSidebarText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 'auto', // Move para o final da aba vertical.
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  warning: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
});
