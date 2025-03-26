import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo ao Proddy!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.toolContainer}>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/tasks')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Tarefas</ThemedText>
          <ThemedText style={styles.toolText}>Organize e priorize suas tarefas diárias.</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/daily-goals')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Metas Diárias</ThemedText>
          <ThemedText style={styles.toolText}>Defina e acompanhe suas metas diárias.</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/pomodoro')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Timer Pomodoro</ThemedText>
          <ThemedText style={styles.toolText}>Aumente o foco com sessões de trabalho cronometradas.</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/notes')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Notas</ThemedText>
          <ThemedText style={styles.toolText}>Capture e organize suas ideias.</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/reports')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Relatórios</ThemedText>
          <ThemedText style={styles.toolText}>Analise suas tendências de produtividade.</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => router.push('/timer')}
        >
          <ThemedText type="subtitle" style={styles.toolText}>Cronômetro</ThemedText>
          <ThemedText style={styles.toolText}>Acompanhe o tempo de tarefas ou atividades específicas.</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  toolContainer: {
    gap: 20,
    paddingHorizontal: 16,
  },
  toolButton: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  toolText: {
    color: '#000', // Define a cor preta para o texto
  },
});
