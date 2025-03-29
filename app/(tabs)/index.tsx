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

// Types
type NavigationTool = 'home' | 'tasks' | 'daily-goals' | 'pomodoro' | 'notes' | 'reports' | 'timer' | 'linked-notes';

interface NavigationButtonProps {
  tool: NavigationTool;
  isActive: boolean;
  onPress: () => void;
}

// Navigation Configuration
const NAVIGATION_TOOLS: Array<{
  id: NavigationTool;
  label: string;
  description: string;
}> = [
  { id: 'home', label: 'Início', description: 'Tela inicial do aplicativo' },
  { id: 'tasks', label: 'Tarefas', description: 'Gerenciar suas tarefas' },
  { id: 'daily-goals', label: 'Metas Diárias', description: 'Definir e acompanhar metas diárias' },
  { id: 'pomodoro', label: 'Pomodoro', description: 'Timer pomodoro para foco' },
  { id: 'notes', label: 'Notas', description: 'Suas anotações' },
  { id: 'reports', label: 'Relatórios', description: 'Visualizar relatórios' },
  { id: 'timer', label: 'Timer', description: 'Cronômetro simples' },
  { id: 'linked-notes', label: 'Notas Vinculadas', description: 'Notas com conexões' }
];

const NavigationButton = ({ tool, isActive, onPress }: NavigationButtonProps) => {
  const toolInfo = NAVIGATION_TOOLS.find(t => t.id === tool)!;
  
  return (
    <TouchableOpacity
      style={[
        styles.navigationButton,
        isActive && styles.activeNavigationButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={toolInfo.label}
      accessibilityHint={toolInfo.description}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <ThemedText style={[styles.navigationText, isActive && styles.activeNavigationText]}>
        {toolInfo.label}
      </ThemedText>
    </TouchableOpacity>
  );
};

const WelcomeScreen = () => (
  <ThemedView style={styles.welcomeContainer}>
    <ThemedText type="title" accessibilityRole="header">Bem-vindo ao Proddy!</ThemedText>
    <ThemedText style={styles.description} accessibilityRole="text">
      Seja Bem-Vindo ao meu aplicativo voltado à criatividade. Use o menu lateral para acessar as ferramentas.
    </ThemedText>
    <Text style={styles.warning} accessibilityRole="alert">
      ⚠️ As ferramentas ainda não possuem capacidade de salvar dados. Ao fechar, elas reiniciarão suas mudanças.⚠️
    </Text>
    <HelloWave />
  </ThemedView>
);

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeTool, setActiveTool] = useState<NavigationTool>('home');

  const handleToolPress = useCallback((tool: NavigationTool) => {
    setActiveTool(tool);
  }, []);

  const toolComponents: Record<NavigationTool, JSX.Element> = {
    'home': <WelcomeScreen />,
    'tasks': <TasksScreen />,
    'daily-goals': <DailyGoalsScreen />,
    'pomodoro': <PomodoroScreen />,
    'notes': <NotesScreen />,
    'reports': <ReportsScreen />,
    'timer': <TimerScreen />,
    'linked-notes': <LinkedNotesScreen />
  };

  return (
    <View style={styles.container} accessibilityRole="application">
      <View 
        style={[styles.navigation, { width: width * 0.2 }]}
        accessibilityRole="tablist"
        accessibilityLabel="Menu de navegação"
      >
        {NAVIGATION_TOOLS.map(({ id }) => (
          <NavigationButton
            key={id}
            tool={id}
            isActive={activeTool === id}
            onPress={() => handleToolPress(id)}
          />
        ))}
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logo}
          accessibilityLabel="Logo do Proddy"
          accessibilityRole="image"
        />
      </View>
      <View 
        style={[styles.content, { width: width * 0.8 }]}
        accessibilityRole="main"
        accessibilityLabel={`Conteúdo da seção ${NAVIGATION_TOOLS.find(t => t.id === activeTool)?.label}`}
      >
        {toolComponents[activeTool]}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f7f9fc',
  },
  navigation: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#edf2f7',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    pointerEvents: 'auto', // Substituído props.pointerEvents
  },
  navigationButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    width: '85%',
    alignItems: 'center',
    boxShadow: '0px 2px 3px rgba(113, 128, 150, 0.05)',
    borderWidth: 1,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    transform: [{ scale: 1 }],
  },
  activeNavigationButton: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
    boxShadow: '0px 2px 3px rgba(99, 102, 241, 0.15)',
    transform: [{ scale: 1.02 }],
  },
  navigationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a5568',
    letterSpacing: 0.3,
  },
  activeNavigationText: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  logo: {
    width: 48,
    height: 48,
    marginTop: 'auto',
    marginBottom: 24,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 24,
    color: '#4a5568',
    maxWidth: 600,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  warning: {
    fontSize: 14,
    color: '#e53e3e',
    textAlign: 'center',
    marginVertical: 24,
    padding: 16,
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    maxWidth: 600,
    borderWidth: 1,
    borderColor: '#fed7d7',
    lineHeight: 22,
  },
});