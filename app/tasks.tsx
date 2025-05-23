import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

export default function TasksScreen() {
  const [tasks, setTasks] = useStorage<string[]>({
    key: 'tasks',
    initialValue: []
  });
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
      alert('Tarefa adicionada com sucesso!');
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    alert('Tarefa excluída com sucesso!');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tarefas</ThemedText>
      <TextInput
        style={[styles.input, styles.text]}
        placeholder="Digite uma nova tarefa"
        value={task}
        onChangeText={setTask}
        accessibilityLabel="Campo de entrada para nova tarefa"
      />
      <TouchableOpacity
        style={[styles.addButton, styles.button]}
        onPress={addTask}
        accessibilityLabel="Adicionar nova tarefa"
      >
        <ThemedText style={styles.addButtonText}>Adicionar Tarefa</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.taskContainer, styles.button]}>
            <ThemedText style={[styles.task, styles.text]}>{item}</ThemedText>
            <TouchableOpacity
              style={[styles.deleteButton, styles.button]}
              onPress={() => deleteTask(index)}
              accessibilityLabel={`Excluir tarefa ${item}`}
            >
              <ThemedText style={styles.deleteButtonText}>Excluir</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  task: {
    flex: 1,
    marginRight: 12,
  },
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
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
