import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useStorage } from '@/hooks/useStorage';

interface Goal {
  id: string;
  name: string;
  progress: number;
  total: number;
}

export default function ProgressChartScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [goals, setGoals] = useStorage<Goal[]>({
    key: 'progressGoals',
    initialValue: [
      {
        id: '1',
        name: 'Meta Diária',
        progress: 80,
        total: 100,
      },
      {
        id: '2',
        name: 'Tarefas Completadas',
        progress: 65,
        total: 100,
      },
      {
        id: '3',
        name: 'Tempo de Foco',
        progress: 90,
        total: 100,
      },
    ]
  });

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(52, 73, 94, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gráfico de Progresso</ThemedText>
      <ThemedText style={styles.description}>
        Visualize seu progresso em diferentes métricas
      </ThemedText>

      <ScrollView style={styles.content}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              selectedGoal === goal.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <ThemedText style={styles.goalTitle}>{goal.name}</ThemedText>
            <View style={styles.progressContainer}>
              <LineChart
                data={{
                  labels: ['0', '25', '50', '75', '100'],
                  datasets: [{
                    data: [0, goal.progress],
                  }],
                }}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
              <View style={styles.progressText}>
                <ThemedText style={styles.progressValue}>
                  {goal.progress}%
                </ThemedText>
                <ThemedText style={styles.progressLabel}>
                  Progresso
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  progressContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressText: {
    marginTop: 10,
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
});
