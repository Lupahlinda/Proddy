import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

export default function DailyGoalsScreen() {
  const [goals, setGoals] = useStorage<any[]>({
    key: 'dailyGoals',
    initialValue: []
  });
  const [goal, setGoal] = useState('');

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { text: goal, completed: false }]);
      setGoal('');
    }
  };

  const toggleGoal = (index) => {
    setGoals(
      goals.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
    alert(goals[index].completed ? 'Meta marcada como não concluída!' : 'Meta concluída!');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Metas Diárias</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta"
        value={goal}
        onChangeText={setGoal}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={addGoal}
      >
        <ThemedText style={styles.addButtonText}>Adicionar Meta</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleGoal(index)}>
            <ThemedText style={[styles.goal, item.completed && styles.completedGoal]}>{item.text}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  goal: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  completedGoal: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
});
