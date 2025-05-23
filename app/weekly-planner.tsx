import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

interface WeekDay {
  day: string;
  tasks: string[];
}

export default function WeeklyPlannerScreen() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newTask, setNewTask] = useState('');
  const [weekDays, setWeekDays] = useStorage<WeekDay[]>({
    key: 'weeklyPlanner',
    initialValue: [
      { day: 'Monday', tasks: [] },
      { day: 'Tuesday', tasks: [] },
      { day: 'Wednesday', tasks: [] },
      { day: 'Thursday', tasks: [] },
      { day: 'Friday', tasks: [] },
      { day: 'Saturday', tasks: [] },
      { day: 'Sunday', tasks: [] },
    ]
  });

  const addTask = () => {
    if (newTask.trim()) {
      const updatedDays = weekDays.map(day => 
        day.day === selectedDay 
          ? { ...day, tasks: [...day.tasks, newTask] }
          : day
      );
      setWeekDays(updatedDays);
      setNewTask('');
    }
  };

  const deleteTask = (day: string, taskIndex: number) => {
    const updatedDays = weekDays.map(d => 
      d.day === day 
        ? { ...d, tasks: d.tasks.filter((_, i) => i !== taskIndex) }
        : d
    );
    setWeekDays(updatedDays);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Planner Semanal</ThemedText>
      <ThemedText style={styles.description}>
        Planeje suas tarefas para cada dia da semana
      </ThemedText>

      <View style={styles.daySelector}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDay
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <ThemedText style={styles.dayButtonText}>{day}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <ThemedText style={styles.addButtonText}>Adicionar</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tasksContainer}>
        {weekDays.map((day) => (
          <View key={day.day} style={styles.daySection}>
            <ThemedText style={styles.dayHeader}>{day.day}</ThemedText>
            <FlatList
              data={day.tasks}
              keyExtractor={(item, index) => `${day.day}-${index}`}
              renderItem={({ item, index }) => (
                <View style={styles.taskItem}>
                  <ThemedText style={styles.taskText}>{item}</ThemedText>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTask(day.day, index)}
                  >
                    <ThemedText style={styles.deleteButtonText}>🗑️</ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
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
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tasksContainer: {
    flex: 1,
  },
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    color: '#fff',
  },
});
