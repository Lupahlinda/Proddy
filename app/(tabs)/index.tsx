import { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, Image, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TasksScreen from '@/app/tasks';
import DailyGoalsScreen from '@/app/daily-goals';
import PomodoroScreen from '@/app/pomodoro';
import NotesScreen from '@/app/notes';
import ReportsScreen from '@/app/reports';
import TimerScreen from '@/app/timer';
import LinkedNotesScreen from '@/app/linked-notes';

// Tipos
type Tool = 'home' | 'tasks' | 'daily-goals' | 'pomodoro' | 'notes' | 'reports' | 'timer' | 'linked-notes';

interface SidebarButtonProps {
  tool: Tool;
  isActive: boolean;
  onPress: () => void;
}

// Constantes
const TOOLS: Tool[] = ['home', 'tasks', 'daily-goals', 'pomodoro', 'notes', 'reports', 'timer', 'linked-notes'];

const getToolName = (tool: Tool): string => {
  return tool.charAt(0).toUpperCase() + tool.slice(1).replace('-', ' ');
};

// Componente SidebarButton
const SidebarButton = ({ tool, isActive, onPress }: SidebarButtonProps) => {
  const toolName = getToolName(tool);
  
  return (
    <TouchableOpacity
      style={[
        styles.sidebarButton,
        isActive && styles.activeSidebarButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={`Abrir ${toolName}`}
      accessibilityHint={`Navega para a tela de ${toolName}`}
      accessibilityRole="button"
    >
      <ThemedText style={[styles.sidebarText, isActive && styles.activeSidebarText]}>
        {toolName}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeTool, setActiveTool] = useState<Tool>('home');

  const onToolPress = useCallback((tool: Tool) => {
    setActiveTool(tool);
  }, []);

  const toolComponents: Record<Tool, JSX.Element> = {
    'home': (
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
    ),
    'tasks': <TasksScreen />,
    'daily-goals': <DailyGoalsScreen />,
    'pomodoro': <PomodoroScreen />,
    'notes': <NotesScreen />,
    'reports': <ReportsScreen />,
    'timer': <TimerScreen />,
    'linked-notes': <LinkedNotesScreen />
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sidebar, { width: width * 0.2 }]}>
        {TOOLS.map((tool) => (
          <SidebarButton
            key={tool}
            tool={tool}
            isActive={activeTool === tool}
            onPress={() => onToolPress(tool)}
          />
        ))}
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
          accessibilityLabel="Logo do aplicativo"
        />
      </View>
      <View style={[styles.content, { width: width * 0.8 }]}>
        {toolComponents[activeTool]}
      </View>
    </View>
  );
}

// Estilos (poderia ser movido para um arquivo separado)
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
    marginTop: 'auto',
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